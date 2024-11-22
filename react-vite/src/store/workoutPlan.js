import { csrfFetch } from "./csrf"

const LOAD_PLANS = 'workoutPlan/LOAD'
const ADD_PLAN = 'workoutPlan/ADD'
const UPDATE_PLAN = 'workoutPlan/UPDATE'
const DELETE_PLAN = 'workoutPlan/DELETE'
const LOAD_ONE_PLAN = 'workoutPlan/LOAD_ONE'
const LOAD_USER_PLANS = 'workoutPlan/LOAD_USER'

const loadPlans = ( plans ) => ({
    type: LOAD_PLANS,
    plans
})

const addPlan = ( plan ) => ({
    type: ADD_PLAN,
    plan
})

const updatePlan = ( plan ) => ({
    type: UPDATE_PLAN,
    plan
})

const deletePlan = ( plan ) => ({
    type: DELETE_PLAN,
    plan
})

const loadOnePlan = ( plan ) => ({
    type: LOAD_ONE_PLAN,
    plan
})

const loadUserPlans = ( plans ) => ({
    type: LOAD_USER_PLANS,
    plans
})


export const loadPlansThunk = () => async ( dispatch ) => {
    const res = await csrfFetch('/api/workout_plans')

    if(res) {
        const plans = await res.json()
        dispatch(loadPlans(plans))
        return plans
    }
}

export const addPlanThunk = ( payload ) => async ( dispatch ) => {
    const res = await csrfFetch('/api/workout_plans/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( payload ),
    })

    if(res.ok) {
        const newPlan = await res.json()
        dispatch(addPlan(newPlan))
        return newPlan
    } else {
        const error = await res.json()
        console.error('failed to add plan', error)
    }
}

export const updatePlanThunk = ( payload, planId, userId ) => async ( dispatch ) => {
    const res = await csrfFetch(`/api/workout_plans/${planId}`, {
        method: 'PUT',
        body: JSON.stringify( payload ),
        headers: { 'userId': userId }
    })
    if(res) {
        const updatedPlan = await res.json()
        dispatch (updatePlan(updatedPlan))
        return updatedPlan
    }
}

export const deletePlanThunk = ( planId, userId ) => async ( dispatch ) => {
    const res = await csrfFetch(`/api/workout_plans/${planId}`, {
        method: 'DELETE',
        headers: { 'userId': userId }
    })
    if(res) {
        dispatch(deletePlan(planId))
        return planId
    }
}

export const loadOnePlanThunk = ( planId ) => async ( dispatch ) => {
    const res = await csrfFetch(`/api/workout_plans/${planId}`)

    if(res) {
        const plan = await res.json()
        dispatch(loadOnePlan(plan))
        return plan
    }
}

export const loadUserPlansThunk = ( userId ) => async ( dispatch ) => {
    const res = await csrfFetch(`/api/workout_plans/user/${userId}`)

    if(res) {
        const plans = await res.json()
        dispatch(loadUserPlans(plans))
        return plans
    }
}

export default function workoutReducer(state = {}, action) {
    switch(action.type) {
        case LOAD_PLANS: {
            const newState = {}
            action.plans.forEach((plan) => {
                newState[plan.id] = plan
            })
            return newState
        }
        case ADD_PLAN: {
            return {
                ...state,
                [action.plan.id]: action.plan
            }
        }
        case UPDATE_PLAN: {
            return {
                ...state,
                [action.plan.id]: {
                    ...state[action.plan.id],
                    ...action.plan
                }
            }
        }
        case DELETE_PLAN: {
            const newState = { ...state }
            delete newState[action.plan]
            return newState
        }
        case LOAD_ONE_PLAN: {
            return {
                ...state,
                [action.plan.id]: action.plan
            }
        }
        case LOAD_USER_PLANS: {
            const newState = {}
            action.plans.forEach((plan) => {
                newState[plan.id] = plan
            })
            return newState
        }
        default:
            return state
    }
}
