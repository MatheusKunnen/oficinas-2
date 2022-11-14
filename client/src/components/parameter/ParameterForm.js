import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ParameterList from './ParameterList';
import { connect } from 'react-redux';
import Url from '../../utils/Url';

const PARAMETERS_ENABLED = [
  { key: 'lock_count', label: 'N. gavetas' },
  { key: 'lock_toggle_delay', label: 'Tempo ativação' },
];
const ParameterForm = ({ token, ...props }) => {
  const [parameters, setParameters] = useState([]);

  const getParameters = async () => {
    try {
      const res = await fetch(Url.getParametersUrl(), {
        headers: { Authorization: token },
      });
      const json = await res.json();
      if (!json.data) return [];
      return json.data
        .filter((item) =>
          PARAMETERS_ENABLED.find(({ key }) => key === item.key)
        )
        .map((item) => ({
          ...item,
          label: PARAMETERS_ENABLED.find(({ key }) => key === item.key).label,
        }));
    } catch (error) {
      console.log(error);
    }
    return [];
  };

  const onUpdate = async () => {
    const tmp = await getParameters();
    if (tmp) setParameters(tmp);
    else setParameters([]);
  };

  useEffect(() => {
    let ok = true;
    const run = async () => {
      const tmp = await getParameters();
      if (!ok) return;
      if (tmp) setParameters(tmp);
      else setParameters([]);
    };
    run();
    return () => {
      ok = false;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Box>
      <ParameterList parameters={parameters} onUpdate={onUpdate} />
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => ({
  token: state.auth.token,
  ...ownProps,
});

export default connect(mapStateToProps, {})(ParameterForm);
