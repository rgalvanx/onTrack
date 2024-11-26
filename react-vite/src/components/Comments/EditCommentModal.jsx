import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { loadCommentsThunk, updateCommentThunk } from "../../store/comments";

const EditCommentModal = ({ workoutId, yourComment }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [ content, setContent ] = useState(yourComment?.content)
    const [ errors, setErrors ] = useState({})
    const [ submitted, setSubmitted ] = useState(false)

    useEffect(() => {
        const errors = {}

        if(content.length < 10) errors.content = 'Comment must be at least 10 characters'
        if(content.length > 200) errors.content = 'Comment cannot exceed 100 characters'
        setErrors(errors)
    }, [content])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        if(Object.values(errors).length) return errors
        const comment = { content }
        await dispatch(updateCommentThunk( comment, yourComment.id ))
        dispatch(loadCommentsThunk(workoutId))
        closeModal()
    }

    return (
        <div className="create-comment-modal">
            <h1>Edit your comment</h1>
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

export default EditCommentModal
