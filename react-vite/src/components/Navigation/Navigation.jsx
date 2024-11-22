import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul className="nav-bar" style={{backgroundColor: 'darkgoldenrod', margin: '0', padding: '20px, 0px'}}>
      <li className="profile-button-nav">
        <ProfileButton />
        <NavLink
        className="site-name"
        style={{
          textDecoration: 'none',
          fontSize: '2rem',
          fontWeight: '900',
          color: 'black'
        }}
        to="/">OnTrack</NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
