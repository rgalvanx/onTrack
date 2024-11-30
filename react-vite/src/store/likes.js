import { csrfFetch } from "./csrf";
const LOAD_LIKES = 'like/LOAD'
const ADD_LIKE = 'like/ADD'
const DELETE_LIKE = 'like/DELETE'

const loadLikes = ( likes ) => ({
    type: LOAD_LIKES,
    likes
})

const addLike = ( like ) => ({
    type: ADD_LIKE,
    like
})

const deleteLike = ( like ) => ({
    type: DELETE_LIKE,
    like
})

export const loadLikesThunk = ( workout_plan_id ) => async ( dispatch ) => {
    const res = await csrfFetch(`/api/likes/${workout_plan_id}/likes`)

    if(res) {
        const likes = await res.json()
        dispatch(loadLikes(likes))
    }
}

export const addLikeThunk = ( workout_plan_id ) => async ( dispatch ) => {
    const res = await csrfFetch(`/api/likes/${workout_plan_id}/like`, {
        method: 'POST'
    })
    if(res) {
        const newLike = await res.json()
        dispatch(addLike(newLike))
    }
}

export const deleteLikeThunk = ( workout_plan_id ) => async ( dispatch ) => {
    const res = await csrfFetch(`/api/likes/${workout_plan_id}/like`, {
        method: 'DELETE'
    })
    if(res) {
        const removeLike = await res.json()
        dispatch(deleteLike(removeLike))
    }
}

export default function likeReducer(state = {}, action) {
    switch(action.type) {
        case LOAD_LIKES: {
            const newState = {}
            action.likes.forEach((like) => {
                newState[like.id] = like
            })
            return newState
        }
        case ADD_LIKE: {
            return {
                ...state,
                [action.like.id]: action.like
            }
        }
        case DELETE_LIKE: {
            const newState = { ...state }
            delete newState[action.like]
            return newState
        }
        default:
            return state
    }
}
