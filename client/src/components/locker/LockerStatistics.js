import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

const LockerStatistics = ({ token, ...props }) => {
  const [data, setData] = useState({
    last_month_usage: 50,
    mean_usage_time: 123,
  });
  const info = [
    {
      label: 'Usos (30 dias)',
      value: data.last_month_usage,
    },
    {
      label: 'Tempo médio',
      value: `${data.mean_usage_time}min`,
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

export default LockerStatistics;
