import React from 'react';
import Home from '../home/Home';
import LoginWatcher from '../login/LoginWatcher';

const HomePage = () => {
  return (
    <>
      <LoginWatcher />
      <Home />
    </>
  );
};

export default HomePage;
