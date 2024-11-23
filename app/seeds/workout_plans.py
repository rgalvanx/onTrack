from app.models.workout_planners import db, WorkoutPlan, environment, SCHEMA
from sqlalchemy.sql import text

def seed_workout_plans():
    workout_plans = [
        {
            "category": "Back",
            "content":
            """Deadlifts 135(1x12) 185(3x10) 225(3x8)
            Barbell Rows 95(3x10) 135(3x8) 155(2x6)
            Lat Pull-down 99(1x10) 132(1x10) 148(2x8)
            Dumbbell Rows 50(3x12) 60(3x10)
            T-Bar Row 90(3x8) 135(2x6)""",
            'user_id': 1,
        },
        {
            "category": "Shoulders",
            "content":
            """Seated Shoulder Press 35(1x12) 50(3x10) 60(2x8)
            Lateral Raises 10(3x15) 15(3x12)
            Front Raises 12(3x12) 15(3x10)
            Arnold Press 25(3x12) 30(2x10)
            Shrugs 135(4x10) 185(3x8)""",
            'user_id': 2
        },
        {
            "category": "Legs",
            "content":
            """Squats 135(1x12) 185(3x10) 225(2x8)
            Leg Press 200(3x12) 250(2x10)
            Lunges 20(3x12) each leg
            Leg Curls 50(3x15) 70(2x12)
            Calf Raises 100(3x20) 120(3x15)""",
            'user_id': 3
        },
        {
            "category": "Full Body",
            "content":
            """Deadlifts 135(1x12) 185(3x10) 225(3x8)
            Squats 135(1x12) 185(3x10) 225(2x8)
            Bench Press 95(1x12) 135(3x10) 185(2x6)
            Pull-ups (Bodyweight, 3x8)
            Shoulder Press 35(3x12) 50(2x10)
            Barbell Rows 95(3x10) 135(3x8) 155(2x6)""",
            'user_id': 3
        },
        {
            "category": "Chest/Triceps",
            "content":
            """Bench Press 95(1x12) 135(3x10) 185(2x6)
            Incline Dumbbell Press 25(3x12) 40(2x10)
            Chest Flys 15(3x15) 20(3x12)
            Tricep Pushdowns 30(3x12) 40(3x10)
            Skull Crushers 40(3x12) 50(3x10)""",
            'user_id': 1
        }
    ]

    for plan in workout_plans:
        workout_plan = WorkoutPlan(
            category=plan['category'],
            content=plan['content'],
            user_id=plan['user_id']
        )
        db.session.add(workout_plan)

    db.session.commit()

def undo_workout_plans():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.workout_plans RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM workout_plans'))

    db.session.commit()
