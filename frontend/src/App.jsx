import React from 'react';
import LoginSignup from './components/LoginSignup';
import Dashboard from './components/Dashboard';
import UserProvider, { UserContext } from './context/UserContext';
import { useContext } from 'react';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <UserProvider>
      <div>
        {user ? <Dashboard /> : <LoginSignup />}
      </div>
    </UserProvider>
  );
};

export default App;
