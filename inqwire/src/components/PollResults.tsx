import * as React from 'react';

const PollResultsStyles = {
  width: '100%',
  height: '100%',
  justifyContent: 'space-between' as 'space-between'
};

class PollResults extends React.Component<{}, {}> {
  componentWillMount() {
    this.setState({
    });
  }

  render() {
    return (
    <div style = {PollResultsStyles}>
        <span>Poll Results</span>
    </div>
    );
  }
}

export default PollResults;
