import * as React from 'react';

const containerStyles = {
  backgroundColor: '#f9f9f9',
  border: 'solid 7px #8e8df3',
  width: '60.6%',
  height: '48.1%'
};
const slideStyles = {
  width: '100%'
};
const detailsBarStyles = {
  opacity: 0.43,
  backgroundColor: '#8e8df3',
  height: '10.7%'
};

interface Props {
  slideImageSrc: string;
}

class PlaceholderSlide extends React.Component<Props, {}> {
  render() {
    return (
      <div style={containerStyles}>
        <img src={this.props.slideImageSrc} style={slideStyles} />
        <div style={detailsBarStyles}>

        </div>
      </div>
    );
  }
}

export default PlaceholderSlide;
