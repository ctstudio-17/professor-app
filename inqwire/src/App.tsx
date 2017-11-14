import * as React from 'react';
import api from './firebase';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Classes from './components/Classes';
import Lectures from './components/Lectures';
// import Summary from './components/Summary';
import Summary from './components/SummaryNew';

import { Lecture, Presentation } from './models';

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
  currPage: 'login' | 'classes' | 'lectures' | 'dashboard' | 'summary' | 'history';
  lectureStartTime?: Date;
  selectedPresentation: Presentation | undefined;
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.setPage = this.setPage.bind(this);
    this.selectClass = this.selectClass.bind(this);
    this.selectLecture = this.selectLecture.bind(this);
    this.startLecture = this.startLecture.bind(this);
    this.endLecture = this.endLecture.bind(this);
    this.selectPresentation = this.selectPresentation.bind(this);
    this.closePresentation = this.closePresentation.bind(this);

    this.state = {
      currPage: 'classes',
      selectedPresentation: undefined
    };
  }

  componentDidMount() {
    // this.startLecture();
  }

  setPage(page: 'login' | 'classes' | 'lectures' | 'dashboard' | 'summary' | 'history') {
    this.setState({
      currPage: page
    });
  }

  selectClass(id: number) {
    api.setClass(id);
    this.setState({currPage: 'lectures'});
  }

  selectLecture(lecture: Lecture) {
    api.setLecture(lecture.id);
    this.setState({
      currPage: lecture.inProgress ? 'dashboard' : 'summary',
      lectureStartTime: lecture.startTime,
      selectedPresentation: lecture.presentation
    });
  }

  startLecture() {
    api.startLecture();
    this.setState({currPage: 'dashboard'});

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
    this.setState({selectedPresentation: undefined});
    api.closePresentation();
  }

  endLecture() {
    this.setState({currPage: 'summary'});
    api.endLecture();
  }

  render() {
    let page;
    switch (this.state.currPage) {
      case 'dashboard':
        page = <Dashboard endLecture={this.endLecture}
                          selectPresentation={this.selectPresentation}
                          closePresentation={this.closePresentation}
                          selectedPresentation={this.state.selectedPresentation}
                          startTime={this.state.lectureStartTime} />;
        break;
      case 'summary':
        page = <Summary selectedPresentation={this.state.selectedPresentation} />;
        break;
      case 'lectures':
        page = <Lectures selectLecture={this.selectLecture} startLecture={this.startLecture} />;
        break;
      case 'classes':
      default:
        page = <Classes selectClass={this.selectClass} />;
    }

    return (
      <div style={appStyles}>
        <div style={headerStyles}>
          <Header currPage={this.state.currPage} setPage={this.setPage} />
        </div>
        <div style={containerStyles}>
          { page }
        </div>
      </div>
    );
  }
}

export default App;
