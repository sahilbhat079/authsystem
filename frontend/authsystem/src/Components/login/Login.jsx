import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import styles from '../login/login.module.css';
import { useSelector } from 'react-redux';

const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { loading, error } = useSelector((state) => state.auth);

  // Basic synchronous validation function
  const validate = () => {
    const validationErrors = {};
    if (!credentials.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      validationErrors.email = 'Please enter a valid email address';
    }
    if (!credentials.password) {
      validationErrors.password = 'Password is required';
    } else if (credentials.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      await login(credentials);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>

      {/* Display a global error message if present */}
      {error && <div className={styles.globalError}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            className={`${styles.input} ${errors.email ? styles.errorInput : ''}`}
            autoComplete="username"
            required
          />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email}</p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className={`${styles.input} ${errors.password ? styles.errorInput : ''}`}
            autoComplete="current-password"
            required
          />
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password}</p>
          )}
        </div>
        <button 
          type="submit" 
          className={styles.button} 
          disabled={loading}
        >
          {loading ? <div className={styles.buttonSpinner}></div> : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
