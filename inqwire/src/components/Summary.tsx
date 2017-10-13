import * as React from 'react';

import RatingResults from './RatingResults';
import FeedbackResults from './FeedbackResults';
import ConfusionResults from './ConfusionResults';
import PollResults from './PollResults';

const rowStyles = {
  display: 'flex',
  justifyContent: 'space-between' as 'space-between'
};

const colStyles = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between' as 'space-between',
  height: '100%'
};

class Summary extends React.Component<{}, {}> {
  render() {
    return (
      <div style={colStyles}>
        <div style={{...rowStyles, height: '52.4%'}}>
          <div style={{width: '30.1%'}}>
            <RatingResults />
          </div>
          <div style={{width: '67.5%'}}>
            <ConfusionResults />
          </div>
        </div>
        <div style={{...rowStyles, height: '44.5%'}}>
          <div style={{width: '36.2%'}}>
            <FeedbackResults />
          </div>
          <div style={{width: '60.9%'}}>
            <PollResults />
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
