import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storageService';
import { Constants } from '../services/Constants';
import { Toaster } from '../services/ToasterService';
import { IUser } from '../models/user.model';

import './Login.scss'
import { useAppContext } from '../contexts/Contexts';

const storage = new StorageService
const toaster = new Toaster

const Login = () => {
  const [email, setEmail] = useState('');
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const users = await storage.getItem(Constants.USERS_KEY)
    if (users && users[email]) {
      await storage.setItem(Constants.LOGIN_USER_KEY, users[email])
      dispatch({ type: 'LOGIN', payload: users[email] as IUser });
      navigate('/');
    }
    else {
      toaster.error('User not found')
    }
  };

  return (
    <div className='login-component'>
      <div className="login-form">
        <h2>Login</h2>
        <form className='d-flex gap-3' onSubmit={handleSubmit}>
          <input
            id='user-email'
            className='form-control'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

      <div className="register-link">
        <span>Don't have an account!</span>
        <Link to="/register">Register</Link>
      </div>

    </div>
  );
};

export default Login;
