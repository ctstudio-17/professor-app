import * as React from 'react';

import './styles/CreatePoll.css';

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
      <div>

      </div>
    );
  }
}

export default CreatePoll;
