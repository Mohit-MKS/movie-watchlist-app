import { FormEvent, useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../models/app-context.model';

const Login = () => {
  const [email, setEmail] = useState('');
  const { dispatch } = useContext(AppContext) as UserContext;
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN', payload: email });
    navigate('/');
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
