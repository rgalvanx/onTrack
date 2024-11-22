import { useParams, useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deletePlanThunk } from "../../store/workoutPlan";
import { useDispatch } from "react-redux";

const DeleteWorkout = ({ workout }) => {
    const { workoutId } = useParams()
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const navigate = useNavigate()

    const deletePlan = () => {
        dispatch(deletePlanThunk( workoutId ))
        closeModal()
        navigate('/')
    }

    return (
        <div className="delete-workout-modal">
            <h1 className="delete-title">Are you sure you want to delete your {workout?.category} workout?</h1>
            <div className="options">
                <button className="keep" onClick={closeModal}>No (Keep Plan)</button>
                <button className="delete" onClick={deletePlan}>Yes (Delete Plan)</button>
            </div>
        </div>
    )
}


export default DeleteWorkout
