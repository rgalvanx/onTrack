import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul className="nav-bar" style={{backgroundColor: 'rgb(84, 84, 235)', margin: '0', padding: '20px, 0px', borderRadius: '20px'}}>
      <li className="profile-button-nav">
        <ProfileButton />
        <NavLink
        className="site-name"
        style={{
          textDecoration: 'none',
          fontSize: '2rem',
          fontWeight: '900',
          color: 'white'
        }}
        to="/">OnTrack</NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
