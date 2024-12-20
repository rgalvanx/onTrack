import { useModal } from '../../context/Modal'
import { deleteCommentThunk } from '../../store/comments'
import { useDispatch } from 'react-redux'
import './Comments.css'

const DeleteCommentModal = ({ yourComment }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const deleteComment = () => {
        dispatch(deleteCommentThunk(yourComment.id))
        closeModal()
    }

    return (
        <div className='delete-comment-modal'>
            <h1 style={{ textAlign: 'center'}}>Delete Comment?</h1>
            <div>
                <h2>Are you sure you want to delete your comment?</h2>
            </div>
            <div className='delete-options'>
                <button className='delete-comment' onClick={deleteComment}>Yes (Delete Comment)</button>
                <button className='keep-comment' onClick={closeModal}>No (Keep Comment)</button>
            </div>
        </div>
    )
}

export default DeleteCommentModal
