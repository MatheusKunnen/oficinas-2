import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LockerMonitor from '../locker/LockerMonitor';
import LockerUsage from '../locker/LockerUsage';
import Configutation from '../config/Configuration';

const Home = () => {
  const [tab, setTab] = useState('1');
  const handleChange = (e, newValue) => {
    setTab(newValue);
  };
  return (
    <>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} centered>
            <Tab label="Monitor" value="1" />
            <Tab label="Historial" value="2" />
            <Tab label="Config" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <LockerMonitor />
        </TabPanel>
        <TabPanel value="2">
          <LockerUsage />
        </TabPanel>
        <TabPanel value="3">
          <Configutation />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default Home;
