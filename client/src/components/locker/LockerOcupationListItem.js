import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import Url from '../../utils/Url';

const LockerOcupationListItem = ({
  id,
  id_locker,
  entrance_time,
  leave_time,
  main_descriptor,
  ...props
}) => {
  let info = [
    // {
    //   label: 'ID',
    //   value: id,
    // },

    {
      label: 'Entrada',
      value:
        new Date(entrance_time).toLocaleDateString() +
        ' ' +
        new Date(entrance_time).toLocaleTimeString(),
    },
    {
      label: 'Gaveta',
      value: id_locker,
    },
  ];

  if (leave_time === null) {
    const date = Math.round(
      Math.abs(Date.now() - new Date(entrance_time)) / (1000 * 60)
    );
    info = [
      ...info,
      {
        label: 'Tempo usado',
        value: `${date}min`,
      },
    ];
  } else {
    const date = Math.round(
      Math.abs(Date.now() - new Date(entrance_time)) / (1000 * 60)
    );
    info = [
      ...info,

      {
        label: 'Tempo usado',
        value: `${date}min`,
      },
      {
        label: 'Saída',
        value:
          new Date(leave_time).toLocaleDateString() +
          ' ' +
          new Date(leave_time).toLocaleTimeString(),
      },
    ];
  }
  return (
    <Box
      padding={2}
      mt={1}
      borderRadius={1}
      boxShadow={2}
      width="100%"
      display={'flex'}
      alignItems={'center'}
      {...props}
    >
      <Avatar
        src={Url.getDescriptorImageUrl(main_descriptor)}
        sx={{ width: '7.5rem', height: '7.5rem' }}
      />
      <Box
        display={'flex'}
        justifyContent="space-between"
        flexWrap={'wrap'}
        alignItems={'bottom'}
        width="100%"
        py={2}
        px={2}
      >
        {info.map(({ label, value }, i) => (
          <Box
            key={label + i}
            display={'flex'}
            flexDirection="column"
            alignContent={'center'}
            px={2}
          >
            <Typography variant="normal" width="100%">
              <strong>{label}</strong>
            </Typography>
            <Typography variant="h6" width="100%">
              {value}
            </Typography>
          </Box>
        ))}
      </Box>
      {/* <Box marginLeft={2}>{id}</Box> */}
    </Box>
  );
};

export default LockerOcupationListItem;
