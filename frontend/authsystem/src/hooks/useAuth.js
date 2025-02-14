// useAuth.js
import { useDispatch } from 'react-redux';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
} from '../store/slices/Authslice';
import axios from 'axios';

export const useAuth = () => {
  const dispatch = useDispatch();

  // Login function
  const login = async (credentials) => {
    dispatch(loginStart()); // Dispatch login start action
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials,{ withCredentials: true }); 
      dispatch(loginSuccess(response.data)); // Dispatch login success action with user data
    } catch (error) {
      dispatch(loginFailure(error.message)); // Dispatch login failure action with error message
    }
  };

  // Registration function
  const register = async (userData) => {
    dispatch(registerStart()); // Dispatch register start action
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      dispatch(registerSuccess(response.data)); // Dispatch register success action with user data
    } catch (error) {
      dispatch(registerFailure(error.message)); // Dispatch register failure action with error message
    }
  };

  // Logout function: Triggers a POST request to the logout route and dispatches the logout action.
  const logoutUser = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, you can dispatch a logout failure action or notify the user.
    }
  };

  return { login, register, logoutUser };
};
