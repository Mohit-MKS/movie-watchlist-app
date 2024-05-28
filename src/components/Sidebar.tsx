// src/components/Sidebar.js

import { useContext } from "react";
import { Link } from "react-router-dom";
import defaultUserImage from "../assets/default-user.svg"; // Assuming you have a default user image
import "./Sidebar.scss";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../models/app-context.model";
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  const { state } = useContext(AppContext) as UserContext;

  return (
    <div className="sidebar-component">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Watchlist</h2>
        </div>
        <div className="sidebar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/watchlist">Watchlist</Link>
          </li>
          {/* <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li> */}
        </div>

        {state.user?.email && (
          <div className="user-info">
            <div className="d-flex align-items-center">
              <img src={defaultUserImage} alt="User" className="user-image" />
              <p className="user-name">{state.user.name}</p>
            </div>
            <LogoutIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
