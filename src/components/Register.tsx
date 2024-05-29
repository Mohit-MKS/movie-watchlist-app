import { useState } from 'react';
import { IUsersObj } from '../models/user.model';
import { StorageService } from '../services/storageService';
import { Constants } from '../services/Constants';
import { Toaster } from '../services/ToasterService';
import './Register.scss'

const storage = new StorageService;
const toaster = new Toaster


const Register = () => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async () => {
    const users: IUsersObj | null = await storage.getItem(Constants.USERS_KEY) as IUsersObj;
    if (users) {
      if (!users[email])
        await storage.setItem(Constants.USERS_KEY, { ...users, [email]: { name: name, email: email } })
      else {
        toaster.error('User already registered')
      }
    }
    else {
      await storage.setItem(Constants.USERS_KEY, { [email]: { name: name, email: email } })

    }
    console.log(users)
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
    </div>
  );
};

export default Register;
