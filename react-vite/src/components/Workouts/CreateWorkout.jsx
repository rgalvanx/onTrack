import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPlanThunk } from "../../store/workoutPlan";
import { useNavigate } from "react-router-dom";

const CreateWorkout = () => {
    const [ category, setCategory ] = useState('')
    const [ content, setContent ] = useState('')
    const [ errors, setErrors ] = useState({})
    const [ submitted, setSubmitted ] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const errors = {}

        if(category.length < 3) errors.category = 'Category must be at least 3 characters'
        if(category.length > 25) errors.category = 'Category cannot exceed 3 characters'
        if(content.length > 500) errors.content = 'Content cannot exceed 500 characters'
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
                <h1 className="add-workout"> Add your own Workout Plan</h1>
                <form
                onSubmit={handleSubmit}
                className="create-plan">
                    {submitted && errors.category && <p className="err-message">{errors.category}</p>}
                    <label className="category">
                        Category:
                        <input
                        type="text"
                        value={category}
                        placeholder="ie: 'arms', 'legs', 'full-body'"
                        onChange={(e) => setCategory(e.target.value)}
                        required />
                    </label>
                    {submitted && errors.content && <p className="err-message">{errors.content}</p>}
                    <label className="content">
                        Content:
                        <textarea
                        className="content-text"
                        placeholder="ie:'db arm curls 25(1x 8) 30(2x8)'
'preacher curl 45(2x8) 55(1x6)'"
                        type="text" value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required />
                    </label>
                    <button
                    className='create-plan-button'
                    type="submit">Create Plan!</button>
                </form>
        </div>
    )
}

export default CreateWorkout
