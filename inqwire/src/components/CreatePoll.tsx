import * as React from 'react';

const pollContainerStyles = {
  width: '35.2%',
  height: '100%',
  border: 'solid 1px black'
};

interface State {
  pollTime: number;
  questionText: string;
  answers: string[];
  pollRunning: boolean;
}

class CreatePoll extends React.Component<{}, State> {
  componentWillMount() {
    this.setState({
      pollTime: 1,
      questionText: '',
      answers: ['', ''],
      pollRunning: false
    });
  }

  render() {
    return (
      <div style={pollContainerStyles}>

      </div>
    );
  }
}

export default CreatePoll;
