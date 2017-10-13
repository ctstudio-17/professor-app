import * as React from 'react';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Summary from './components/Summary';

const appStyles = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as 'column'
};
const headerStyles = {
  height: '8.2%'
};
const containerStyles = {
  padding: '1.5%',
  boxSizing: 'border-box',
  height: '89.7%'
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

  startLecture() {
    this.setState({currPage: 'dashboard'});
  }

  endLecture() {
    this.setState({currPage: 'summary'});
  }

  render() {
    return (
      <div style={appStyles}>
        <div style={headerStyles}>
          <Header />
        </div>
        <div style={containerStyles}>
          {this.state.currPage === 'dashboard' ? <Dashboard endLecture={this.endLecture.bind(this)} /> : <Summary />}
        </div>
      </div>
    );
  }
}

export default App;
