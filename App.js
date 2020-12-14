import React from 'react';
import {Provider} from 'react-native-paper';
import {theme} from './src/theme';
import App from './src';

const Main = () => {
  return (
    <Provider theme={theme}>
      <App />
    </Provider>
  );
};

export default Main;
