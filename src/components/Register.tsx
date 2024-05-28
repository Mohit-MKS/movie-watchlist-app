import React, { useState } from 'react';
import { IUser } from '../models/user.model';
import { StorageService } from '../services/storageService';
import { Constants } from '../services/Constants';
import { Toaster } from '../services/ToasterService';

const storage = new StorageService;
const toaster = new Toaster


interface RegisterProps {
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const Register: React.FC<RegisterProps> = () => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async () => {
    const users: { [key: string]: IUser } | null = await storage.getItem(Constants.USERS_KEY);
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
    console.log(users);

    // Here you should handle registration (e.g., call an API).
    // For simplicity, we'll just set a dummy user.
    // setUser({ name, email });
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
