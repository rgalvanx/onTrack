import { useDispatch } from "react-redux";
import { addLikeThunk, loadAllLikesThunk } from "../../store/likes";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

const LikesButton = ({ workoutId, liked }) => {
    const dispatch = useDispatch()

    const handleLike = async () => {
        await dispatch(addLikeThunk(workoutId))
        dispatch(loadAllLikesThunk(workoutId))
    }

    return (
        <div className="like-button" onClick={handleLike}>
            {liked ? <FaThumbsUp /> : <FaRegThumbsUp />}
        </div>
    )
}


export default LikesButton
