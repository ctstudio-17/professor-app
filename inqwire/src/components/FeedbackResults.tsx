import * as React from 'react';

const feedbackResultsSample = require('../assets/feedback-results.png');

const feedbackResultsStyles = {
  width: '100%',
  height: '100%',
  // padding: '2%',
  boxSizing: 'border-box',
  border: 'solid 1px black',
  justifyContent: 'space-between' as 'space-between'
};

class FeedbackResults extends React.Component<{}, {}> {
  componentWillMount() {
    this.setState({
    });
  }

  render() {
    return (
    <div style = {feedbackResultsStyles}>
      <img src={feedbackResultsSample} style={{height: '100%', width: '100%'}} />
    </div>
    );
  }
}

export default FeedbackResults;
