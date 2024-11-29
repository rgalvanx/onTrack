from .db import db, environment, SCHEMA, add_prefix_for_prod

class Likes(db.Model):
    __tablename__ = 'likes'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id'),
        ondelete='CASCADE'),
        nullable=False
    )
    workout_plan_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('workout_plans.id'),
        ondelete='CASCADE'),
        nullable=False
    )
    created_at = db.Column(
        db.DateTime,
        default = db.func.current_timestamp()
    )
    updated_at = db.Column(
        db.DateTime,
        default = db.func.current_timestamp(),
        onupdate = db.func.current_timestamp()
    )

    user = db.relationship('User', back_populates='likes')
    workout_plans = db.relationship('WorkoutPlan', back_populates='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'workout_plan_id': self.workout_plan_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'username': self.user.username
        }
