import React from 'react';
import { Box } from '@mui/material';
import ParameterListItem from './ParameterListItem';

const ParameterList = ({ parameters, token, onUpdate, ...props }) => {
  return (
    <Box display="flex" flexDirection="column" {...props}>
      {parameters.map((param) => (
        <ParameterListItem
          key={`param-${param.id}`}
          vkey={param.key}
          onUpdate={onUpdate}
          {...param}
        />
      ))}
    </Box>
  );
};

export default ParameterList;
