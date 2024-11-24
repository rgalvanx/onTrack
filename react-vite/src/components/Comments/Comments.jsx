import { useDebugValue, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadCommentsThunk } from "../../store/comments";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../Navigation/OpenModalButton";

const Comments = ({ workoutId }) => {
    const { planId } = useParams()
    const dispatch = useDispatch()
    const comments = useSelector((state) =>
        Object.values(state.comments).filter((comment) => comment.workout_plan_id == Number(workoutId)))
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
                        </div>
                    ))}
                </>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default Comments
