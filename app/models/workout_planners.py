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
    comments = db.relationship('Comment', back_populates='workout_plans', cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='workout_plans', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'content': self.content,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'username': self.user.username,
            'like_count': len(self.likes)
        }
