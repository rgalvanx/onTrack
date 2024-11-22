import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updatePlanThunk } from "../../store/workoutPlan";

const EditWorkout = () => {
    const { workoutId } = useParams()
    const [ category, setCategory ] = useState('')
    const [ content, setContent ] = useState('')
    const [ errors, setErrors ] = useState({})
    const [ submitted, setSubmitted ] = useState(false)
    const navigate = useNavigate()
    const workout = useSelector((state) => state.workouts[workoutId])
    const dispatch = useDispatch()
    console.log(workout)

    useEffect(() => {
        const errors = {}

        if(category.length < 3) errors.category = 'Category must be at least 3 characters'
        if(content.length < 10) errors.content = 'Content must be at least 10 characters'

        setErrors(errors)
    }, [category, content])

    useEffect(() => {
        if(workout) {
            setCategory(workout.category)
            setContent(workout.content)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        if(Object.values(errors).length) return errors
        const plan = { category, content}
        const updatedPlan = await dispatch(updatePlanThunk( plan, workoutId ))
        navigate(`/workout_plans/${updatedPlan.id}`)
    }

    return (
        <div className="create-workout">
            <button id='back-button' style={{width: 'fit-content', marginTop: '10px'}} onClick={() => {navigate(-1) }}>{`< Back`}</button>
                <h1> Update you Workout Plan</h1>
                <form onSubmit={handleSubmit} className="create-plan">
                    {submitted && errors.category && <p className="err-message">{errors.category}</p>}
                    <label className="category">
                        Category:
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                    </label>
                    {submitted && errors.content && <p className="err-message">{errors.content}</p>}
                    <label className="content">
                        Content:
                        <textarea className="content-text" type="text" value={content} onChange={(e) => setContent(e.target.value)} required />
                    </label>
                    <button type="submit">Update Plan!</button>
                </form>
        </div>
    )
}

export default EditWorkout
