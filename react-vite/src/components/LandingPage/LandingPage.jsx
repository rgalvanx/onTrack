import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPlansThunk } from "../../store/workoutPlan";
import { loadAllLikesThunk } from "../../store/likes";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const plans = useSelector((state) => Object.values(state.workouts))
    const user = useSelector((state) => state.session.user)
    
    useEffect(() => {
        dispatch(loadPlansThunk())
        dispatch(loadAllLikesThunk())
    }, [dispatch])

    return (
        <div
        className="landing-page"
        style={{marginTop: '50px'}}>
            {user && (
                <button
                className="create-button"
                style={{marginLeft: '50px'}}
                onClick={(e) => {
                    e.preventDefault()
                    navigate(`/workout_plans/create`)
                }}>Create a Workout Plan!
            </button>
            )}
            <ul
            className="workout-list">
            {plans.length > 0 ? (
                <>
                    {plans.map((workout) => {
                        return (
                        <div className="workout-box"key={workout.id}
                        onClick={(e) => {
                            e.preventDefault()
                            navigate(`/workout_plans/${workout.id}`)
                        }}>
                            <h1 className="workout category">{workout.category}</h1>
                            <h2 className="workout username">by {workout.username}</h2>
                            <h2 >{workout.like_count} likes</h2>
                        </div>
                    )
                    })}
                </>
            ) : (
                <>
                </>
            )}
            </ul>
        </div>
    )
}
