import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPlanThunk } from "../../store/workoutPlan";
import { useNavigate } from "react-router-dom";

export default function AddWorkout() {
    const [ category, setCategory ] = useState('')
    const [ content, setContent ] = useState('')
    const [ errors, setErrors ] = useState({})
    const [ submitted, setSubmitted ] = useState(false)
    const user = useSelector((state) => Object.values(state.session))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log(user[1])

    useEffect(() => {
        const errors = {}

        if(category.length < 3) errors.category = 'Category must be at least 3 characters'
        if(content.length < 10) errors.content = 'Content must be at least 10 characters'

        setErrors(errors)
    }, [category, content])

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
                    <button type="submit">Create Plan!</button>
                </form>
        </div>
    )
}
