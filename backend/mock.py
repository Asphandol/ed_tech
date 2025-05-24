from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from questions.models import Question


Base.metadata.create_all(bind=engine)

def create_mock_questions(db: Session):
    questions = [
        {
        "question": "What is the largest ocean on Earth?",
        "options": ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        "correct_option": "Pacific Ocean"
    },
    {
        "question": "Which element has the chemical symbol 'O'?",
        "options": ["Gold", "Oxygen", "Silver", "Iron"],
        "correct_option": "Oxygen"
    },
    {
        "question": "How many continents are there?",
        "options": ["5", "6", "7", "8"],
        "correct_option": "7"
    },
    {
        "question": "Which language is primarily spoken in Brazil?",
        "options": ["Spanish", "Portuguese", "French", "English"],
        "correct_option": "Portuguese"
    },
    {
        "question": "What is the square root of 64?",
        "options": ["6", "7", "8", "9"],
        "correct_option": "8"
    },
    {
        "question": "Which animal is known as the King of the Jungle?",
        "options": ["Tiger", "Elephant", "Lion", "Gorilla"],
        "correct_option": "Lion"
    },
    {
        "question": "What is H2O commonly known as?",
        "options": ["Salt", "Water", "Hydrogen Peroxide", "Oxygen"],
        "correct_option": "Water"
    },
    {
        "question": "Who painted the Mona Lisa?",
        "options": ["Vincent Van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        "correct_option": "Leonardo da Vinci"
    },
    {
        "question": "Which country hosted the 2016 Summer Olympics?",
        "options": ["China", "Brazil", "UK", "Russia"],
        "correct_option": "Brazil"
    },
    {
        "question": "What is the currency of Japan?",
        "options": ["Yen", "Won", "Dollar", "Rupee"],
        "correct_option": "Yen"
    },
    {
        "question": "How many legs does a spider have?",
        "options": ["6", "8", "10", "12"],
        "correct_option": "8"
    },
    {
        "question": "What does DNA stand for?",
        "options": ["Deoxyribonucleic Acid", "Dinucleic Acid", "Deoxynucleic Acid", "Ribonucleic Acid"],
        "correct_option": "Deoxyribonucleic Acid"
    },
    {
        "question": "Which planet has the most moons?",
        "options": ["Jupiter", "Saturn", "Mars", "Neptune"],
        "correct_option": "Saturn"
    }
    ]

    for q in questions:
        db_question = Question(
            question=q["question"],
            options=q["options"],
            correct_option=q["correct_option"]
        )
        db.add(db_question)
    db.commit()
    print("Mock questions added to the database.")

if __name__ == "__main__":
    db = SessionLocal()
    create_mock_questions(db)
    db.close()
