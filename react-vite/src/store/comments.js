import { csrfFetch } from "./csrf";

const LOAD_COMMENTS = 'comment/LOAD'
const ADD_COMMENT = 'comment/ADD'
const UPDATE_COMMENT = 'comment/UPDATE'
const DELETE_COMMENT = 'comment/DELETE'

const loadComments = ( comments ) => ({
    type: LOAD_COMMENTS,
    comments
})

const addComment = ( comment ) => ({
    type: ADD_COMMENT,
    comment
})

const updateComment = ( comment ) => ({
    type: UPDATE_COMMENT,
    comment
})

const deleteComment = ( comment ) => ({
    type: DELETE_COMMENT,
    comment
})

export const loadCommentsThunk = () => async ( dispatch ) => {
    const res = await csrfFetch('/api/comments')

    if(res) {
        const comments = await res.json()
        dispatch(loadComments(comments))
        return comments
    }
}

export const addCommentThunk = ( comment, workoutId ) => async ( dispatch ) => {
    const res = await csrfFetch(`/api/comments/${workoutId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( comment )
    })

    if(res.ok) {
        const newComment = await res.json()
        dispatch(addComment(newComment))
        return newComment
    }
}

export const updateCommentThunk = ( comment, commentId )  => async ( dispatch ) => {
    const res = await csrfFetch(`/api/comments'${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( comment )
    })

    if(res.ok) {
        const updatedComment = await res.json()
        dispatch(updateComment(updatedComment))
        return updatedComment
    }
}

export const deleteCommentThunk = ( commentId ) => async ( dispatch ) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })
    if(res.ok) {
        dispatch(deleteComment(commentId))
    }
}

export default function commentReducer(state = {}, action ) {
    switch(action.type) {
        case LOAD_COMMENTS: {
            const newState = {}
            action.comments.forEach((comment) => {
                newState[comment.id] = comment
            })
            return newState
        }
        case ADD_COMMENT: {
            return {
                ...state,
                [action.comment.id]: action.comment
            }
        }
        case UPDATE_COMMENT: {
            return {
                ...state,
                [action.comment.id]: {
                    ...state[action.comment.id],
                    ...action.comment
                }
            }
        }
        case DELETE_COMMENT: {
            const newState = { ...state }
            delete newState[action.comment]
            return newState
        }
        default:
            return state
    }
}
