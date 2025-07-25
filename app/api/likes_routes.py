from flask import Blueprint, jsonify
from ..models import db, Like, WorkoutPlan
from flask_login import login_required, current_user

likes_routes = Blueprint('like', __name__)

@likes_routes.route('/', methods=['GET'])
def all_likes():
    likes = Like.query.all()

    return jsonify([like.to_dict() for like in likes]), 200

@likes_routes.route('/user/<int:user_id>', methods=['GET'])
@login_required
def user_liked_workouts(user_id):
    if current_user.id != user_id:
        return jsonify({'error': 'Unauthorized access'}), 403

    likes = Like.query.filter_by(user_id=user_id).all()
    liked_workouts = [like.workout_plans.to_dict() for like in likes]

    return jsonify({'liked_workouts': liked_workouts}), 200

@likes_routes.route('/<int:workout_plan_id>/like', methods=['POST'])
@login_required
def like_workout(workout_plan_id):
    workout_plan = WorkoutPlan.query.get(workout_plan_id)
    if workout_plan.user_id == current_user.id:
        return jsonify({'error': 'Cannot like your own plan'}), 400

    already_liked = Like.query.filter_by( user_id=current_user.id, workout_plan_id=workout_plan_id).first()

    if already_liked:
        return jsonify({'error': 'You have already liked this post'}), 400

    new_like = Like(user_id=current_user.id, workout_plan_id=workout_plan_id)
    db.session.add(new_like)
    db.session.commit()

    return jsonify(new_like.to_dict()), 201

@likes_routes.route('/<int:workout_plan_id>/like', methods=['DELETE'])
@login_required
def unlike_workout(workout_plan_id):
    already_liked = Like.query.filter_by( user_id=current_user.id, workout_plan_id=workout_plan_id).first()

    if not already_liked:
        return jsonify({'error': 'You have not liked this post yet'}), 400

    db.session.delete(already_liked)
    db.session.commit()

    return jsonify({'message': 'Successfully unliked'}), 200

@likes_routes.route('/<int:workout_plan_id>/likes', methods=['GET'])
def plan_likes(workout_plan_id):
    plan = WorkoutPlan.query.get(workout_plan_id)
    if not plan:
        return jsonify({'error': 'Plan not found!'}), 404

    likes = Like.query.filter_by(workout_plan_id=workout_plan_id).count()

    return jsonify({ 'workout_plan_id': workout_plan_id, 'like_count': likes })
