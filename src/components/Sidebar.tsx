import { Link, useNavigate } from "react-router-dom";
import defaultUserImage from "../assets/default-user.svg"; // Assuming you have a default user image
import "./Sidebar.scss";

import LogoutIcon from '@mui/icons-material/Logout';
import { Constants } from "../services/Constants";
import { useAppContext } from "../contexts/Contexts";
import { StorageService } from "../services/StorageService";

const storage = new StorageService


const Sidebar = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();


  const handleLogoutClick = async () => {
    const watchLists = await storage.getItem(Constants.WATCHLIST_KEY)
    if (watchLists && watchLists[state.user?.email as string]) {
      watchLists[state.user?.email as string] = state.watchlist
      await storage.setItem(Constants.WATCHLIST_KEY, watchLists)
    } else {
      const watchlists = {
        [state.user?.email as string]: state.watchlist
      }
      await storage.setItem(Constants.WATCHLIST_KEY, watchlists)
    }

    await storage.removeItem(Constants.LOGIN_USER_KEY)
    dispatch({ type: 'LOGOUT', payload: null });
    navigate('/login');
  }

  return (
    <div className="sidebar-component">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Watchlist</h2>
          {state.user?.email && (
            <div className="user-info dropdown">
              <div className="user-dropdown-btn" id="user-option-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={defaultUserImage} alt="User" className="user-image" />
              </div>
              <ul className="dropdown-menu" aria-labelledby="user-option-dropdown">
                <li><span className="dropdown-item"><p className="user-name">{state.user.name}</p></span></li>
                <li><span className="dropdown-item"><LogoutIcon onClick={handleLogoutClick} /></span></li>
              </ul>

              <div className="username-container">
                <p className="user-name">{state.user.name}</p>
                <LogoutIcon onClick={handleLogoutClick} />
              </div>
            </div>
          )}
        </div>
        <div className="sidebar-nav">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/watchlist">Watchlist</Link>
          </li>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
