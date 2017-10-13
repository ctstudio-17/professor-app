import * as React from 'react';

// import CreatePoll from './CreatePoll';
import PlaceholderSlide from './PlaceholderSlide';

const dashboardStyles = {
  padding: '1.5%',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column' as 'column'
};
const rowStyles = {
  display: 'flex',
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
        <div style={rowStyles}>
          <PlaceholderSlide slideImageSrc={this.state.slideImageSrc} />
        </div>
        <div style={rowStyles}>
        </div>
      </div>
    );
  }
}

export default Dashboard;
