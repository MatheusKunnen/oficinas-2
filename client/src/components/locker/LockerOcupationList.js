import React from 'react';
import { Box } from '@mui/material';
import LockerOcupationListItem from './LockerOcupationListItem';
const LockerOcupationList = ({ lock_used, ...props }) => {
  return (
    <Box display="flex" flexDirection="column" {...props}>
      {lock_used.map((lock) => (
        <LockerOcupationListItem key={lock.id} {...lock} />
      ))}
    </Box>
  );
};

export default LockerOcupationList;
