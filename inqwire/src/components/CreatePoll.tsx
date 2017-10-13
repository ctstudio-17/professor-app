import * as React from 'react';

import './styles/CreatePoll.css';

interface Props {
  sampleProp: string;
}
interface State {
  sampleState: number;
}

class CreatePoll extends React.Component<Props, State> {
  render() {
    return (
      <h1>
        {this.props.sampleProp}
      </h1>
    );
  }
}

export default CreatePoll;
