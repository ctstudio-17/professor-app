import * as React from 'react';

import CreatePoll from './CreatePoll';
import PlaceholderSlide from './PlaceholderSlide';
import ConfusedStudents from './ConfusedStudents';
import EndLecture from './EndLecture';

const dashboardStyles = {
  padding: '1.5%',
  height: '91.8%',
  display: 'flex',
  flexDirection: 'column' as 'column'
};
const rowStyles = {
  display: 'flex',
  justifyContent: 'space-between' as 'space-between'
};
const firstRowStyles = {
  // height: '67.5%'
  height: '89.7%'
};
const colStyles = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between' as 'space-between',
  width: '62.4%'
};

interface State {
  slideImageSrc: any;
}

class Dashboard extends React.Component<{}, State> {
  componentWillMount() {
    this.setState({
      slideImageSrc: require('../assets/sample-slide.png')
    });
  }

  render() {
    return (
      <div style={dashboardStyles}>
        <div style={{...rowStyles, ...firstRowStyles}}>
          <CreatePoll />
          <div style={colStyles}>
            <div style={{height: '61.7%'}}>
              <PlaceholderSlide slideImageSrc={this.state.slideImageSrc} />
            </div>
            <div style={{height: '18.5%'}}>
              <ConfusedStudents />
            </div>
            <div style={{height: '12.0%'}}>
              <EndLecture />
            </div>
          </div>
        </div>
        <div style={rowStyles}>
        </div>
      </div>
    );
  }
}

export default Dashboard;
