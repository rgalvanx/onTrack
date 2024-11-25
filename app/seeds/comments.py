from app.models.comments import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comments = [
        {
            'content': 'Great advice!',
            'user_id': 3,
            'workout_plan_id': 2
        },
        {
            'content': 'Love this routine.',
            'user_id': 1,
            'workout_plan_id': 2
        },
        {
            'content': 'Perfect for my goals.',
            'user_id': 2,
            'workout_plan_id': 3
        },
        {
            'content': 'Effective and simple.',
            'user_id': 1,
            'workout_plan_id': 4
        },
        {
            'content': 'Can’t wait to do this!',
            'user_id': 2,
            'workout_plan_id': 4
        },
        {
            'content': 'Feeling stronger already.',
            'user_id': 3,
            'workout_plan_id': 5
        },
        {
            'content': 'Fantastic plan!',
            'user_id': 2,
            'workout_plan_id': 1
        },
    ]

    for comment in comments:
        seedComment = Comment(
            content=comment['content'],
            user_id=comment['user_id'],
            workout_plan_id=comment['workout_plan_id']
        )
        db.session.add(seedComment)

    db.session.commit()

def undo_comments():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM comments'))

    db.session.commit()
