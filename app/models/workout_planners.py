from .db import db, environment, SCHEMA, add_prefix_for_prod

class WorkoutPlan(db.Model):
    __tablename__ = 'workout_plans'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String, nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id'),
        ondelete='CASCADE'),
        nullable=False
    )
    created_at = db.Column(
        db.DateTime,
        default=db.func.current_timestamp()
    )
    updated_at = db.Column(
        db.DateTime,
        default=db.func.current_timestamp(),
        onupdate=db.func.current_timestamp()
    )

    user = db.relationship('User', back_populates='workout_plans')

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'content': self.content,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }