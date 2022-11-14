import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import ParameterForm from '../parameter/ParameterForm';

const Configuration = ({ token, logout, ...props }) => {
  return (
    <Container {...props}>
      <Button variant="contained" color="error" onClick={logout} fullWidth>
        LOGOUT
      </Button>
      <Box
        padding={1}
        borderRadius={1}
        boxShadow={2}
        mt={1}
        backgroundColor={'lightgrey'}
      >
        <Typography variant="h6">Parâmetros</Typography>
      </Box>
      <ParameterForm />
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => ({
  token: state.auth.token,
  ...ownProps,
});
export default connect(mapStateToProps, { logout })(Configuration);
