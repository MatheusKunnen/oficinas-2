import React, { useEffect, useState } from 'react';
import LockerStatus from './LockerStatus';
import { Container, Box, Typography } from '@mui/material';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import Url from '../../utils/Url';
import LockerOcupationList from './LockerOcupationList';

const LockerMonitor = ({ token, logout, ...props }) => {
  const [lock_count, setLockCount] = useState(-1);
  const [lock_used, setLockUsed] = useState([]);

  const updateLockCount = async () => {
    try {
      const res = await fetch(Url.getParametersUrl(), {
        headers: { Authorization: token },
      });
      const json = await res.json();
      if (!json.data) return;
      let tmp = -1;
      json.data.forEach(({ key, value }) => {
        if (key === 'lock_count' && !isNaN(Number(value))) tmp = Number(value);
      });
      return tmp;
    } catch (error) {
      console.error(error);
    }
    return -1;
  };
  const updateLockUsed = async () => {
    try {
      const res = await fetch(Url.getOcupationsInUseUrl(), {
        headers: { Authorization: token },
      });
      const json = await res.json();
      if (!json.data) return [];

      let equal = lock_used.length === json.data.length;
      json.data.forEach(({ id }) => {
        equal = equal && lock_used.find((lock) => id === lock.id);
      });
      if (!equal) return json.data;
      else return [];
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  useEffect(() => {
    if (token == null) return;
    let ok = true;
    const run = async (alsoCount) => {
      let tmp_count = alsoCount ? await updateLockCount() : -1;
      let tmp_used = await updateLockUsed();
      if (!ok) return;
      if (tmp_count > 0) setLockCount(tmp_count);
      if (tmp_used) setLockUsed(tmp_used);
    };
    run(true);
    const interval = setInterval(() => run(false), 1000);
    return () => {
      ok = false;
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <LockerStatus lock_count={lock_count} lock_used={lock_used.length} />
      <Box
        padding={1}
        borderRadius={1}
        boxShadow={2}
        mt={1}
        backgroundColor={'lightgrey'}
      >
        <Typography variant="h6">GAVETAS EM USO</Typography>
      </Box>
      <LockerOcupationList lock_used={lock_used} />
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => ({
  token: state.auth.token,
  ...ownProps,
});

export default connect(mapStateToProps, { logout })(LockerMonitor);
