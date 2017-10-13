import * as React from 'react';

import './styles/CreatePoll.css';

interface Props {
  slideImageSrc: string;
}

class PlaceholderSlide extends React.Component<Props, {}> {
  render() {
    return (
      <div id='slide-container'>
        <img src={this.props.slideImageSrc} />
      </div>
    );
  }
}

export default PlaceholderSlide;
