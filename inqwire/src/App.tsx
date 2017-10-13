import * as React from 'react';

import Button from './components/Button';
import CreatePollModal from './components/CreatePollModal';
import PlaceholderSlide from './components/PlaceholderSlide';
import './App.css';

interface State {
  showPollModal: boolean;
  slideImage: any;
}

class App extends React.Component<{}, State> {
  componentWillMount() {
    this.setState({
      showPollModal: false,
      slideImage: require('./assets/sample-slide.png')
    });
  }

  togglePollModal() {
    this.setState({
      showPollModal: !this.state.showPollModal
    });
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div id='poll-sidebar' style={{flexGrow: 1}}>
            <Button buttonText='Create Poll' handleButtonClick={this.togglePollModal.bind(this)} />
            <Button buttonText='Check Understanding' handleButtonClick={this.togglePollModal.bind(this)} />
          </div>
          <div className='item' style={{flexGrow: 4}}><PlaceholderSlide slideImageSrc={this.state.slideImage} /></div>
        </div>

        {this.state.showPollModal ? <CreatePollModal /> : ''}
      </div>
    );
  }
}

export default App;
