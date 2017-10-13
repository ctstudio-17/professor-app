import * as React from 'react';

import './styles/CreatePoll.css';

class CreatePollModal extends React.Component<{}, {}> {
  componentWillMount() {
    console.log('show modal');
  }

  componentWillUnmount() {
    console.log('hide modal');
  }

  render() {
    // const pollOptions = ['Q:', 'a)', 'b)', 'c)', 'd)'].map((s: string) => <div className='create-poll-option'>{s}</div>);

    return (
      <div className='create-poll-container'>
        {/* <div className='create-poll-header'>Create Poll</div>
        { pollOptions } */}
      </div>
    );
  }
}

export default CreatePollModal;
