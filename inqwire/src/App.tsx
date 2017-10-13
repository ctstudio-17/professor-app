import * as React from 'react';

import Header from './components/Header';
import Dashboard from './components/Dashboard';

import './App.css';

const appStyles = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as 'column'
};

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div style={appStyles}>
        <Header />
        <Dashboard />
      </div>
    );
  }
}

export default App;
