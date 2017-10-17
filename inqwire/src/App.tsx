import * as React from 'react';
import fire from './firebase';

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
  constructor(props: {}) {
    super(props);

    this.endLecture = this.endLecture.bind(this);
    this.state = {
      currPage: 'dashboard'
    };
  }

  componentDidMount() {
    this.startLecture();
  }

  startLecture() {
    this.setState({currPage: 'dashboard'});
    fire.database().ref('lectures/1').update({'in_progress': true});
  }

  endLecture() {
    this.setState({currPage: 'summary'});
    fire.database().ref('lectures/1').update({'in_progress': false});
  }

  render() {
    return (
      <div style={appStyles}>
        <div style={headerStyles}>
          <Header />
        </div>
        <div style={containerStyles}>
          {this.state.currPage === 'dashboard' ? <Dashboard endLecture={this.endLecture} /> : <Summary />}
        </div>
      </div>
    );
  }
}

export default App;
