import React, { useState } from 'react';
import { Box, Typography, Input, Button } from '@mui/material';
import { connect } from 'react-redux';
import Url from '../../utils/Url';

const ParameterListItem = ({
  label,
  vkey,
  value,
  token,
  onUpdate,
  ...props
}) => {
  if (typeof onUpdate !== 'function') onUpdate = () => {};
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e) => {
    if (token) setLocalValue(e.target.value);
  };

  const onSave = async () => {
    try {
      const res = await fetch(Url.getParameterUpdateUrl(vkey), {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: localValue,
        }),
      });
      if (res.ok) {
        value = localValue;
        onUpdate();
      }
      return res.ok;
    } catch (error) {
      console.error(error);
    }
    return false;
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems={'center'}
      mt={1}
      padding={1}
      borderRadius={2}
      boxShadow={2}
      {...props}
    >
      <Typography flexGrow={1}>{label}</Typography>
      <Input
        value={localValue}
        onChange={handleChange}
        label={label}
        sx={{ marginRight: 1 }}
      ></Input>
      {typeof token === 'string' ? (
        <Button
          onClick={onSave}
          variant="contained"
          color="primary"
          disabled={!token || localValue === value}
        >
          Gravar
        </Button>
      ) : (
        <></>
      )}
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => ({
  token: state.auth.token,
  ...ownProps,
});

export default connect(mapStateToProps, {})(ParameterListItem);
