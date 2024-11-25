import { useDispatch, useSelector } from "react-redux";
import { loadPlansThunk } from "../../store/workoutPlan";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import OpenModalButton from "../Navigation/OpenModalButton";
import DeleteWorkout from "./DeleteWorkout";
import './Workouts.css'
import Comments from "../Comments/Comments";
import { loadCommentsThunk } from "../../store/comments";
import CreateCommentModal from "../Comments/CreateCommentModal";

export default function WorkoutsById() {
    const { workoutId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const workouts = useSelector((state) => state.workouts[workoutId])
    const user = useSelector((state) => state.session.user)
    const correctUser = user?.id === workouts?.user_id
    const notOwner = user?.id !== workouts?.user_id
    const comments = useSelector((state) => (state.comments[workoutId]))
    const userCommented = comments?.user_id === user.id
    console.log(userCommented)

    useEffect(() => {
        dispatch(loadPlansThunk(workoutId))
        dispatch(loadCommentsThunk(workoutId))
    }, [dispatch])

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
                {correctUser && (
                    <div className="user-options">
                        <OpenModalButton className="delete-button" itemText='Delete Workout' modalComponent={<DeleteWorkout workout={workouts}/>}>Delete Workout</OpenModalButton>
                        <button onClick={() => navigate(`/workout_plans/${workoutId}/edit`)}className="update-button">Update Your Plan</button>
                    </div>
                )}
                {notOwner && !userCommented && (
                    <div>
                        <OpenModalButton className="add-comment" itemText='Add Your Comment!'modalComponent={<CreateCommentModal navigate={navigate} workoutId={workoutId}/>}></OpenModalButton>
                    </div>
                )}
                <Comments workoutId={workoutId}/>
            </div>
        </>
    )
}
