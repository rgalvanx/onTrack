import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPlanThunk } from "../../store/workoutPlan";
import { useNavigate } from "react-router-dom";

export default function AddWorkout() {
    const [ category, setCategory ] = useState('')
    const [ content, setContent ] = useState('')
    const [ errors, setErrors ] = useState({})
    const [ submitted, setSubmitted ] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        if(Object.values(errors).length) return errors
        const plan = { category, content }
        const newPlan = await dispatch(addPlanThunk( plan ))
        navigate(`/workout_plans/${newPlan.id}`)
    }

    return (
        <div className="create-workout">
            <button id='back-button' style={{width: 'fit-content', marginTop: '10px'}} onClick={() => {navigate(-1) }}>{`< Back`}</button>
                <h1> Add your own Workout Plan</h1>
                <form onSubmit={handleSubmit} className="create-plan">

                </form>
        </div>
    )
}
