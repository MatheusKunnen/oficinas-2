import React from 'react';
import { Box, Typography } from '@mui/material';

const LockerStatus = ({ lock_count, lock_used, ...props }) => {
  const info = [
    {
      label: 'Gavetas disponíveis',
      value: lock_count,
    },
    {
      label: 'Gavetas ocupadas',
      value: lock_used,
    },
    {
      label: 'Ocupação',
      value: `${Math.round((lock_used * 100) / lock_count)}%`,
    },
  ];

  return (
    <Box
      display={'flex'}
      justifyContent="space-around"
      alignItems={'bottom'}
      borderRadius={1}
      py={4}
      boxShadow={2}
    >
      {info.map(({ label, value }, i) => (
        <Box
          key={label + i}
          display={'flex'}
          flexDirection="column"
          alignContent={'center'}
        >
          <Typography variant="normal" width="100%">
            <strong>{label}</strong>
          </Typography>
          <Typography variant="h3" width="100%">
            {value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default LockerStatus;
