#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime
import time

class KyivQuestAPITester:
    def __init__(self, base_url="https://74ba2f2e-bada-4d3d-b631-8e6f68611d40.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.team_id = None

    def log_test(self, name, success, details=""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED {details}")
        else:
            print(f"❌ {name} - FAILED {details}")
        return success

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                try:
                    response_data = response.json()
                    details = f"Status: {response.status_code}"
                    return self.log_test(name, True, details), response_data
                except:
                    return self.log_test(name, True, f"Status: {response.status_code} (No JSON)"), {}
            else:
                details = f"Expected {expected_status}, got {response.status_code}"
                if response.text:
                    details += f" - {response.text[:200]}"
                return self.log_test(name, False, details), {}

        except Exception as e:
            return self.log_test(name, False, f"Error: {str(e)}"), {}

    def test_health_check(self):
        """Test API health endpoint"""
        success, response = self.run_test(
            "Health Check",
            "GET", 
            "api/health",
            200
        )
        return success and response.get('status') == 'healthy'

    def test_create_team(self):
        """Test team creation"""
        team_data = {
            "name": "Test Team Kyiv Quest",
            "members": ["Test Player 1", "Test Player 2"]
        }
        
        success, response = self.run_test(
            "Create Team",
            "POST",
            "api/teams",
            200,
            data=team_data
        )
        
        if success and 'team_id' in response:
            self.team_id = response['team_id']
            print(f"   Created team with ID: {self.team_id}")
            return True
        return False

    def test_get_team(self):
        """Test getting team information"""
        if not self.team_id:
            return self.log_test("Get Team", False, "No team_id available")
        
        success, response = self.run_test(
            "Get Team Info",
            "GET",
            f"api/teams/{self.team_id}",
            200
        )
        
        return success and response.get('team_id') == self.team_id

    def test_join_team(self):
        """Test joining a team"""
        if not self.team_id:
            return self.log_test("Join Team", False, "No team_id available")
        
        join_data = {
            "team_id": self.team_id,
            "member_name": "New Test Player"
        }
        
        success, response = self.run_test(
            "Join Team",
            "POST",
            f"api/teams/{self.team_id}/join",
            200,
            data=join_data
        )
        
        return success

    def test_start_game(self):
        """Test starting the game"""
        if not self.team_id:
            return self.log_test("Start Game", False, "No team_id available")
        
        success, response = self.run_test(
            "Start Game",
            "POST",
            f"api/teams/{self.team_id}/start",
            200
        )
        
        return success and 'start_time' in response

    def test_submit_answers(self):
        """Test submitting answers for questions"""
        if not self.team_id:
            return self.log_test("Submit Answers", False, "No team_id available")
        
        # Test answers for different question types
        test_answers = [
            {"question_id": 1, "answer": "B", "expected_correct": True},  # Multiple choice
            {"question_id": 2, "answer": "A", "expected_correct": True},  # Multiple choice
            {"question_id": 4, "answer": "1905", "expected_correct": True},  # Open answer
            {"question_id": 5, "answer": "пізнай себе", "expected_correct": True},  # Open answer
            {"question_id": 1, "answer": "C", "expected_correct": False},  # Wrong answer
        ]
        
        all_passed = True
        for test_case in test_answers:
            answer_data = {
                "team_id": self.team_id,
                "question_id": test_case["question_id"],
                "answer": test_case["answer"],
                "member_name": "Test Player"
            }
            
            success, response = self.run_test(
                f"Submit Answer Q{test_case['question_id']} ({test_case['answer']})",
                "POST",
                f"api/teams/{self.team_id}/answer",
                200,
                data=answer_data
            )
            
            if success:
                actual_correct = response.get('correct', False)
                expected_correct = test_case['expected_correct']
                if actual_correct == expected_correct:
                    print(f"   ✅ Answer validation correct: {actual_correct}")
                else:
                    print(f"   ❌ Answer validation wrong: expected {expected_correct}, got {actual_correct}")
                    all_passed = False
            else:
                all_passed = False
            
            time.sleep(0.5)  # Small delay between requests
        
        return all_passed

    def test_get_progress(self):
        """Test getting team progress"""
        if not self.team_id:
            return self.log_test("Get Progress", False, "No team_id available")
        
        success, response = self.run_test(
            "Get Team Progress",
            "GET",
            f"api/teams/{self.team_id}/progress",
            200
        )
        
        return success and 'answers' in response

    def test_leaderboard(self):
        """Test getting leaderboard"""
        success, response = self.run_test(
            "Get Leaderboard",
            "GET",
            "api/leaderboard",
            200
        )
        
        return success and 'leaderboard' in response

    def test_admin_stats(self):
        """Test admin statistics endpoints"""
        # Test saving stats
        stats_data = {
            "team_name": "Test Team",
            "completion_time": 300,
            "correct_answers": 8,
            "total_questions": 10
        }
        
        success1, _ = self.run_test(
            "Save Admin Stats",
            "POST",
            "api/admin/stats",
            200,
            data=stats_data
        )
        
        # Test getting stats
        success2, response = self.run_test(
            "Get Admin Stats",
            "GET",
            "api/admin/stats",
            200
        )
        
        return success1 and success2 and 'total_teams' in response

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting KYIV Quest API Tests")
        print("=" * 50)
        
        # Basic connectivity
        if not self.test_health_check():
            print("❌ Health check failed - stopping tests")
            return False
        
        # Team management flow
        if not self.test_create_team():
            print("❌ Team creation failed - stopping tests")
            return False
        
        self.test_get_team()
        self.test_join_team()
        
        # Game flow
        self.test_start_game()
        self.test_submit_answers()
        self.test_get_progress()
        
        # Additional endpoints
        self.test_leaderboard()
        self.test_admin_stats()
        
        # Print final results
        print("\n" + "=" * 50)
        print(f"📊 FINAL RESULTS: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests PASSED!")
            return True
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests FAILED")
            return False

def main():
    """Main test execution"""
    print("KYIV Quest Backend API Testing")
    print("Testing against:", "https://74ba2f2e-bada-4d3d-b631-8e6f68611d40.preview.emergentagent.com")
    
    tester = KyivQuestAPITester()
    success = tester.run_all_tests()
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())