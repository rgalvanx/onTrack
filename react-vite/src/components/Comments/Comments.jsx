import { useDebugValue, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadCommentsThunk } from "../../store/comments";
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../Navigation/OpenModalButton";

const Comments = ({ workoutId }) => {
    const dispatch = useDispatch()
    const comments = useSelector((state) =>
        Object.values(state.comments).filter((comment) => comment.workout_plan_id == Number(workoutId)))
    const regularComment = useSelector((state) => state.comments)
    const currentUser = useSelector((state) => state.session.user)
    const workout = useSelector((state) => state.workouts[workoutId])
    const commentOwner = comments?.user_id === currentUser?.id
    // console.log(workout.id)

    useEffect(() => {
        dispatch(loadCommentsThunk(workoutId))
    }, [dispatch])

    const newDate = (dateInput) => {
        const date = new Date(dateInput)
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options)
    }

    return (
        <div className="all-comments">
            {comments.length > 0 ? (
                <>
                    {comments.map((comment) => (
                        <div className="comment" key={comment.id}>
                            <h2 className="comment-username">{comment.username} {newDate(comment.updated_at)}</h2>
                            <h3 className="comment-content">{comment.content}</h3>
                            {commentOwner ? (
                                <button>Hello</button>
                            ) : (
                                <div> </div>
                            )}
                        </div>
                    ))}
                </>
            ) : (
                <h1>No Comments Yet!</h1>
            )}
        </div>
    )
}

export default Comments
