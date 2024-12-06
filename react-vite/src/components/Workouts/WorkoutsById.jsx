import { useDispatch, useSelector } from "react-redux";
import { loadPlansThunk } from "../../store/workoutPlan";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import OpenModalButton from "../Navigation/OpenModalButton";
import DeleteWorkout from "./DeleteWorkout";
import './Workouts.css'
import Comments from "../Comments/Comments";
import { loadCommentsThunk } from "../../store/comments";
import { loadAllLikesThunk, loadLikesThunk } from "../../store/likes";
import CreateCommentModal from "../Comments/CreateCommentModal";
import { FaRegThumbsUp } from "react-icons/fa";
import LikesButton from "../Likes/AddLike";

export default function WorkoutsById() {
    const { workoutId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const workouts = useSelector((state) => state.workouts[workoutId])
    const user = useSelector((state) => state.session.user)
    const correctUser = user?.id === workouts?.user_id
    const notOwner = user?.id !== workouts?.user_id
    const comments = useSelector((state) =>
        Object.values(state.comments).find((comment) => (comment.workout_plan_id == Number(workoutId)) && (comment?.user_id === user?.id)))
    const liked = useSelector((state) => Object.values(state.likes).find((like) => (like?.user_id == user?.id) && (like?.workout_plan_id == Number(workoutId))))

    useEffect(() => {
        dispatch(loadPlansThunk(workoutId))
        dispatch(loadCommentsThunk(workoutId))
        dispatch(loadAllLikesThunk(workoutId))
        dispatch(loadLikesThunk(workoutId))
    }, [dispatch, workoutId, workouts?.likes])

    if(!workouts) return (
        <h1>No Projects Found!</h1>
    )

    return (
        <>
            <div className="workout-header">
                <h1 className="header-category">{workouts?.category}</h1>
                <h2 className="header-name">By {workouts?.username}</h2>
            </div>
            <div className="content" style={{paddingBottom: '40px'}}>
                <div className="workout-container">
                    <h3 style={{ lineHeight: '50px'}}className="workout-content">{workouts?.content}</h3>
                </div>
            </div>
            <div className="comments-section">
                {!user && (
                    <h2 className="like_count_commented" style={{display: 'flex'}}><div className="like-button" ><FaRegThumbsUp />{workouts.like_count}</div></h2>
                )}
                {!liked && comments && (
                    <h2 className="like_count_commented" style={{display: 'flex'}}>
                        <LikesButton workoutId={workoutId} liked={liked}/>{workouts.like_count}
                    </h2>
                )}
                {comments && liked && (
                    <h2 className="like_count_commented" style={{display: 'flex'}}>
                        <LikesButton workoutId={workoutId} liked={liked}/>{workouts.like_count}
                    </h2>
                )}

                {correctUser && (
                    <div className="users-options">
                    <div className="user-options">
                        <OpenModalButton className="delete-button" itemText='Delete Workout' modalComponent={<DeleteWorkout workout={workouts}/>}>Delete Workout</OpenModalButton>
                        <button onClick={() => navigate(`/workout_plans/${workoutId}/edit`)}className="update-button">Update Your Plan</button>
                    </div>
                    <h2 className="like_count_commented" style={{display: 'flex', paddingTop: '0px', paddingBottom: '0px'}}>
                        <LikesButton workoutId={workoutId} liked={liked}/>{workouts.like_count}
                    </h2>
                    </div>
                )}
                {notOwner && !comments && user &&(
                    <div className="add-your-comment">
                        <OpenModalButton className="add-comment" itemText='Add Your Comment!'modalComponent={<CreateCommentModal navigate={navigate} workoutId={workoutId}/>}></OpenModalButton>
                        <h2 className="like_count_commented" style={{display: 'flex'}}>
                            <LikesButton workoutId={workoutId} liked={liked}/>{workouts.like_count}
                        </h2>
                    </div>
                )}
                <Comments workoutId={workoutId}/>
            </div>
        </>
    )
}
