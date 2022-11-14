import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, useTheme } from '@mui/material';
import getErrorIndicatorStyle from '../../styles/getErrorInidicatorStyle';

const ErrorIndicator = ({ error, ...props }) => {
  const theme = useTheme();
  const style = getErrorIndicatorStyle(theme);
  if (typeof error !== 'string') return <Fragment />;
  return (
    <Box
      backgroundcolor="red"
      className={style.errorIndicatorContainer}
      {...props}
    >
      <Typography className={style.errorIndicatorText}>{error}</Typography>
    </Box>
  );
};

ErrorIndicator.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
};

ErrorIndicator.defaultProps = {
  error: null,
};

export default ErrorIndicator;
