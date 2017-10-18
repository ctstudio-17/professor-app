import * as React from 'react';

const presentationIcon = require('../assets/presentation-icon.svg');

const containerStyles = {
  backgroundColor: 'var(--white)',
  border: `solid 7px var(--lavender-blue)`,
  position: 'relative' as 'relative',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box'
};
const slideStyles = {
  width: '100%',
  height: '100%'
};
const detailsBarStyles = {
  opacity: 0.75,
  backgroundColor: 'var(--lavender-blue)',
  position: 'absolute' as 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '10.7%',

  display: 'flex',
  alignItems: 'center' as 'center',
  justifyContent: 'space-between' as 'space-between'
};
const slidesModeStyles = {
  marginLeft: '3.8%',
  fontSize: '16px'
};
const imgStyles = {
  width: '8.9%',
  marginRight: '1.3%'
};
const slideCounterStyles = {
  marginRight: '46.1%',
  fontWeight: 'bold' as 'bold',
  fontSize: '16px',
  letterSpacing: '1px'
};

interface Props {
  slideImageSrc: string;
}
interface State {
  currentMode: string;
  currentSlide: number;
  totalSlides: number;
}

class PresentationViewer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currentMode: 'Presentation',
      currentSlide: 30,
      totalSlides: 257
    };
  }

  render() {
    return (
      <div style={containerStyles}>
        <img src={this.props.slideImageSrc} style={slideStyles} />
        <div style={detailsBarStyles}>
          <div style={slidesModeStyles}>
            <img src={presentationIcon} style={imgStyles} />
            <span>{this.state.currentMode} Mode</span>
          </div>
          <div style={slideCounterStyles}>
            {this.state.currentSlide} of {this.state.totalSlides}
          </div>
        </div>
      </div>
    );
  }
}

export default PresentationViewer;
