import * as React from "react";

const PollResultsStyles = {
  width: '100%',
  height: '100%',
  padding: '2%',
  boxSizing: 'border-box',
  border: 'solid 1px black',
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
        <p> Poll Results </p>        
    </div>
      
    );
  }
}

export default PollResults;