from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import os
import json
import uuid
from datetime import datetime
import asyncio
from pymongo import MongoClient
from bson import ObjectId

app = FastAPI(title="KYIV Quest API")

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = MongoClient(mongo_url)
db = client['kyiv_quest']
teams_collection = db['teams']
progress_collection = db['progress']
stats_collection = db['stats']

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class TeamCreate(BaseModel):
    name: str
    members: Optional[List[str]] = []

class TeamJoin(BaseModel):
    team_id: str
    member_name: str

class AnswerSubmit(BaseModel):
    team_id: str
    question_id: int
    answer: str
    member_name: str

class TeamProgress(BaseModel):
    team_id: str
    current_question: int
    answers: Dict[str, Any]
    start_time: Optional[str] = None
    end_time: Optional[str] = None

# In-memory storage for real-time sync (in production, use Redis)
team_connections = {}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "kyiv-quest-api"}

@app.post("/api/teams")
async def create_team(team_data: TeamCreate):
    """Create a new team"""
    team_id = str(uuid.uuid4())
    
    team_doc = {
        "team_id": team_id,
        "name": team_data.name,
        "members": team_data.members,
        "created_at": datetime.now().isoformat(),
        "current_question": 0,
        "answers": {},
        "start_time": None,
        "end_time": None,
        "is_finished": False
    }
    
    teams_collection.insert_one(team_doc)
    
    return {
        "team_id": team_id,
        "name": team_data.name,
        "qr_data": f"kyiv-quest://join/{team_id}",
        "join_url": f"/join/{team_id}"
    }

@app.post("/api/teams/{team_id}/join")
async def join_team(team_id: str, join_data: TeamJoin):
    """Join existing team"""
    team = teams_collection.find_one({"team_id": team_id})
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    # Add member to team
    teams_collection.update_one(
        {"team_id": team_id},
        {"$addToSet": {"members": join_data.member_name}}
    )
    
    return {"message": f"{join_data.member_name} joined team {team['name']}"}

@app.get("/api/teams/{team_id}")
async def get_team(team_id: str):
    """Get team information and current progress"""
    team = teams_collection.find_one({"team_id": team_id})
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    # Remove MongoDB _id field
    team.pop('_id', None)
    return team

@app.post("/api/teams/{team_id}/start")
async def start_game(team_id: str):
    """Start the game for a team"""
    team = teams_collection.find_one({"team_id": team_id})
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    start_time = datetime.now().isoformat()
    teams_collection.update_one(
        {"team_id": team_id},
        {
            "$set": {
                "start_time": start_time,
                "current_question": 0,
                "answers": {}
            }
        }
    )
    
    return {"message": "Game started", "start_time": start_time}

@app.post("/api/teams/{team_id}/answer")
async def submit_answer(team_id: str, answer_data: AnswerSubmit):
    """Submit answer for current question"""
    team = teams_collection.find_one({"team_id": team_id})
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    if team.get('is_finished'):
        raise HTTPException(status_code=400, detail="Game already finished")
    
    # Check if answer is correct (simplified validation)
    is_correct = validate_answer(answer_data.question_id, answer_data.answer)
    
    # Update team progress
    current_answers = team.get('answers', {})
    current_answers[str(answer_data.question_id)] = {
        "answer": answer_data.answer,
        "correct": is_correct,
        "submitted_by": answer_data.member_name,
        "timestamp": datetime.now().isoformat()
    }
    
    update_data = {"answers": current_answers}
    
    # If correct answer, advance to next question
    if is_correct:
        next_question = team.get('current_question', 0) + 1
        update_data["current_question"] = next_question
        
        # Check if game is finished (10 questions total)
        if next_question >= 10:
            update_data["is_finished"] = True
            update_data["end_time"] = datetime.now().isoformat()
    
    teams_collection.update_one(
        {"team_id": team_id},
        {"$set": update_data}
    )
    
    # Get updated team data
    updated_team = teams_collection.find_one({"team_id": team_id})
    updated_team.pop('_id', None)
    
    return {
        "correct": is_correct,
        "current_question": updated_team.get('current_question', 0),
        "is_finished": updated_team.get('is_finished', False),
        "team_progress": updated_team
    }

@app.get("/api/teams/{team_id}/progress")
async def get_team_progress(team_id: str):
    """Get real-time team progress"""
    team = teams_collection.find_one({"team_id": team_id})
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    team.pop('_id', None)
    return team

@app.get("/api/leaderboard")
async def get_leaderboard():
    """Get leaderboard of finished teams"""
    finished_teams = list(teams_collection.find({
        "is_finished": True,
        "start_time": {"$ne": None},
        "end_time": {"$ne": None}
    }))
    
    leaderboard = []
    for team in finished_teams:
        if team.get('start_time') and team.get('end_time'):
            start_time = datetime.fromisoformat(team['start_time'])
            end_time = datetime.fromisoformat(team['end_time'])
            duration = (end_time - start_time).total_seconds()
            
            correct_answers = sum(1 for answer in team.get('answers', {}).values() 
                                if answer.get('correct', False))
            
            leaderboard.append({
                "team_name": team['name'],
                "duration": duration,
                "correct_answers": correct_answers,
                "total_questions": 10,
                "finished_at": team['end_time']
            })
    
    # Sort by correct answers (desc) then by duration (asc)
    leaderboard.sort(key=lambda x: (-x['correct_answers'], x['duration']))
    
    return {"leaderboard": leaderboard}

@app.post("/api/admin/stats")
async def save_game_stats(stats_data: dict):
    """Save game completion stats"""
    stats_doc = {
        **stats_data,
        "created_at": datetime.now().isoformat()
    }
    stats_collection.insert_one(stats_doc)
    return {"message": "Stats saved"}

@app.get("/api/admin/stats")
async def get_admin_stats():
    """Get admin statistics"""
    # This would require admin authentication in production
    stats = list(stats_collection.find({}, {"_id": 0}))
    teams = list(teams_collection.find({}, {"_id": 0}))
    
    return {
        "total_teams": len(teams),
        "finished_games": len([t for t in teams if t.get('is_finished')]),
        "stats": stats,
        "teams": teams
    }

def validate_answer(question_id: int, answer: str) -> bool:
    """Validate answer for given question"""
    # Correct answers for each question
    correct_answers = {
        1: "B",  # Богдан Хмельницький
        2: "A",  # Франческо Растреллі
        3: "B",  # Мисливець
        4: "1905",  # Фунікулер
        5: "пізнай себе",  # Сковорода
        6: "22",  # Бібліотека поверхи
        7: "385",  # Телевежа висота
        8: "A",  # Костянтин Скритуцький
        9: "2011",  # Рошен фонтан
        10: "70050"  # Стадіон місць
    }
    
    correct = correct_answers.get(question_id)
    if not correct:
        return False
    
    # For multiple choice (letters)
    if correct in ['A', 'B', 'C', 'D']:
        return answer.upper() == correct
    
    # For open answers, allow partial matches
    answer_lower = answer.lower().strip()
    correct_lower = str(correct).lower().strip()
    
    return answer_lower in correct_lower or correct_lower in answer_lower

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)