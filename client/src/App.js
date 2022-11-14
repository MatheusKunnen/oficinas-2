import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';

import LoginPage from './components/pages/LoginPage';
import Url from './utils/Url';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import '@fontsource/roboto';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import HomePage from './components/pages/HomePage';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Switch>
              <Route exact path={Url.getLoginPageUrl()} component={LoginPage} />
              <Route exact path={Url.getHomePageUrl()} component={HomePage} />
              <Route>
                <Redirect to={Url.getLoginPageUrl()} />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
