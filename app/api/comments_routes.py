from flask import Blueprint, request, jsonify
from ..models import db, Comment, WorkoutPlan
from flask_login import login_required, current_user

comments_routes = Blueprint('comment', __name__)

@comments_routes.route('/', methods=['GET'])
def get_comments():
    comments = Comment.query.all()

    return jsonify([comment.to_dict() for comment in comments]), 200

@comments_routes.route('/', methods=['POST'])
@login_required
def create_comment():
    data = request.get_json()
    content = data.get('content')

    if not content:
        return jsonify({'error': 'Content or workout_plan_id not provided'}), 400

    workout_plan = WorkoutPlan.query.filter_by(id=data['workout_plan_id']).first()
    if not workout_plan:
        return jsonify({'error': 'Workout plan not found'}), 404

    if workout_plan.user_id == current_user.id:
        return jsonify({'error': 'You cannot comment on your own workout plan!'}), 403

    new_comment = Comment(
        content=data['content'],
        user_id=current_user.id,
        workout_plan_id = workout_plan.id
    )

    db.session.add(new_comment)
    db.session.commit()

    return jsonify(new_comment.to_dict()), 201
