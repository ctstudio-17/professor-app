import * as React from 'react';

import CreatePoll from './CreatePoll';
import PlaceholderSlide from './PlaceholderSlide';

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
  height: '67.5%'
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
          <PlaceholderSlide slideImageSrc={this.state.slideImageSrc} />
        </div>
        <div style={rowStyles}>
        </div>
      </div>
    );
  }
}

export default Dashboard;
