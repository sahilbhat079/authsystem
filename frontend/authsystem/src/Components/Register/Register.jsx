import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import styles from '../Register/Register.module.css'; 
import { useSelector } from 'react-redux';

const Register = () => {
  const { register } = useAuth();
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { loading, error } = useSelector((state) => state.auth);

  // Synchronous validation function for registration form
  const validate = () => {
    const validationErrors = {};
    if (!userData.name) {
      validationErrors.name = 'Name is required';
    }
    if (!userData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      validationErrors.email = 'Please enter a valid email address';
    }
    if (!userData.password) {
      validationErrors.password = 'Password is required';
    } else if (userData.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      await register(userData);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      
      {/* Display global error if exists */}
      {error && <div className={styles.globalError}>{error}</div>}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Name"
            value={userData.name}
            onChange={(e) =>
              setUserData({ ...userData, name: e.target.value })
            }
            className={`${styles.input} ${errors.name ? styles.errorInput : ''}`}
            autoComplete="name"
            required
          />
          {errors.name && (
            <p className={styles.errorMessage}>{errors.name}</p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
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
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className={`${styles.input} ${errors.password ? styles.errorInput : ''}`}
            autoComplete="new-password"
            required
          />
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password}</p>
          )}
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? <div className={styles.buttonSpinner}></div> : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
