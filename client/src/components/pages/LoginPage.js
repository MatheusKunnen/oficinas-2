import React from 'react';
import { useTheme } from '@mui/material';
import Url from '../../utils/Url';
import Login from '../login/Login';
import getLoginStyle from '../../styles/getLoginStyle';
import { useHistory } from 'react-router-dom';

const LoginPage = ({ staticContext, ...props }) => {
  const theme = useTheme();
  const style = getLoginStyle(theme);
  const history = useHistory();
  const onSuccessLogin = () => {
    history.replace(Url.getHomePageUrl());
  };
  return (
    <main className={style.loginPage} {...props}>
      <Login onSuccessLogin={onSuccessLogin} />
    </main>
  );
};

export default LoginPage;
