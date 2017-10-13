import * as React from 'react';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Summary from './components/Summary';

import './App.css';

const appStyles = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as 'column'
};

interface State {
  currPage: 'dashboard' | 'summary';
}

class App extends React.Component<{}, State> {
  componentWillMount() {
    this.setState({
      currPage: 'dashboard'
    });
  }
  render() {
    return (
      <div style={appStyles}>
        <Header />
        {this.state.currPage === 'dashboard' ? <Dashboard /> : <Summary />}
      </div>
    );
  }
}

export default App;
