// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Stores user data (e.g., name, email, token)
  isAuthenticated: false, // Tracks if the user is logged in
  Token:null,
  loading: false, // Tracks if an async operation is in progress
  error: null, // Stores error messages
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Actions for login
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.Token=action.payload.accessToken
      state.loading = false;

    },
    loginFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    // Actions for registration
    registerStart(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.Token=action.payload.accessToken
      state.loading = false;
    },
    registerFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    // Action for logout
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.Token=null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;