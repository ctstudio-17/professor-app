import * as React from 'react';

interface Props {
  slideSrc: string;
  height: string;
}

class SlidePreview extends React.Component<Props, {}> {
  render() {
    return <img src={this.props.slideSrc} style={{width: '100%', height: this.props.height}} />;
  }
}

export default SlidePreview;
