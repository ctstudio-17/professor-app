import * as React from 'react';

const icon = require('../../assets/stop-icon.png');
const containerStyles = {
  width: '100%',
  height: '100%',
  border: 'solid 1px #585858',
  borderRadius: '3px',
  backgroundColor: '#2c2c2c',
  color: 'white',
  letterSpacing: '1.1px',
  display: 'flex',
  alignItems: 'center' as 'center',
  cursor: 'pointer'
};

const textStyles = {
  marginLeft: '8.3%',
  fontSize: '30px',
  fontWeight: 'bold' as 'bold',
  letterSpacing: '1.1px',
  height: '37.5%'
};

interface Props {
  endLecture: any;
}

class EndLecture extends React.Component<Props, {}> {
  render() {
    return (
      <div style={containerStyles} onClick={this.props.endLecture}>
        <div style={textStyles}>END LECTURE <img src={icon} style={{height: '100%', verticalAlign: 'text-top'}} /></div>
      </div>
    );
  }
}

export default EndLecture;
