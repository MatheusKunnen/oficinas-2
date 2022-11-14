import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Url from '../../utils/Url';

const initialDataState = {
  last_month_usage: 'N/A',
  mean_usage_time: 0,
};
const LockerStatistics = ({ token, ...props }) => {
  const [data, setData] = useState(initialDataState);
  const info = [
    {
      label: 'Usos (30 dias)',
      value: data.last_month_usage,
    },
    {
      label: 'Tempo médio',
      value: `${Math.round(data.mean_usage_time)}min`,
    },
  ];

  const getData = async () => {
    try {
      const res = await fetch(Url.getOcupationsStatisticsUrl(), {
        headers: {
          Authorization: token,
        },
      });
      const json = await res.json();
      if (json.data) return json.data;
    } catch (error) {
      console.error(error);
    }
    return initialDataState;
  };

  useEffect(() => {
    let ok = true;
    const run = async () => {
      const tmp = await getData();
      if (!ok) return;
      if (tmp) setData(tmp);
      else setData(initialDataState);
    };
    run();
    return () => {
      ok = false;
    };
    //eslint-disable-next-line
  }, []);

  return (
    <Box
      display={'flex'}
      justifyContent="space-around"
      alignItems={'bottom'}
      borderRadius={1}
      py={4}
      boxShadow={2}
      {...props}
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
