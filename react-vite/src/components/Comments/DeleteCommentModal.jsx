import { useModal } from '../../context/Modal'
import { deleteCommentThunk } from '../../store/comments'
import { useDispatch } from 'react-redux'
import './Comments.css'

const DeleteCommentModal = ({ yourComment }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    console.log(yourComment.id)

    const deleteComment = () => {
        dispatch(deleteCommentThunk(yourComment.id))
        closeModal()
    }

    return (
        <div>
            <h1>Delete Comment?</h1>
            <div>
                <h2>Are you sure you want to delete your comment?</h2>
            </div>
            <div>
                <button onClick={deleteComment}>Yes (Delete Comment)</button>
                <button onClick={closeModal}>No (Keep Comment)</button>
            </div>
        </div>
    )
}

export default DeleteCommentModal
