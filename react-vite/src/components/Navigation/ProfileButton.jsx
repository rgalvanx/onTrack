import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPersonFill } from 'react-icons/bs';
import { thunkLogout } from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const menuRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    window.alert('Feature coming soon...')
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <div className="profile-button-container" ref={menuRef}>
      <button
      className="profile-button"
      onClick={toggleMenu}
      aria-expanded={showMenu}
      aria-label="User menu">
        <BsPersonFill size={35}/>
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={menuRef}>
          {user ? (
            <>
              <li className="dropdown-item username">{user.username}</li>
              <li className="dropdown-item email">{user.email}</li>
              <li className="dropdown-item your-plans"
              onClick={handleClick}
              >Your Plans</li>
              <li className="dropdown-item your-likes"
              onClick={handleClick}
              // onClick={(e) => {
              //   e.preventDefault()
              //   navigate(`/${user.username}/plans`)
              //   }}
                >Your Likes</li>
              <li className="dropdown-item">
                <button className="logout-button" onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
            <li className="dropdown-item">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
                />
              </li>
              <li className="dropdown-item">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
                />
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
