import * as React from 'react';

const confusionResultsSample = require('../../assets/confusion-results.png');

const confusionResultsStyles = {
  width: '100%',
  height: '100%',
  // padding: '2%',
  boxSizing: 'border-box',
  border: 'solid 1px black',
  justifyContent: 'space-between' as 'space-between'
};

class ConfusionResults extends React.Component<{}, {}> {
  render() {
    return (
    <div style={confusionResultsStyles}>
      <img src={confusionResultsSample} style={{height: '100%', width: '100%'}} />
    </div>
    );
  }
}

export default ConfusionResults;
