import * as React from 'react';

import SlidePreview from './SlidePreview';

const containerStyles = {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between' as 'space-between'
};
const labelStyles = {
  height: '6.1%',
  fontSize: '14px',
  letterSpacing: '0.9px',
  color: 'white'
};

interface Props {
  slideSrc: string;
}

class NextSlide extends React.Component<Props, {}> {
  render() {
    return (
      <div style={containerStyles}>
        <div style={labelStyles}>Next Slide</div>

        <SlidePreview slideSrc={this.props.slideSrc} height='90.3%' />
      </div>
    );
  }
}

export default NextSlide;
