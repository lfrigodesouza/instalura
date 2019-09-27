import React from 'react';
import { browserHistory } from 'react-router';

const Logout = () => {
  localStorage.removeItem('auth-token');
  browserHistory.push('/');
  return null;
};

export default Logout;
