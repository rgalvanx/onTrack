import { useState } from "react";
import { thunkLogin } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleDemo = async (e) => {
    e.preventDefault()
    const serverResponse = await dispatch(
      thunkLogin({
        email: 'demo@aa.io',
        password: 'password'
      })
    )

    if(serverResponse) {
      setErrors(serverResponse)
    } else {
      closeModal()
    }
  }

  return (
    <div className="login-modal">
      <h1 className="login-title">Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
          {errors.email && <p className="err-message">{errors.email}</p>}
        <label className="login-label">
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
          {errors.password && <p className="err-message">{errors.password}</p>}
        <label className="login-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <button onClick={handleDemo}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
