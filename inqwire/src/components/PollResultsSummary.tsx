import * as React from 'react';

const pollResultsSample = require('../assets/poll-results.png');

const pollResultsStyles = {
  width: '100%',
  height: '100%',
  // padding: '2%',
  boxSizing: 'border-box',
  border: 'solid 1px black',
  justifyContent: 'space-between' as 'space-between'
};

class PollResultsSummary extends React.Component<{}, {}> {
  render() {
    return (
    <div style={pollResultsStyles}>
      <img src={pollResultsSample} style={{height: '100%', width: '100%'}} />
    </div>
    );
  }
}

export default PollResultsSummary;
