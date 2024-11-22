import { useDispatch, useSelector } from "react-redux";
import { loadPlansThunk } from "../../store/workoutPlan";
import { deletePlanThunk } from "../../store/workoutPlan";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import './Workouts.css'

export default function WorkoutsById() {
    const { workoutId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const workouts = useSelector((state) => state.workouts[workoutId])
    console.log(workouts)

    useEffect(() => {
        dispatch(loadPlansThunk(workoutId))
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
            <div className="content">
                <div className="workout-container">
                    <h3 className="workout-content">{workouts?.content}</h3>
                </div>
            </div>
            {}
        </>
    )
}
