import * as React from 'react';
import api from './firebase';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
// import Summary from './components/Summary';
import Summary from './components/SummaryNew';

import { Presentation } from './models';

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
  currPage: 'login' | 'courses' | 'dashboard' | 'summary' | 'history';
  selectedPresentation: Presentation | null;
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.endLecture = this.endLecture.bind(this);
    this.selectPresentation = this.selectPresentation.bind(this);
    this.closePresentation = this.closePresentation.bind(this);

    this.state = {
      currPage: 'dashboard',
      selectedPresentation: null
    };
  }

  componentDidMount() {
    this.startLecture();
  }

  startLecture() {
    this.setState({currPage: 'dashboard'});
    api.startLecture();

    api.getPresentation().then((snapshot: any) => {
      const presentation = snapshot.val();
      this.setState({ selectedPresentation: presentation });
    });
  }

  selectPresentation(presentation: Presentation) {
    this.setState({selectedPresentation: presentation});
    api.setPresentation(presentation);
  }

  closePresentation() {
    this.setState({selectedPresentation: null});
    api.closePresentation();
  }

  endLecture() {
    this.setState({currPage: 'summary'});
    api.endLecture();
  }

  render() {
    return (
      <div style={appStyles}>
        <div style={headerStyles}>
          <Header currPage={this.state.currPage} />
        </div>
        <div style={containerStyles}>
          {
            this.state.currPage === 'dashboard' ?
              <Dashboard endLecture={this.endLecture}
                         selectPresentation={this.selectPresentation}
                         closePresentation={this.closePresentation}
                         selectedPresentation={this.state.selectedPresentation} /> :
              <Summary selectedPresentation={this.state.selectedPresentation} />
          }
        </div>
      </div>
    );
  }
}

export default App;
