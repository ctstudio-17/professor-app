import * as React from 'react';

import CreatePoll from './CreatePoll';
// import PresentationViewer from './PresentationViewer';
import ConfusedStudents from './ConfusedStudents';
import EndLecture from './EndLecture';
import PollResults from './PollResults';

// const slideImageSrc = require('../assets/sample-slide.png');

const dashboardStyles = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as 'column'
};
const rowStyles = {
  display: 'flex',
  justifyContent: 'space-between' as 'space-between'
};
const pollContainerStyles = {
  width: '36.2%',
  padding: '2%',
  boxSizing: 'border-box',
  border: 'solid 1px black',
};
const colStyles = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between' as 'space-between',
  width: '62.4%'
};

interface Props {
  endLecture: Function;
}
interface State {
  pollRunning: boolean;
  slidesSrc: string;
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.startPoll = this.startPoll.bind(this);
    this.state = {
      pollRunning: false,
      slidesSrc: 'https://docs.google.com/presentation/d/e/' +
                  '2PACX-1vQHgagKDozYsFjpI1ubOVX2ZX_lU5IkfryfDcUwrDTMlvuLlmGmRezKfV9Af4_YRqrbQgoMOgEGAPVI/' +
                  'embed?start=false&loop=false&delayms=60000'
    };
  }

  startPoll() {
    this.setState({pollRunning: true});
  }

  render() {
    return (
      <div style={dashboardStyles}>
        <div style={{...rowStyles, height: '89.7%'}}>
          <div style={pollContainerStyles}>
            {this.state.pollRunning ? <PollResults /> : <CreatePoll startPoll={this.startPoll} />}
          </div>
          <div style={colStyles}>
            <div style={{height: '61.7%'}}>
            {React.createElement('iframe', {
              src: this.state.slidesSrc,
              frameBorder: '0',
              width: '100%',
              height: '100%',
              allowFullScreen: 'true',
              mozallowfullscreen: 'true',
              webkitallowfullscreen: 'true'
            })}
            </div>
            <div style={{height: '18.5%'}}>
              <ConfusedStudents />
            </div>
            <div style={{height: '12.0%'}}>
              <EndLecture endLecture={this.props.endLecture} />
            </div>
          </div>
        </div>
        <div style={rowStyles} />
      </div>
    );
  }
}

export default Dashboard;
