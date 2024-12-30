import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const API_URL = process.env.REACT_APP_API_URL + '/api/users';


const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignup ? '/signup' : '/login';
      const response = await axios.post(`${API_URL}${endpoint}`, { username, password });

      if (response.data.token) {
        login({ username: response.data.username, token: response.data.token });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isSignup ? 'Signup' : 'Login'}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            {isSignup ? 'Signup' : 'Login'}
          </button>
        </form>
        <p
          className="text-center mt-4 text-blue-500 cursor-pointer"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;