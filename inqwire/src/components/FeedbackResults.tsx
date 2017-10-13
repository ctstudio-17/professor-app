import * as React from "react";

const FeedbackResultsStyles = {
  width: '100%',
  height: '100%',
  padding: '2%',
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
    <div style = {FeedbackResultsStyles}>
        <p> Feedback Results </p>        
    </div>
      
    );
  }
}

export default FeedbackResults;