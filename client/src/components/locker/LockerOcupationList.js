import React from 'react';
import { Box, Typography } from '@mui/material';
import LockerOcupationListItem from './LockerOcupationListItem';
const LockerOcupationList = ({ lock_used, ...props }) => {
  return (
    <Box display="flex" flexDirection="column" {...props}>
      <Box
        padding={1}
        borderRadius={1}
        boxShadow={2}
        mt={1}
        backgroundColor={'lightgrey'}
      >
        <Typography variant="h6">GAVETAS EM USO</Typography>
      </Box>
      {lock_used.map((lock) => (
        <LockerOcupationListItem key={lock.id} {...lock} />
      ))}
    </Box>
  );
};

export default LockerOcupationList;
