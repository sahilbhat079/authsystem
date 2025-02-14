import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './Profile.module.css';

const Profile = () => {
  // Retrieve the token from the Redux auth slice (adjust the property name if needed)
  const token = useSelector((state) => state.auth.Token);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // If token is not available, clear the profile and show a message
    if (!token) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // ensure cookies are sent if needed
        });
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]); // re-run when the token changes

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!token) {
    return <div className={styles.error}>Please log in to view your profile.</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Profile</h2>
      <div className={styles.profileDetails}>
        <p><strong>Name:</strong> {profile?.name}</p>
        <p><strong>Email:</strong> {profile?.email}</p>
      </div>
    </div>
  );
};

export default Profile;
