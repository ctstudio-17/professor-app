import * as React from 'react';

import CreatePoll from './components/CreatePoll';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <CreatePoll sampleProp='Create a poll' />
      </div>
    );
  }
}

export default App;
