import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Container, Box, Typography } from '@mui/material';
import Url from '../../utils/Url';
import LockerOcupationList from './LockerOcupationList';
import LockerStatistics from './LockerStatistics';

const LockerUsage = ({ token, ...props }) => {
  const [ocupations, setOcupations] = useState([]);

  const updateOcupations = async () => {
    try {
      const res = await fetch(Url.getOcupationsUrl(), {
        headers: { Authorization: token },
      });
      const json = await res.json();
      if (!json.data) return setOcupations([]);

      let equal = ocupations.length === json.data.length;
      json.data.forEach(({ id }) => {
        equal = equal && ocupations.find((lock) => id === lock.id);
      });
      if (!equal) return setOcupations(json.data);
      else setOcupations([]);
    } catch (error) {
      console.error(error);
      setOcupations([]);
    }
  };

  useEffect(() => {
    updateOcupations();
    return () => {
      setOcupations([]);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <Container {...props}>
      <LockerStatistics token={token} />
      <Box
        padding={1}
        borderRadius={1}
        boxShadow={2}
        mt={1}
        backgroundColor={'lightgrey'}
      >
        <Typography variant="h6">HISTORIAL DE USO</Typography>
      </Box>
      <LockerOcupationList lock_used={ocupations} />
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => ({
  token: state.auth.token,
  ...ownProps,
});
export default connect(mapStateToProps, {})(LockerUsage);
