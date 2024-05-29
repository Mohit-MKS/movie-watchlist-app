import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import defaultUserImage from "../assets/default-user.svg"; // Assuming you have a default user image
import "./Sidebar.scss";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../models/app-context.model";
import LogoutIcon from '@mui/icons-material/Logout';
import { StorageService } from "../services/storageService";
import { Constants } from "../services/Constants";

const storage = new StorageService


const Sidebar = () => {
  const { state, dispatch } = useContext(AppContext) as UserContext;
  const navigate = useNavigate();


  const handleLogoutClick = async () => {
    await storage.removeItem(Constants.LOGIN_USER_KEY)
    dispatch({ type: 'LOGOUT', payload: null });
    navigate('/');
  }

  return (
    <div className="sidebar-component">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Watchlist</h2>
        </div>
        <div className="sidebar-nav">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/watchlist">Watchlist</Link>
          </li>
        </div>

        {state.user?.email && (
          <div className="user-info">
            <div className="d-flex align-items-center">
              <img src={defaultUserImage} alt="User" className="user-image" />
              <p className="user-name">{state.user.name}</p>
            </div>
            <LogoutIcon onClick={handleLogoutClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
