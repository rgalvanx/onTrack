import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addCommentThunk, loadCommentsThunk } from "../../store/comments";

const CreateCommentModal = ({ workoutId }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [ content, setContent ] = useState('')
    const [ errors, setErrors ] = useState({})
    const [ submitted, setSubmitted ] = useState(false)

    useEffect(() => {
        const errors = {}

        if(content.length < 10) errors.content = 'Comment must be at least 10 characters'

        setErrors(errors)
    }, [content])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        if(Object.values(errors).length) return errors
        const comment = { content }
        await dispatch(addCommentThunk( comment, workoutId ))
        dispatch(loadCommentsThunk(workoutId))
        closeModal()
    }

    return (
        <div className="create-comment-modal">
            <h1>Leave a comment</h1>
                <form onSubmit={handleSubmit} className="create-comment">
                    {submitted && errors.content && <p className="err.message">{errors.content}</p>}
                    <label className="content">
                        Comment:
                        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} required/>
                    </label>
                    <button type="submit">Save</button>
                </form>
        </div>
    )
}

export default CreateCommentModal
