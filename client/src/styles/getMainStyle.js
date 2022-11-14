import { makeStyles } from '@mui/styles';

const getMainStyle = (theme) =>
  makeStyles({
    pageContainer: {
      fontFamily: 'roboto',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      background: 'orange',
    },
    loginContainer: {
      width: '30rem',
      margin: 'auto auto',
      background: '#FFF',
    },
    loginItem: {
      marginTop: '0.25rem',
    },
  });

export default getMainStyle;
