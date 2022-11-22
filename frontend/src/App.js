import React from 'react';
import { current_user, isLogin } from './api/Auth';
import './App.css';
import RoutesHandler from './routes';

export default function App() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    if (isLogin() && !user) {
      current_user(setUser);
    }
  }, [user]);

  return (
    <React.Fragment>
      <RoutesHandler user={user}/>
    </React.Fragment>
  );
}
