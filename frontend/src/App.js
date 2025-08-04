import React, { useState, useEffect } from 'react';
import './App.css';

const WRONG_MESSAGES = {
  ua: [
    "Не зовсім так... Спробуй ще раз — правильна відповідь десь поруч.",
    "Ой! Це хибна стежка. Повернись назад і обери мудріше 😉",
    "Таємниця лишається нерозгаданою... Обери інший варіант, аби просунутись далі."
  ],
  en: [
    "Not quite... Try again — the right answer is somewhere nearby.",
    "Oops! This is the wrong path. Go back and choose wiser 😉",
    "The mystery remains unsolved... Choose another option to move forward."
  ],
  fr: [
    "Pas tout à fait... Réessaie — la bonne réponse est quelque part près.",
    "Oups ! C'est le mauvais chemin. Reviens en arrière et choisis plus sagement 😉",
    "Le mystère reste non résolu... Choisis une autre option pour avancer."
  ],
  de: [
    "Nicht ganz... Versuche es nochmal — die richtige Antwort ist irgendwo in der Nähe.",
    "Ups! Das ist der falsche Weg. Geh zurück und wähle weiser 😉",
    "Das Geheimnis bleibt ungelöst... Wähle eine andere Option, um voranzukommen."
  ]
};

const TRANSLATIONS = {
  ua: {
    gameTitle: "🟣 KYIV QUEST",
    gameSubtitle: "неоновий маршрут містом легенд",
    prologue: "🧭 Привіт, мандрівнику!\nТи вирушаєш у захопливу подорож серцем Києва — міста, де кожна вулиця шепоче історії, а кожен камінь зберігає таємниці.\nНа тебе чекають 10 завдань — пізнавальні, несподівані, з ноткою магії та гумору.",
    teamName: "Назва команди",
    startQuest: "Створити команду →",
    continue: "Продовжити →",
    restart: "Рестарт",
    correct: "✅ Правильно!",
    nextQuestion: "Переходимо до наступного питання...",
    correctAnswer: "Правильна відповідь:",
    tryAgain: "Спробуйте ще раз або скористайтеся підказкою",
    questCompleted: "🎉 Квест завершено!",
    team: "Команда:",
    time: "Час:",
    correctAnswers: "Правильних відповідей:",
    startAgain: "Почати знову",
    shareResult: "Поділитися результатом",
    hints: "💡 Підказки",
    hint: "Підказка",
    show: "Показати",
    bonusTask: "🎁 Бонусне завдання:",
    question: "Питання",
    of: "з",
    enterAnswer: "Введи відповідь...",
    adminLogin: "Логін адміністратора",
    adminPassword: "Пароль",
    login: "Увійти",
    wrongCredentials: "Невірний логін або пароль!",
    adminPanel: "🔧 Адмін-панель KYIV Quest",
    exit: "Вихід",
    statistics: "📊 Статистика",
    settings: "⚙️ Налаштування",
    questQuestions: "📝 Питання квесту",
    changePassword: "Змінити пароль",
    newPassword: "Новий пароль",
    passwordChanged: "Пароль успішно змінено!",
    editQuestions: "Редагувати питання",
    configureHints: "Налаштувати підказки",
    exportData: "Експорт даних",
    edit: "Редагувати",
    correctAnswerLabel: "Правильна відповідь:",
    totalTeams: "Всього команд:",
    activeGames: "Активних ігор:",
    completedGames: "Завершених ігор:",
    qrCode: "QR-код для приєднання:",
    scanToJoin: "Скануйте цей код, щоб приєднатися до команди",
    allJoined: "Всі приєднались, вперед до пригод😎",
    waitingForTeam: "Очікування учасників команди..."
  },
  en: {
    gameTitle: "🟣 KYIV QUEST",
    gameSubtitle: "neon route through the city of legends",
    prologue: "🧭 Hello, traveler!\nYou are embarking on an exciting journey through the heart of Kyiv — a city where every street whispers stories and every stone holds secrets.\n10 tasks await you — educational, unexpected, with a touch of magic and humor.",
    teamName: "Team Name",
    startQuest: "Create Team →",
    continue: "Continue →",
    restart: "Restart",
    correct: "✅ Correct!",
    nextQuestion: "Moving to the next question...",
    correctAnswer: "Correct answer:",
    tryAgain: "Try again or use a hint",
    questCompleted: "🎉 Quest Completed!",
    team: "Team:",
    time: "Time:",
    correctAnswers: "Correct answers:",
    startAgain: "Start Again",
    shareResult: "Share Result",
    hints: "💡 Hints",
    hint: "Hint",
    show: "Show",
    bonusTask: "🎁 Bonus Task:",
    question: "Question",
    of: "of",
    enterAnswer: "Enter answer...",
    adminLogin: "Administrator Login",
    adminPassword: "Password",
    login: "Login",
    wrongCredentials: "Wrong login or password!",
    adminPanel: "🔧 KYIV Quest Admin Panel",
    exit: "Exit",
    statistics: "📊 Statistics",
    settings: "⚙️ Settings",
    questQuestions: "📝 Quest Questions",
    changePassword: "Change Password",
    newPassword: "New Password",
    passwordChanged: "Password successfully changed!",
    editQuestions: "Edit Questions",
    configureHints: "Configure Hints",
    exportData: "Export Data",
    edit: "Edit",
    correctAnswerLabel: "Correct answer:",
    totalTeams: "Total teams:",
    activeGames: "Active games:",
    completedGames: "Completed games:",
    qrCode: "QR Code to join:",
    scanToJoin: "Scan this code to join the team",
    allJoined: "Everyone joined, let's go to adventures😎",
    waitingForTeam: "Waiting for team members..."
  },
  fr: {
    gameTitle: "🟣 KYIV QUEST",
    gameSubtitle: "route néon à travers la ville des légendes",
    prologue: "🧭 Salut, voyageur !\nTu te lances dans un voyage passionnant au cœur de Kiev — une ville où chaque rue murmure des histoires et chaque pierre garde des secrets.\n10 tâches t'attendent — éducatives, inattendues, avec une touche de magie et d'humour.",
    teamName: "Nom de l'équipe",
    startQuest: "Créer l'équipe →",
    continue: "Continuer →",
    restart: "Redémarrer",
    correct: "✅ Correct !",
    nextQuestion: "Passage à la question suivante...",
    correctAnswer: "Bonne réponse :",
    tryAgain: "Réessaie ou utilise un indice",
    questCompleted: "🎉 Quête terminée !",
    team: "Équipe :",
    time: "Temps :",
    correctAnswers: "Bonnes réponses :",
    startAgain: "Recommencer",
    shareResult: "Partager le résultat",
    hints: "💡 Indices",
    hint: "Indice",
    show: "Montrer",
    bonusTask: "🎁 Tâche bonus :",
    question: "Question",
    of: "sur",
    enterAnswer: "Entrer la réponse...",
    adminLogin: "Connexion administrateur",
    adminPassword: "Mot de passe",
    login: "Se connecter",
    wrongCredentials: "Mauvais login ou mot de passe !",
    adminPanel: "🔧 Panneau d'administration KYIV Quest",
    exit: "Sortir",
    statistics: "📊 Statistiques",
    settings: "⚙️ Paramètres",
    questQuestions: "📝 Questions de la quête",
    changePassword: "Changer le mot de passe",
    newPassword: "Nouveau mot de passe",
    passwordChanged: "Mot de passe changé avec succès !",
    editQuestions: "Éditer les questions",
    configureHints: "Configurer les indices",
    exportData: "Exporter les données",
    edit: "Éditer",
    correctAnswerLabel: "Bonne réponse :",
    totalTeams: "Total des équipes :",
    activeGames: "Jeux actifs :",
    completedGames: "Jeux terminés :",
    qrCode: "Code QR pour rejoindre :",
    scanToJoin: "Scannez ce code pour rejoindre l'équipe",
    allJoined: "Tout le monde a rejoint, allons aux aventures😎",
    waitingForTeam: "En attente des membres de l'équipe..."
  },
  de: {
    gameTitle: "🟣 KYIV QUEST",
    gameSubtitle: "neon-route durch die stadt der legenden",
    prologue: "🧭 Hallo, Reisender!\nDu begibst dich auf eine aufregende Reise durch das Herz von Kiew — eine Stadt, in der jede Straße Geschichten flüstert und jeder Stein Geheimnisse bewahrt.\n10 Aufgaben erwarten dich — lehrreich, unerwartet, mit einem Hauch von Magie und Humor.",
    teamName: "Teamname",
    startQuest: "Team erstellen →",
    continue: "Weiter →",
    restart: "Neustart",
    correct: "✅ Richtig!",
    nextQuestion: "Zur nächsten Frage...",
    correctAnswer: "Richtige Antwort:",
    tryAgain: "Versuche es nochmal oder nutze einen Hinweis",
    questCompleted: "🎉 Quest abgeschlossen!",
    team: "Team:",
    time: "Zeit:",
    correctAnswers: "Richtige Antworten:",
    startAgain: "Neu starten",
    shareResult: "Ergebnis teilen",
    hints: "💡 Hinweise",
    hint: "Hinweis",
    show: "Zeigen",
    bonusTask: "🎁 Bonusaufgabe:",
    question: "Frage",
    of: "von",
    enterAnswer: "Antwort eingeben...",
    adminLogin: "Administrator-Anmeldung",
    adminPassword: "Passwort",
    login: "Anmelden",
    wrongCredentials: "Falscher Login oder Passwort!",
    adminPanel: "🔧 KYIV Quest Admin-Panel",
    exit: "Beenden",
    statistics: "📊 Statistiken",
    settings: "⚙️ Einstellungen",
    questQuestions: "📝 Quest-Fragen",
    changePassword: "Passwort ändern",
    newPassword: "Neues Passwort",
    passwordChanged: "Passwort erfolgreich geändert!",
    editQuestions: "Fragen bearbeiten",
    configureHints: "Hinweise konfigurieren",
    exportData: "Daten exportieren",
    edit: "Bearbeiten",
    correctAnswerLabel: "Richtige Antwort:",
    totalTeams: "Gesamte Teams:",
    activeGames: "Aktive Spiele:",
    completedGames: "Abgeschlossene Spiele:",
    qrCode: "QR-Code zum Beitreten:",
    scanToJoin: "Scannen Sie diesen Code, um dem Team beizutreten",
    allJoined: "Alle sind beigetreten, lasst uns zu den Abenteuern😎",
    waitingForTeam: "Warten auf Teammitglieder..."
  }
};

const QUESTIONS = {
  ua: [
    {
      id: 1,
      location: "🏰 Софійська площа",
      question: "Тут стоїть пам'ятник гетьману, якого часто плутають з іншим історичним діячем.\n\nПитання: Хто зображений на пам'ятнику?",
      type: "multiple",
      options: [
        "A. Іван Мазепа",
        "B. Богдан Хмельницький", 
        "C. Петро Сагайдачний",
        "D. Данило Галицький"
      ],
      correct: "B",
      bonus: "Знайди вивіску на фасаді навпроти пам'ятника з більш ніж 2 кольорами. Запиши її або зроби селфі на фоні й запости з #KyivQuest",
      hints: [
        "Підказка 1: Це визначна постать козацької історії",
        "Підказка 2: Його ім'я пов'язане з визвольною війною 1648 року",
        "Підказка 3: Правильна відповідь: B. Богдан Хмельницький"
      ]
    },
    {
      id: 2,
      location: "🕍 Андріївська церква",
      question: "Один із символів Києва, побудований у стилі бароко.\n\nПитання: Хто був архітектором цієї церкви?",
      type: "multiple",
      options: [
        "A. Франческо Растреллі",
        "B. Володимир Ніколаєв",
        "C. Іван Григорович-Барський", 
        "D. Огюст Монферран"
      ],
      correct: "A",
      bonus: "Порахуй кількість колон навколо церкви. Скільки їх?",
      hints: [
        "Підказка 1: Італійський архітектор епохи бароко",
        "Підказка 2: Також спроєктував Зимовий палац у Санкт-Петербурзі",
        "Підказка 3: Правильна відповідь: A. Франческо Растреллі"
      ]
    },
    {
      id: 3,
      location: "🏛️ Будинок з химерами",
      question: "Цей дім — легенда київського модерну з фантастичними істотами.\n\nПитання: Яку професію мав архітектор Владислав Городецький, крім архітектури?",
      type: "multiple",
      options: [
        "A. Політик",
        "B. Мисливець",
        "C. Художник",
        "D. Актор"
      ],
      correct: "B",
      bonus: "Знайди істоту на фасаді, яка не існує в реальному житті. Як вона виглядає?",
      hints: [
        "Підказка 1: Його хобі відображено в декорі будинку",
        "Підказка 2: Тварини на фасаді - це його трофеї",
        "Підказка 3: Правильна відповідь: B. Мисливець"
      ]
    },
    {
      id: 4,
      location: "🚃 Фунікулер",
      question: "З'єднує Поділ із Верхнім містом.\n\nПитання: У якому році відкрито київський фунікулер?",
      type: "open",
      correct: "1905",
      bonus: "Сфотографуй вагон у русі або напиши, скільки секунд займає поїздка вгору.",
      hints: [
        "Підказка 1: Початок XX століття",
        "Підказка 2: Через 5 років після 1900 року",
        "Підказка 3: Правильна відповідь: 1905"
      ]
    },
    {
      id: 5,
      location: "💒 Поділ, Контрактова площа",
      question: "Тут — пам'ятник легендарному філософу.\n\nПитання: Яка фраза викарбувана біля пам'ятника Григорію Сковороді?",
      type: "open",
      correct: "пізнай себе",
      bonus: "Знайди найближчий мурал і опиши його.",
      hints: [
        "Підказка 1: Давньогрецька філософська мудрість",
        "Підказка 2: Заклик до самопізнання",
        "Підказка 3: Правильна відповідь: пізнай себе"
      ]
    },
    {
      id: 6,
      location: "🧪 Наукова бібліотека ім. Вернадського",
      question: "Одна з найбільших бібліотек у світі.\n\nПитання: Скільки поверхів має головний корпус?",
      type: "open",
      correct: "22",
      bonus: "Порахуйте кількість ламп у читальному залі. Чи всі однакові?",
      hints: [
        "Підказка 1: Більше 20 поверхів",
        "Підказка 2: Парне число",
        "Підказка 3: Правильна відповідь: 22"
      ]
    },
    {
      id: 7,
      location: "🗼 Телевежа",
      question: "Найвища споруда України.\n\nПитання: Яка її точна висота?",
      type: "open",
      correct: "385",
      bonus: "Знайди точку, де вона відображається у склі чи воді. Зроби фото.",
      hints: [
        "Підказка 1: Більше 300 метрів",
        "Підказка 2: Менше 400 метрів",
        "Підказка 3: Правильна відповідь: 385 метрів"
      ]
    },
    {
      id: 8,
      location: "🧑‍🎨 Пейзажна алея",
      question: "Казкове місце з арт-інсталяціями.\n\nПитання: Хто створив скульптури на Пейзажній алеї?",
      type: "multiple",
      options: [
        "A. Костянтин Скритуцький",
        "B. Ілля Рєпін",
        "C. Олег Пінчук",
        "D. Леся Українка"
      ],
      correct: "A",
      bonus: "Вигадай ім'я для одного з персонажів-скульптур. Яка в нього суперсила?",
      hints: [
        "Підказка 1: Сучасний український скульптор",
        "Підказка 2: Створює казкові персонажі",
        "Підказка 3: Правильна відповідь: A. Костянтин Скритуцький"
      ]
    },
    {
      id: 9,
      location: "🍫 Рошен-фонтан",
      question: "Тут вечорами — світломузичне шоу.\n\nПитання: Якого року він відкритий?",
      type: "open",
      correct: "2011",
      bonus: "Сфотографуй відображення світла на воді. Які кольори бачиш?",
      hints: [
        "Підказка 1: Початок 2010-х років",
        "Підказка 2: Рік після 2010",
        "Підказка 3: Правильна відповідь: 2011"
      ]
    },
    {
      id: 10,
      location: "🏟 Олімпійський стадіон",
      question: "Місце футбольних баталій та концертів.\n\nПитання: Скільки глядачів вміщує стадіон?",
      type: "open",
      correct: "70050",
      bonus: "Зроби фото з \"футбольної\" перспективи. Виглядаєш як тренер?",
      hints: [
        "Підказка 1: Більше 70 тисяч",
        "Підказка 2: Точна цифра з нулями",
        "Підказка 3: Правильна відповідь: 70050"
      ]
    }
  ],
  en: [
    {
      id: 1,
      location: "🏰 Sofia Square",
      question: "Here stands a monument to a hetman who is often confused with another historical figure.\n\nQuestion: Who is depicted on the monument?",
      type: "multiple",
      options: [
        "A. Ivan Mazepa",
        "B. Bogdan Khmelnitsky", 
        "C. Petro Sahaidachny",
        "D. Danylo Halytsky"
      ],
      correct: "B",
      bonus: "Find a sign on the facade opposite the monument with more than 2 colors. Write it down or take a selfie and post with #KyivQuest",
      hints: [
        "Hint 1: This is a prominent figure in Cossack history",
        "Hint 2: His name is associated with the liberation war of 1648",
        "Hint 3: Correct answer: B. Bogdan Khmelnitsky"
      ]
    },
    {
      id: 2,
      location: "🕍 St. Andrew's Church",
      question: "One of Kyiv's symbols, built in baroque style.\n\nQuestion: Who was the architect of this church?",
      type: "multiple",
      options: [
        "A. Francesco Rastrelli",
        "B. Volodymyr Nikolaev",
        "C. Ivan Hryhorovych-Barsky", 
        "D. Auguste Montferrand"
      ],
      correct: "A",
      bonus: "Count the number of columns around the church. How many are there?",
      hints: [
        "Hint 1: Italian architect of the baroque era",
        "Hint 2: Also designed the Winter Palace in St. Petersburg",
        "Hint 3: Correct answer: A. Francesco Rastrelli"
      ]
    },
    {
      id: 3,
      location: "🏛️ House with Chimeras",
      question: "This house is a legend of Kyiv's Art Nouveau with fantastic creatures.\n\nQuestion: What profession did architect Vladislav Horodetsky have besides architecture?",
      type: "multiple",
      options: [
        "A. Politician",
        "B. Hunter",
        "C. Artist",
        "D. Actor"
      ],
      correct: "B",
      bonus: "Find a creature on the facade that doesn't exist in real life. What does it look like?",
      hints: [
        "Hint 1: His hobby is reflected in the building's decor",
        "Hint 2: The animals on the facade are his trophies",
        "Hint 3: Correct answer: B. Hunter"
      ]
    },
    {
      id: 4,
      location: "🚃 Funicular",
      question: "Connects Podil with the Upper City.\n\nQuestion: In what year was the Kyiv funicular opened?",
      type: "open",
      correct: "1905",
      bonus: "Take a photo of the car in motion or write how many seconds the trip up takes.",
      hints: [
        "Hint 1: Beginning of the 20th century",
        "Hint 2: 5 years after 1900",
        "Hint 3: Correct answer: 1905"
      ]
    },
    {
      id: 5,
      location: "💒 Podil, Contract Square",
      question: "Here is a monument to the legendary philosopher.\n\nQuestion: What phrase is carved near the monument to Hryhoriy Skovoroda?",
      type: "open",
      correct: "know yourself",
      bonus: "Find the nearest mural and describe it.",
      hints: [
        "Hint 1: Ancient Greek philosophical wisdom",
        "Hint 2: A call to self-knowledge",
        "Hint 3: Correct answer: know yourself"
      ]
    },
    {
      id: 6,
      location: "🧪 Vernadsky National Library",
      question: "One of the largest libraries in the world.\n\nQuestion: How many floors does the main building have?",
      type: "open",
      correct: "22",
      bonus: "Count the number of lamps in the reading room. Are they all the same?",
      hints: [
        "Hint 1: More than 20 floors",
        "Hint 2: Even number",
        "Hint 3: Correct answer: 22"
      ]
    },
    {
      id: 7,
      location: "🗼 TV Tower",
      question: "The tallest structure in Ukraine.\n\nQuestion: What is its exact height?",
      type: "open",
      correct: "385",
      bonus: "Find a point where it's reflected in glass or water. Take a photo.",
      hints: [
        "Hint 1: More than 300 meters",
        "Hint 2: Less than 400 meters",
        "Hint 3: Correct answer: 385 meters"
      ]
    },
    {
      id: 8,
      location: "🧑‍🎨 Landscape Alley",
      question: "A fairy-tale place with art installations.\n\nQuestion: Who created the sculptures on Landscape Alley?",
      type: "multiple",
      options: [
        "A. Kostiantyn Skrytutsky",
        "B. Illia Repin",
        "C. Oleh Pinchuk",
        "D. Lesia Ukrainka"
      ],
      correct: "A",
      bonus: "Make up a name for one of the sculpture characters. What's their superpower?",
      hints: [
        "Hint 1: Contemporary Ukrainian sculptor",
        "Hint 2: Creates fairy-tale characters",
        "Hint 3: Correct answer: A. Kostiantyn Skrytutsky"
      ]
    },
    {
      id: 9,
      location: "🍫 Roshen Fountain",
      question: "Here evenings feature light and music shows.\n\nQuestion: What year was it opened?",
      type: "open",
      correct: "2011",
      bonus: "Take a photo of light reflection on water. What colors do you see?",
      hints: [
        "Hint 1: Early 2010s",
        "Hint 2: Year after 2010",
        "Hint 3: Correct answer: 2011"
      ]
    },
    {
      id: 10,
      location: "🏟 Olympic Stadium",
      question: "Venue for football battles and concerts.\n\nQuestion: How many spectators does the stadium hold?",
      type: "open",
      correct: "70050",
      bonus: "Take a photo from a 'football' perspective. Do you look like a coach?",
      hints: [
        "Hint 1: More than 70 thousand",
        "Hint 2: Exact number with zeros",
        "Hint 3: Correct answer: 70050"
      ]
    }
  ],
  fr: [
    {
      id: 1,
      location: "🏰 Place Sainte-Sophie",
      question: "Ici se dresse un monument à un hetman souvent confondu avec un autre personnage historique.\n\nQuestion : Qui est représenté sur le monument ?",
      type: "multiple",
      options: [
        "A. Ivan Mazepa",
        "B. Bogdan Khmelnitsky", 
        "C. Petro Sahaidachny",
        "D. Danylo Halytsky"
      ],
      correct: "B",
      bonus: "Trouvez une enseigne sur la façade en face du monument avec plus de 2 couleurs. Notez-la ou prenez un selfie et postez avec #KyivQuest",
      hints: [
        "Indice 1 : C'est une figure éminente de l'histoire cosaque",
        "Indice 2 : Son nom est associé à la guerre de libération de 1648",
        "Indice 3 : Bonne réponse : B. Bogdan Khmelnitsky"
      ]
    },
    {
      id: 2,
      location: "🕍 Église Saint-André",
      question: "L'un des symboles de Kiev, construit en style baroque.\n\nQuestion : Qui était l'architecte de cette église ?",
      type: "multiple",
      options: [
        "A. Francesco Rastrelli",
        "B. Volodymyr Nikolaev",
        "C. Ivan Hryhorovych-Barsky", 
        "D. Auguste Montferrand"
      ],
      correct: "A",
      bonus: "Comptez le nombre de colonnes autour de l'église. Combien y en a-t-il ?",
      hints: [
        "Indice 1 : Architecte italien de l'époque baroque",
        "Indice 2 : A aussi conçu le Palais d'Hiver à Saint-Pétersbourg",
        "Indice 3 : Bonne réponse : A. Francesco Rastrelli"
      ]
    },
    {
      id: 3,
      location: "🏛️ Maison aux Chimères",
      question: "Cette maison est une légende de l'Art nouveau kiévien avec des créatures fantastiques.\n\nQuestion : Quelle profession avait l'architecte Vladislav Horodetsky en plus de l'architecture ?",
      type: "multiple",
      options: [
        "A. Politicien",
        "B. Chasseur",
        "C. Artiste",
        "D. Acteur"
      ],
      correct: "B",
      bonus: "Trouvez une créature sur la façade qui n'existe pas dans la vraie vie. À quoi ressemble-t-elle ?",
      hints: [
        "Indice 1 : Son passe-temps se reflète dans le décor du bâtiment",
        "Indice 2 : Les animaux sur la façade sont ses trophées",
        "Indice 3 : Bonne réponse : B. Chasseur"
      ]
    },
    {
      id: 4,
      location: "🚃 Funiculaire",
      question: "Relie Podil à la Ville Haute.\n\nQuestion : En quelle année le funiculaire de Kiev a-t-il été ouvert ?",
      type: "open",
      correct: "1905",
      bonus: "Prenez une photo de la voiture en mouvement ou écrivez combien de secondes dure le trajet vers le haut.",
      hints: [
        "Indice 1 : Début du 20e siècle",
        "Indice 2 : 5 ans après 1900",
        "Indice 3 : Bonne réponse : 1905"
      ]
    },
    {
      id: 5,
      location: "💒 Podil, Place des Contrats",
      question: "Ici se trouve un monument au philosophe légendaire.\n\nQuestion : Quelle phrase est gravée près du monument à Hryhoriy Skovoroda ?",
      type: "open",
      correct: "connais-toi toi-même",
      bonus: "Trouvez la fresque murale la plus proche et décrivez-la.",
      hints: [
        "Indice 1 : Sagesse philosophique grecque antique",
        "Indice 2 : Un appel à la connaissance de soi",
        "Indice 3 : Bonne réponse : connais-toi toi-même"
      ]
    },
    {
      id: 6,
      location: "🧪 Bibliothèque nationale Vernadsky",
      question: "L'une des plus grandes bibliothèques du monde.\n\nQuestion : Combien d'étages a le bâtiment principal ?",
      type: "open",
      correct: "22",
      bonus: "Comptez le nombre de lampes dans la salle de lecture. Sont-elles toutes identiques ?",
      hints: [
        "Indice 1 : Plus de 20 étages",
        "Indice 2 : Nombre pair",
        "Indice 3 : Bonne réponse : 22"
      ]
    },
    {
      id: 7,
      location: "🗼 Tour de télévision",
      question: "La plus haute structure d'Ukraine.\n\nQuestion : Quelle est sa hauteur exacte ?",
      type: "open",
      correct: "385",
      bonus: "Trouvez un point où elle se reflète dans le verre ou l'eau. Prenez une photo.",
      hints: [
        "Indice 1 : Plus de 300 mètres",
        "Indice 2 : Moins de 400 mètres",
        "Indice 3 : Bonne réponse : 385 mètres"
      ]
    },
    {
      id: 8,
      location: "🧑‍🎨 Allée Paysagère",
      question: "Un lieu féerique avec des installations artistiques.\n\nQuestion : Qui a créé les sculptures de l'Allée Paysagère ?",
      type: "multiple",
      options: [
        "A. Kostiantyn Skrytutsky",
        "B. Illia Repin",
        "C. Oleh Pinchuk",
        "D. Lesia Ukrainka"
      ],
      correct: "A",
      bonus: "Inventez un nom pour l'un des personnages-sculptures. Quel est son super-pouvoir ?",
      hints: [
        "Indice 1 : Sculpteur ukrainien contemporain",
        "Indice 2 : Crée des personnages féeriques",
        "Indice 3 : Bonne réponse : A. Kostiantyn Skrytutsky"
      ]
    },
    {
      id: 9,
      location: "🍫 Fontaine Roshen",
      question: "Ici les soirées proposent des spectacles de lumière et de musique.\n\nQuestion : En quelle année a-t-elle été ouverte ?",
      type: "open",
      correct: "2011",
      bonus: "Prenez une photo du reflet de la lumière sur l'eau. Quelles couleurs voyez-vous ?",
      hints: [
        "Indice 1 : Début des années 2010",
        "Indice 2 : Année après 2010",
        "Indice 3 : Bonne réponse : 2011"
      ]
    },
    {
      id: 10,
      location: "🏟 Stade Olympique",
      question: "Lieu de batailles de football et de concerts.\n\nQuestion : Combien de spectateurs le stade peut-il accueillir ?",
      type: "open",
      correct: "70050",
      bonus: "Prenez une photo d'une perspective 'football'. Avez-vous l'air d'un entraîneur ?",
      hints: [
        "Indice 1 : Plus de 70 mille",
        "Indice 2 : Nombre exact avec des zéros",
        "Indice 3 : Bonne réponse : 70050"
      ]
    }
  ],
  de: [
    {
      id: 1,
      location: "🏰 Sophienplatz",
      question: "Hier steht ein Denkmal für einen Hetman, der oft mit einer anderen historischen Figur verwechselt wird.\n\nFrage: Wer ist auf dem Denkmal dargestellt?",
      type: "multiple",
      options: [
        "A. Ivan Mazepa",
        "B. Bogdan Khmelnitsky", 
        "C. Petro Sahaidachny",
        "D. Danylo Halytsky"
      ],
      correct: "B",
      bonus: "Finden Sie ein Schild an der Fassade gegenüber dem Denkmal mit mehr als 2 Farben. Schreiben Sie es auf oder machen Sie ein Selfie und posten Sie es mit #KyivQuest",
      hints: [
        "Hinweis 1: Dies ist eine prominente Figur der Kosakengeschichte",
        "Hinweis 2: Sein Name ist mit dem Befreiungskrieg von 1648 verbunden",
        "Hinweis 3: Richtige Antwort: B. Bogdan Khmelnitsky"
      ]
    },
    {
      id: 2,
      location: "🕍 Andreaskirche",
      question: "Eines der Symbole von Kiew, im Barockstil erbaut.\n\nFrage: Wer war der Architekt dieser Kirche?",
      type: "multiple",
      options: [
        "A. Francesco Rastrelli",
        "B. Volodymyr Nikolaev",
        "C. Ivan Hryhorovych-Barsky", 
        "D. Auguste Montferrand"
      ],
      correct: "A",
      bonus: "Zählen Sie die Anzahl der Säulen um die Kirche. Wie viele sind es?",
      hints: [
        "Hinweis 1: Italienischer Architekt der Barockzeit",
        "Hinweis 2: Entwarf auch den Winterpalast in St. Petersburg",
        "Hinweis 3: Richtige Antwort: A. Francesco Rastrelli"
      ]
    },
    {
      id: 3,
      location: "🏛️ Haus mit Chimären",
      question: "Dieses Haus ist eine Legende des Kiewer Jugendstils mit fantastischen Kreaturen.\n\nFrage: Welchen Beruf hatte Architekt Vladislav Horodetsky neben der Architektur?",
      type: "multiple",
      options: [
        "A. Politiker",
        "B. Jäger",
        "C. Künstler",
        "D. Schauspieler"
      ],
      correct: "B",
      bonus: "Finden Sie eine Kreatur an der Fassade, die im echten Leben nicht existiert. Wie sieht sie aus?",
      hints: [
        "Hinweis 1: Sein Hobby spiegelt sich in der Dekoration des Gebäudes wider",
        "Hinweis 2: Die Tiere an der Fassade sind seine Trophäen",
        "Hinweis 3: Richtige Antwort: B. Jäger"
      ]
    },
    {
      id: 4,
      location: "🚃 Standseilbahn",
      question: "Verbindet Podil mit der Oberstadt.\n\nFrage: In welchem Jahr wurde die Kiewer Standseilbahn eröffnet?",
      type: "open",
      correct: "1905",
      bonus: "Machen Sie ein Foto des fahrenden Wagens oder schreiben Sie auf, wie viele Sekunden die Fahrt nach oben dauert.",
      hints: [
        "Hinweis 1: Anfang des 20. Jahrhunderts",
        "Hinweis 2: 5 Jahre nach 1900",
        "Hinweis 3: Richtige Antwort: 1905"
      ]
    },
    {
      id: 5,
      location: "💒 Podil, Kontraktplatz",
      question: "Hier steht ein Denkmal für den legendären Philosophen.\n\nFrage: Welcher Satz ist am Denkmal für Hryhoriy Skovoroda eingraviert?",
      type: "open",
      correct: "erkenne dich selbst",
      bonus: "Finden Sie das nächste Wandbild und beschreiben Sie es.",
      hints: [
        "Hinweis 1: Altgriechische philosophische Weisheit",
        "Hinweis 2: Ein Aufruf zur Selbsterkenntnis",
        "Hinweis 3: Richtige Antwort: erkenne dich selbst"
      ]
    },
    {
      id: 6,
      location: "🧪 Nationale Bibliothek Vernadsky",
      question: "Eine der größten Bibliotheken der Welt.\n\nFrage: Wie viele Stockwerke hat das Hauptgebäude?",
      type: "open",
      correct: "22",
      bonus: "Zählen Sie die Anzahl der Lampen im Lesesaal. Sind sie alle gleich?",
      hints: [
        "Hinweis 1: Mehr als 20 Stockwerke",
        "Hinweis 2: Gerade Zahl",
        "Hinweis 3: Richtige Antwort: 22"
      ]
    },
    {
      id: 7,
      location: "🗼 Fernsehturm",
      question: "Das höchste Bauwerk der Ukraine.\n\nFrage: Wie hoch ist er genau?",
      type: "open",
      correct: "385",
      bonus: "Finden Sie einen Punkt, wo er sich in Glas oder Wasser spiegelt. Machen Sie ein Foto.",
      hints: [
        "Hinweis 1: Mehr als 300 Meter",
        "Hinweis 2: Weniger als 400 Meter",
        "Hinweis 3: Richtige Antwort: 385 Meter"
      ]
    },
    {
      id: 8,
      location: "🧑‍🎨 Landschaftsallee",
      question: "Ein märchenhafter Ort mit Kunstinstallationen.\n\nFrage: Wer schuf die Skulpturen in der Landschaftsallee?",
      type: "multiple",
      options: [
        "A. Kostiantyn Skrytutsky",
        "B. Illia Repin",
        "C. Oleh Pinchuk",
        "D. Lesia Ukrainka"
      ],
      correct: "A",
      bonus: "Denken Sie sich einen Namen für eine der Skulptur-Figuren aus. Was ist ihre Superkraft?",
      hints: [
        "Hinweis 1: Zeitgenössischer ukrainischer Bildhauer",
        "Hinweis 2: Erschafft märchenhafte Charaktere",
        "Hinweis 3: Richtige Antwort: A. Kostiantyn Skrytutsky"
      ]
    },
    {
      id: 9,
      location: "🍫 Roshen-Brunnen",
      question: "Hier finden abends Licht- und Musikshows statt.\n\nFrage: In welchem Jahr wurde er eröffnet?",
      type: "open",
      correct: "2011",
      bonus: "Machen Sie ein Foto von der Lichtreflexion auf dem Wasser. Welche Farben sehen Sie?",
      hints: [
        "Hinweis 1: Anfang der 2010er Jahre",
        "Hinweis 2: Jahr nach 2010",
        "Hinweis 3: Richtige Antwort: 2011"
      ]
    },
    {
      id: 10,
      location: "🏟 Olympiastadion",
      question: "Schauplatz für Fußballschlachten und Konzerte.\n\nFrage: Wie viele Zuschauer fasst das Stadion?",
      type: "open",
      correct: "70050",
      bonus: "Machen Sie ein Foto aus 'Fußball'-Perspektive. Sehen Sie aus wie ein Trainer?",
      hints: [
        "Hinweis 1: Mehr als 70 Tausend",
        "Hinweis 2: Genaue Zahl mit Nullen",
        "Hinweis 3: Richtige Antwort: 70050"
      ]
    }
  ]
};

function App() {
  const [gameState, setGameState] = useState('start'); // start, playing, finished, admin, teamSetup
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [teamName, setTeamName] = useState('');
  const [teamId, setTeamId] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [language, setLanguage] = useState('ua');
  const [adminPassword, setAdminPassword] = useState('12345');
  
  // Admin login states
  const [adminLogin, setAdminLogin] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  
  // Hints system - sequential unlock
  const [hintsUsed, setHintsUsed] = useState({});
  const [hintTimers, setHintTimers] = useState({});

  // Check admin route
  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setGameState('admin');
    }
  }, []);

  useEffect(() => {
    // Load saved progress and settings
    const saved = localStorage.getItem('kyiv-quest-progress');
    const savedSettings = localStorage.getItem('kyiv-quest-settings');
    
    if (saved) {
      const data = JSON.parse(saved);
      setCurrentQuestion(data.currentQuestion || 0);
      setAnswers(data.answers || {});
      setTeamName(data.teamName || '');
      setTeamId(data.teamId || '');
      setHintsUsed(data.hintsUsed || {});
      if (data.startTime) {
        setStartTime(data.startTime);
        setGameState('playing');
      }
    }
    
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setLanguage(settings.language || 'ua');
      setAdminPassword(settings.adminPassword || '12345');
    }
  }, []);

  useEffect(() => {
    // Save progress
    if (gameState === 'playing') {
      const data = {
        currentQuestion,
        answers,
        teamName,
        teamId,
        startTime,
        hintsUsed
      };
      localStorage.setItem('kyiv-quest-progress', JSON.stringify(data));
    }
    
    // Save settings
    const settings = {
      language,
      adminPassword
    };
    localStorage.setItem('kyiv-quest-settings', JSON.stringify(settings));
  }, [currentQuestion, answers, teamName, teamId, startTime, gameState, hintsUsed, language, adminPassword]);

  useEffect(() => {
    // Initialize sequential hint timers when question changes
    if (gameState === 'playing') {
      const questionKey = currentQuestion;
      if (!hintTimers[questionKey]) {
        const newTimers = { ...hintTimers };
        newTimers[questionKey] = {
          hint1: Date.now() + 60000, // 1 minute for first hint
          hint2: null, // Will be set when first hint is used
          hint3: null  // Will be set when second hint is used
        };
        setHintTimers(newTimers);
      }
    }
  }, [currentQuestion, gameState]);

  const t = (key) => TRANSLATIONS[language][key] || key;
  const getQuestions = () => QUESTIONS[language] || QUESTIONS.ua;

  const generateTeamId = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const generateQRCode = (teamId) => {
    const url = `${window.location.origin}?join=${teamId}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  };

  const createTeam = () => {
    if (!teamName.trim()) return;
    const newTeamId = generateTeamId();
    setTeamId(newTeamId);
    setGameState('teamSetup');
  };

  const startGame = () => {
    setStartTime(Date.now());
    setGameState('playing');
    setCurrentQuestion(0);
    setAnswers({});
    setHintsUsed({});
    setHintTimers({});
  };

  const handleAnswer = () => {
    if (!selectedAnswer || !selectedAnswer.trim()) {
      return;
    }
    
    const questions = getQuestions();
    const question = questions[currentQuestion];
    const isCorrect = checkAnswer(selectedAnswer, question);
    
    const newAnswers = {
      ...answers,
      [currentQuestion]: {
        answer: selectedAnswer,
        correct: isCorrect,
        timestamp: Date.now()
      }
    };
    setAnswers(newAnswers);
    setShowResult(true);
    
    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer('');
      
      // Only move to next question if answer is correct
      if (isCorrect) {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          // Game finished
          setEndTime(Date.now());
          setGameState('finished');
          localStorage.removeItem('kyiv-quest-progress');
        }
      }
    }, 3000);
  };

  const checkAnswer = (answer, question) => {
    if (question.type === 'multiple') {
      return answer === question.correct;
    } else {
      const correct = question.correct.toLowerCase().trim();
      const userAnswer = answer.toLowerCase().trim();
      return userAnswer === correct || 
             userAnswer.includes(correct) || 
             correct.includes(userAnswer) ||
             (parseInt(userAnswer) && parseInt(userAnswer) === parseInt(correct));
    }
  };

  const useHint = (hintIndex) => {
    const questionKey = currentQuestion;
    const newHintsUsed = { ...hintsUsed };
    if (!newHintsUsed[questionKey]) {
      newHintsUsed[questionKey] = [];
    }
    if (!newHintsUsed[questionKey].includes(hintIndex)) {
      newHintsUsed[questionKey].push(hintIndex);
      setHintsUsed(newHintsUsed);
      
      // Set timer for next hint when current hint is used
      const newTimers = { ...hintTimers };
      if (hintIndex === 0) {
        // When first hint used, start timer for second hint (5 min from now)
        newTimers[questionKey].hint2 = Date.now() + 300000;
      } else if (hintIndex === 1) {
        // When second hint used, start timer for third hint (10 min from now)
        newTimers[questionKey].hint3 = Date.now() + 600000;
      }
      setHintTimers(newTimers);
    }
  };

  const getRandomWrongMessage = () => {
    const messages = WRONG_MESSAGES[language] || WRONG_MESSAGES.ua;
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleAdminLogin = () => {
    if (adminLogin === 'admin' && adminPasswordInput === adminPassword) {
      setGameState('admin');
      setAdminLogin('');
      setAdminPasswordInput('');
    } else {
      alert(t('wrongCredentials'));
    }
  };

  const changeAdminPassword = () => {
    if (newPassword.trim()) {
      setAdminPassword(newPassword);
      setNewPassword('');
      setShowPasswordChange(false);
      alert(t('passwordChanged'));
    }
  };

  const getCompletionTime = () => {
    if (!startTime || !endTime) return 0;
    return Math.floor((endTime - startTime) / 1000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimeLeft = (timestamp) => {
    if (!timestamp) return '∞';
    const now = Date.now();
    const timeLeft = Math.max(0, Math.floor((timestamp - now) / 1000));
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isHintAvailable = (hintIndex) => {
    const questionKey = currentQuestion;
    const timers = hintTimers[questionKey];
    if (!timers) return false;
    
    const now = Date.now();
    switch (hintIndex) {
      case 0:
        return now >= timers.hint1;
      case 1:
        return timers.hint2 && now >= timers.hint2;
      case 2:
        return timers.hint3 && now >= timers.hint3;
      default:
        return false;
    }
  };

  const restartGame = () => {
    setGameState('start');
    setCurrentQuestion(0);
    setAnswers({});
    setTeamName('');
    setTeamId('');
    setStartTime(null);
    setEndTime(null);
    setSelectedAnswer('');
    setShowResult(false);
    setHintsUsed({});
    setHintTimers({});
    localStorage.removeItem('kyiv-quest-progress');
    window.history.pushState({}, '', '/');
  };

  const getCorrectAnswers = () => {
    return Object.values(answers).filter(a => a.correct).length;
  };

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
  };

  // Admin Panel
  if (gameState === 'admin') {
    // Show login form if not authenticated
    if (window.location.pathname === '/admin' && !adminLogin && adminPasswordInput !== adminPassword) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
          {/* Language Switcher */}
          <div className="fixed top-4 left-4 z-20">
            <div className="flex space-x-2">
              {['ua', 'en', 'fr', 'de'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                    language === lang 
                      ? 'neon-button-selected' 
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-md w-full">
            <div className="neon-box p-8">
              <h1 className="text-2xl font-bold mb-6 neon-text-purple text-center">
                {t('adminLogin')}
              </h1>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="admin"
                  value={adminLogin}
                  onChange={(e) => setAdminLogin(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white neon-input"
                />
                <input
                  type="password"
                  placeholder={t('adminPassword')}
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white neon-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                />
                <button
                  onClick={handleAdminLogin}
                  className="w-full py-3 neon-button-blue"
                >
                  {t('login')}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        {/* Language Switcher */}
        <div className="fixed top-4 left-4 z-20">
          <div className="flex space-x-2">
            {['ua', 'en', 'fr', 'de'].map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                  language === lang 
                    ? 'neon-button-selected' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto pt-16">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold neon-text-purple">
              {t('adminPanel')}
            </h1>
            <button
              onClick={restartGame}
              className="neon-button-blue px-4 py-2"
            >
              {t('exit')}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="neon-box p-6">
              <h2 className="text-xl font-bold mb-4 neon-text-blue">{t('statistics')}</h2>
              <div className="space-y-2 text-sm">
                <p>{t('totalTeams')} {Object.keys(localStorage).filter(k => k.includes('kyiv-quest')).length}</p>
                <p>{t('activeGames')} -</p>
                <p>{t('completedGames')} -</p>
              </div>
            </div>

            <div className="neon-box p-6">
              <h2 className="text-xl font-bold mb-4 neon-text-green">{t('settings')}</h2>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  className="w-full py-2 neon-button-purple text-sm"
                >
                  {t('changePassword')}
                </button>
                {showPasswordChange && (
                  <div className="space-y-2">
                    <input
                      type="password"
                      placeholder={t('newPassword')}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                    />
                    <button
                      onClick={changeAdminPassword}
                      className="w-full py-2 neon-button-green text-sm"
                    >
                      {t('changePassword')}
                    </button>
                  </div>
                )}
                <button className="w-full py-2 neon-button-pink text-sm">
                  {t('editQuestions')}
                </button>
                <button className="w-full py-2 neon-button-blue text-sm">
                  {t('exportData')}
                </button>
              </div>
            </div>
          </div>

          <div className="neon-box p-6 mt-6">
            <h2 className="text-xl font-bold mb-4 neon-text-purple">{t('questQuestions')}</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {getQuestions().map((q, index) => (
                <div key={q.id} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-blue-400">
                        {index + 1}. {q.location}
                      </h3>
                      <p className="text-sm text-gray-300 mt-1">
                        {q.question.split('\n')[2] || q.question}
                      </p>
                      <p className="text-xs text-green-400 mt-1">
                        {t('correctAnswerLabel')} {q.correct}
                      </p>
                    </div>
                    <button className="text-xs bg-blue-600 px-2 py-1 rounded">
                      {t('edit')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Team Setup - QR Code Screen
  if (gameState === 'teamSetup') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        {/* Language Switcher */}
        <div className="fixed top-4 left-4 z-20">
          <div className="flex space-x-2">
            {['ua', 'en', 'fr', 'de'].map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                  language === lang 
                    ? 'neon-button-selected' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-md w-full text-center">
          <div className="neon-box p-8">
            <h1 className="text-2xl font-bold mb-4 neon-text-blue">
              {t('team')}: {teamName}
            </h1>
            <p className="text-sm text-gray-400 mb-6">
              ID: {teamId}
            </p>
            
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-4 neon-text-purple">
                {t('qrCode')}
              </h2>
              <div className="flex justify-center mb-4">
                <img 
                  src={generateQRCode(teamId)} 
                  alt="QR Code"
                  className="border-2 border-blue-500 rounded-lg neon-glow"
                />
              </div>
              <p className="text-xs text-gray-400">
                {t('scanToJoin')}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-yellow-400 mb-4">
                {t('waitingForTeam')}
              </p>
            </div>

            <button
              onClick={startGame}
              className="w-full py-3 neon-button-green text-lg font-bold"
            >
              {t('allJoined')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        {/* Language Switcher */}
        <div className="fixed top-4 left-4 z-20">
          <div className="flex space-x-2">
            {['ua', 'en', 'fr', 'de'].map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                  language === lang 
                    ? 'neon-button-selected' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 neon-text-blue">
              {t('gameTitle')}
            </h1>
            <p className="text-lg text-gray-300 mb-2">{t('gameSubtitle')}</p>
            <div className="neon-box p-6 mb-6">
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                {t('prologue')}
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder={t('teamName')}
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white neon-input"
              maxLength="50"
            />
            <button
              onClick={createTeam}
              disabled={!teamName.trim()}
              className="w-full py-3 neon-button-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('startQuest')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const completionTime = getCompletionTime();
    const correctAnswers = getCorrectAnswers();
    
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        {/* Language Switcher */}
        <div className="fixed top-4 left-4 z-20">
          <div className="flex space-x-2">
            {['ua', 'en', 'fr', 'de'].map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                  language === lang 
                    ? 'neon-button-selected' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-md w-full text-center">
          <div className="neon-box p-8">
            <h1 className="text-3xl font-bold mb-6 neon-text-purple">
              {t('questCompleted')}
            </h1>
            
            <div className="space-y-4 mb-8">
              <div className="neon-text-blue text-xl">
                {t('team')} {teamName}
              </div>
              <div className="text-gray-300">
                {t('time')} {formatTime(completionTime)}
              </div>
              <div className="text-gray-300">
                {t('correctAnswers')} {correctAnswers}/{getQuestions().length}
              </div>
              <div className="text-2xl">
                {correctAnswers === getQuestions().length ? '🥇' : 
                 correctAnswers >= 8 ? '🥈' : 
                 correctAnswers >= 6 ? '🥉' : '🏆'}
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={restartGame}
                className="w-full py-3 neon-button-purple"
              >
                {t('startAgain')}
              </button>
              <button
                onClick={() => navigator.share && navigator.share({
                  title: 'KYIV Quest Results',
                  text: `${t('team')} "${teamName}" завершила KYIV Quest за ${formatTime(completionTime)} з результатом ${correctAnswers}/${getQuestions().length}! #KyivQuest`,
                })}
                className="w-full py-3 neon-button-pink"
              >
                {t('shareResult')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Playing state
  const questions = getQuestions();
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const questionKey = currentQuestion;
  const usedHints = hintsUsed[questionKey] || [];
  const timers = hintTimers[questionKey];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Language Switcher */}
      <div className="fixed top-4 left-4 z-20">
        <div className="flex space-x-2">
          {['ua', 'en', 'fr', 'de'].map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                language === lang 
                  ? 'neon-button-selected' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-gray-900 border-b border-gray-700 pt-16">
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm text-gray-400">
              {teamName} ({teamId})
            </div>
            <button
              onClick={restartGame}
              className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full transition-colors"
            >
              {t('restart')}
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full neon-progress transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-400 mt-1 text-center">
            {t('question')} {currentQuestion + 1} {t('of')} {questions.length}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-48 pb-32 px-4">
        <div className="max-w-md mx-auto">
          {showResult ? (
            <div className="neon-box p-6 text-center">
              <div className={`text-2xl mb-4 ${
                answers[currentQuestion]?.correct ? 'neon-text-green' : 'neon-text-red'
              }`}>
                {answers[currentQuestion]?.correct ? t('correct') : '❌ ' + getRandomWrongMessage()}
              </div>
              {!answers[currentQuestion]?.correct && (
                <div className="text-gray-300 mb-4">
                  {t('correctAnswer')} {question.correct}
                </div>
              )}
              <div className="text-sm text-gray-400">
                {answers[currentQuestion]?.correct ? 
                  t('nextQuestion') : 
                  t('tryAgain')
                }
              </div>
            </div>
          ) : (
            <>
              <div className="neon-box p-6 mb-6">
                <h2 className="text-lg font-bold mb-4 neon-text-purple">
                  {question.location}
                </h2>
                <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                  {question.question}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                {question.type === 'multiple' ? (
                  question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAnswer(option.charAt(0))}
                      className={`w-full p-3 text-left rounded-lg border transition-all ${
                        selectedAnswer === option.charAt(0)
                          ? 'neon-button-selected' 
                          : 'bg-gray-800 border-gray-600 hover:border-blue-500'
                      }`}
                    >
                      {option}
                    </button>
                  ))
                ) : (
                  <input
                    type="text"
                    placeholder={t('enterAnswer')}
                    value={selectedAnswer}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg neon-input"
                  />
                )}
              </div>

              {/* Continue Button - Centered */}
              <div className="text-center mb-6">
                <button
                  onClick={handleAnswer}
                  disabled={!selectedAnswer || !selectedAnswer.trim()}
                  className="neon-button-blue px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('continue')}
                </button>
              </div>

              {/* Sequential Hints System */}
              <div className="neon-box-subtle p-4 mb-6">
                <h3 className="text-sm font-bold mb-3 text-yellow-400">{t('hints')}</h3>
                <div className="space-y-2">
                  {[0, 1, 2].map((hintIndex) => {
                    const isUsed = usedHints.includes(hintIndex);
                    const isAvailable = isHintAvailable(hintIndex);
                    
                    let timeLeft = '';
                    if (timers && !isUsed && !isAvailable) {
                      if (hintIndex === 0) timeLeft = formatTimeLeft(timers.hint1);
                      if (hintIndex === 1) timeLeft = formatTimeLeft(timers.hint2);
                      if (hintIndex === 2) timeLeft = formatTimeLeft(timers.hint3);
                    }

                    return (
                      <div key={hintIndex} className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">
                          {t('hint')} {hintIndex + 1}:
                        </span>
                        {isUsed ? (
                          <div className="text-yellow-300 text-left flex-1 ml-2">
                            {question.hints[hintIndex]}
                          </div>
                        ) : isAvailable ? (
                          <button
                            onClick={() => useHint(hintIndex)}
                            className="bg-yellow-600 hover:bg-yellow-500 px-2 py-1 rounded text-xs"
                          >
                            {t('show')}
                          </button>
                        ) : (
                          <span className="text-gray-500">
                            {timeLeft || '−'}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {question.bonus && (
                <div className="neon-box-subtle p-4 mb-6">
                  <div className="text-sm text-yellow-400 mb-2">{t('bonusTask')}</div>
                  <div className="text-xs text-gray-400">{question.bonus}</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;