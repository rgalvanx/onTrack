from flask import Blueprint, request, jsonify
from ..models import db, Comment, WorkoutPlan
from flask_login import login_required, current_user

comments_routes = Blueprint('comment', __name__)

@comments_routes.route('/', methods=['GET'])
def get_comments():
    comments = Comment.query.all()

    return jsonify([comment.to_dict() for comment in comments]), 200

@comments_routes.route('/<int:workout_plan_id>', methods=['POST'])
@login_required
def create_comment(workout_plan_id):
    data = request.get_json()
    content = data.get('content')

    if not content:
        return jsonify({'error': 'Comment must be provided'}), 400

    workout_plan = WorkoutPlan.query.get(workout_plan_id)
    if not workout_plan:
        return jsonify({'error': 'Workout plan not found'}), 404

    if workout_plan.user_id == current_user.id:
        return jsonify({'error': 'You cannot comment on your own workout plan!'}), 403

    new_comment = Comment(
        content=content,
        user_id=current_user.id,
        workout_plan_id = workout_plan_id
    )

    db.session.add(new_comment)
    db.session.commit()

    return jsonify(new_comment.to_dict()), 201

@comments_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def update_comment(comment_id):
    data = request.get_json()
    content = data.get('content')

    if not content:
        return jsonify({'error': 'Comment is required'}), 400

    comment = Comment.query.get(comment_id)
    if not comment:
        return jsonify({'error': 'Comment not found'}), 404

    if comment.user_id != current_user.id:
        print(comment.user_id)
        return jsonify({'error': 'This is Unauthorized' }), 403

    comment.content = content
    db.session.commit()

    return jsonify(comment.to_dict()), 200

@comments_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)

    if not comment:
        return jsonify({'error': 'Comment not found'}), 404
    if comment.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403

    db.session.delete(comment)
    db.session.commit()

    return jsonify({'message': 'Successfully deleted'}), 200
