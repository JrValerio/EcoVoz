import { useDispatch, useSelector } from 'react-redux';

import { setUser, clearUser } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';

const useAuth = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const isAuthenticated = Boolean(user.name && user.email);

  const login = (userData: { name: string; email: string }) => {
    if (!userData.name || !userData.email) {
      throw new Error('Name and email are required for login.');
    }
    dispatch(setUser(userData));
  };
  

  const logout = () => {
    dispatch(clearUser());
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
};

export default useAuth;
