import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setUser, clearUser } from '../redux/slices/userSlice';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleLogin = () => {
    dispatch(setUser({ name: 'John Doe', email: '0VtZP@example.com' }));
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <header>
      <h1>EcoVoz</h1>
      {user.name ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </header>
  );
};

export default Header;
