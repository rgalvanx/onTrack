from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    workout_plan_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('workout_plans.id'),
        ondelete='CASCADE'),
        nullable=False
    )
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id'),
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

    user = db.relationship('User', back_populates='comments')
    workout_plans = db.relationship('WorkoutPlan', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'workout_plan_id': self.workout_plan_id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'username': self.user.username
        }
