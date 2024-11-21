from flask import Blueprint, request, jsonify
from ..models import db, WorkoutPlan
from flask_login import login_required, current_user

workout_plan_routes = Blueprint('workout_plan', __name__)

@workout_plan_routes.route('/', methods=['GET'])
def get_plans():
    plans = WorkoutPlan.query.all()

    return jsonify([plan.to_dict() for plan in plans]), 200

@workout_plan_routes.route('/user/<int:user_id>', methods=['GET'])
def get_user_plans(user_id):
    plans = WorkoutPlan.query.filter_by(user_id=user_id).all()

    if not plans:
        return jsonify({'error': 'No workout plans for this user found'}), 404

    return jsonify([plan.to_dict() for plan in plans]), 200

@workout_plan_routes.route('/<int:id>', methods=['GET'])
def get_plan_by_id(id):
    plan = WorkoutPlan.query.get_or_404(id)

    return jsonify([plan.to_dict()])

@workout_plan_routes.route('/user', methods=['GET'])
@login_required
def user_route():
    return jsonify({
        'message': f'welcome {current_user.username}',
        'user_id': current_user.id
    })

@workout_plan_routes.route('/', methods=['POST'])
@login_required
def create_plan():
    data = request.get_json()
    new_plan = WorkoutPlan(
        category=data['category'],
        content=data['content'],
        user_id=current_user.id
    )

    db.session.add(new_plan)
    db.session.commit()

    return jsonify(new_plan.to_dict()), 201

@workout_plan_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_plan(id):
    plan = WorkoutPlan.query.get(id)

    if not plan:
        return jsonify({'error': 'Workout Plan not found'}), 404
    if plan.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.get_json()

    plan.category = data.get('category', plan.category)
    plan.content = data.get('content', plan.content)

    db.session.commit()

    return jsonify(plan.to_dict()), 200

@workout_plan_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_plan(id):
    plan = WorkoutPlan.query.get(id)

    if not plan:
        return jsonify({'error': 'Workout Plan not found'}), 404
    if plan.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403

    db.session.delete(plan)
    db.session.commit()

    return jsonify({'message': 'Successfully deleted'}), 200
