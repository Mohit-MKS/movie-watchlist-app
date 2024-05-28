import { FormEvent, useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../models/app-context.model';
import { StorageService } from '../services/storageService';
import { Constants } from '../services/Constants';
import { Toaster } from '../services/ToasterService';

const storage = new StorageService
const toaster = new Toaster

const Login = () => {
  const [email, setEmail] = useState('');
  const { dispatch } = useContext(AppContext) as UserContext;
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const users = await storage.getItem(Constants.USERS_KEY)
    if (users && users[email]) {
      dispatch({ type: 'LOGIN', payload: users[email] });
      navigate('/');
    }
    else {
      toaster.error('User not found')
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
