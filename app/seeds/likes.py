from app.models.likes import db, Like, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    likes = [
        {
            'user_id': 1,
            'workout_plan_id': 2
        },
        {
            'user_id': 2,
            'workout_plan_id': 3
        },
        {
            'user_id': 1,
            'workout_plan_id': 4
        },
        {
            'user_id': 3,
            'workout_plan_id': 2
        },
    ]

    for like in likes:
        new_like = Like(
            user_id=like['user_id'],
            workout_plan_id=like['workout_plan_id']
        )
        db.session.add(new_like)

    db.session.commit()

def undo_likes():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM likes'))

    db.session.commit()
