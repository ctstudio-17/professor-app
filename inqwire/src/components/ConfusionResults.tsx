import * as React from "react";

const ConfusionResultsStyles = {
  width: '100%',
  height: '100%',
  padding: '2%',
  boxSizing: 'border-box',
  border: 'solid 1px black',
  justifyContent: 'space-between' as 'space-between'
};

class ConfusionResults extends React.Component<{}, {}> {
  componentWillMount() {
    this.setState({
    });
  }

  render() {
    return (
    <div style = {ConfusionResultsStyles}>
        <p> Confusion Results </p>        
    </div>
      
    );
  }
}

export default ConfusionResults;