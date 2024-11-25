import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadCommentsThunk } from "../../store/comments";
import OpenModalButton from "../Navigation/OpenModalButton";
import './Comments.css'
import EditCommentModal from "./EditCommentModal";
import DeleteCommentModal from "./DeleteCommentModal";

const Comments = ({ workoutId }) => {
    const dispatch = useDispatch()
    const comments = useSelector((state) =>
        Object.values(state.comments).filter((comment) => comment.workout_plan_id == Number(workoutId)))
    const currentUser = useSelector((state) => state.session.user)
    const yourComment = useSelector((state) =>
        Object.values(state.comments).find((comment) => (comment?.user_id === currentUser?.id) && (comment?.workout_plan_id == Number(workoutId))))

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
                            {currentUser?.id === comment.user_id && (
                                <div className="comment-stuff">
                                    <OpenModalButton
                                    className="comment-options"
                                    modalComponent={<EditCommentModal
                                        workoutId={workoutId}
                                        yourComment={yourComment}/>}
                                    itemText='Edit Comment'></OpenModalButton>
                                    <OpenModalButton
                                    className="comment-options"
                                    itemText='Delete Comment'
                                    modalComponent={<DeleteCommentModal
                                        yourComment={yourComment}/>}>
                                        </OpenModalButton>
                                </div>
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
