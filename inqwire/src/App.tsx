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

interface State {
  currPage: 'dashboard' | 'summary';
}

class App extends React.Component<{}, State> {
  componentWillMount() {
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
        <Header />
        <div style={{padding: "1.5%", boxSizing: "border-box"}}>
          {this.state.currPage === 'dashboard' ? <Dashboard endLecture={this.endLecture.bind(this)} /> : <Summary />}
        </div>
      </div>
    );
  }
}

export default App;
