import { csrfFetch } from "./csrf";
const LOAD_LIKES = 'like/LOAD'
const ADD_LIKE = 'like/ADD'
const DELETE_LIKE = 'like/DELETE'
const LOAD_ALL_LIKES = 'likes/LOAD_ALL'

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

const loadAllLikes = ( likes ) => ({
    type: LOAD_ALL_LIKES,
    likes
})

export const loadLikesThunk = ( workout_plan_id ) => async ( dispatch ) => {
    const res = await csrfFetch(`/api/likes/${workout_plan_id}/likes`)

    if(res) {
        const likes = await res.json()
        dispatch(loadLikes(likes))
        return likes
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
        console.log('here')
        const removeLike = await res.json()
        dispatch(deleteLike(removeLike))
    }
}

export const loadAllLikesThunk = () => async ( dispatch ) => {
    const res = await csrfFetch('/api/likes/')

    if(res) {
        const getAllLikes = await res.json()
        dispatch(loadAllLikes(getAllLikes))
        return getAllLikes
    }
}

export default function likeReducer(state = {}, action) {
    switch(action.type) {
        case LOAD_LIKES: {
            const newState = { ...state }
            action.likes.forEach((like) => {
                newState[like.workout_plan_id] = like
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
            delete newState[action.like.id]
            return newState
        }
        case LOAD_ALL_LIKES: {
            const newState = { ...state }
            action.likes.forEach((like) => {
                newState[like.id] = like
            })
            return newState
        }
        default:
            return state
    }
}
