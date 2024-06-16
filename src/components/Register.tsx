import { useState } from 'react';
import { IUsersObj } from '../models/user.model';
import { StorageService } from '../services/StorageService';
import { Constants } from '../services/Constants';
import { Toaster } from '../services/ToasterService';
import './Register.scss'
import { Link, useNavigate } from 'react-router-dom';

const toaster = new Toaster


const Register = () => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const users: IUsersObj | null = await StorageService.getItem(Constants.USERS_KEY) as IUsersObj;
    if (users) {
      if (!users[email]) {
        StorageService.setItem(Constants.USERS_KEY, { ...users, [email]: { name: name, email: email } }).then((val) => {
          if (val) {
            toaster.success('User registered successfully')
            navigate('/login');
          }
        }, () => {
          toaster.error('Something went wrong, Please try again')
        });
      }
      else {
        toaster.error('User already registered')
      }
    }
    else {
      StorageService.setItem(Constants.USERS_KEY, { [email]: { name: name, email: email } }).then((val) => {
        if (val) {
          toaster.success('User registered successfully')
          navigate('/login');
        }
      }, () => {
        toaster.error('Something went wrong, Please try again')
      });
    }
  };

  return (
    <div className="register-component">
      <div className="register-form">
        <h2>Register</h2>
        <input
          className='form-control'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          className='form-control'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button className='btn btn-primary' onClick={handleRegister}>Register</button>
      </div>

      <div className="login-link">
        <span>Already have an account!</span>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
