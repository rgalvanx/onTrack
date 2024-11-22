import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPlansThunk } from "../../store/workoutPlan";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const plans = useSelector((state) => Object.values(state.workouts))
    console.log(plans)


    useEffect(() => {
        dispatch(loadPlansThunk())
    }, [dispatch])

    return (
        <div
        className="landing-page"
        style={{marginTop: '50px'}}>
            <button
            className="create-button"
            style={{marginLeft: '50px'}}
            onClick={(e) => {
                e.preventDefault()
                navigate(`/workout_plans/create`)
            }}>Create a Workout Plan!
            </button>
            <ul
            className="workout-list">
            {plans.length > 0 ? (
                <>
                    {plans.map((workout) => (
                        <div className="workout-box"key={workout.id}
                        onClick={(e) => {
                            e.preventDefault()
                            navigate(`/workout_plans/${workout.id}`)
                        }}>
                            <h1 className="workout category">{workout.category}</h1>
                            {/* <h2 >{workout.content}</h2> */}
                            <h2 className="workout username">by {workout.username}</h2>
                        </div>
                    ))}
                </>
            ) : (
                <>
                </>
            )}
            </ul>
        </div>
    )
}
