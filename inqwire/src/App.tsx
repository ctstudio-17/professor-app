import * as React from 'react';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Summary from './components/Summary';

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

  startLecture() {
    this.setState({currPage: 'dashboard'});
  }

  endLecture() {
    this.setState({currPage: 'summary'});
  }

  render() {
    return (
      <div style={appStyles}>
        <Header />
        {this.state.currPage === 'dashboard' ? <Dashboard endLecture={this.endLecture.bind(this)} /> : <Summary />}
      </div>
    );
  }
}

export default App;
