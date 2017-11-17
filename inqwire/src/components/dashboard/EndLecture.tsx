import * as React from 'react';
import '../../styles/animations.css';

const containerStyles = {
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: '#e7e7e7',
  textAlign: 'center',
  padding: '2.3% 0',
  color: '#5f5f5f',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between' as 'space-between',
  position: 'relative' as 'relative'
};
const headerStyles = {
  fontSize: '26px',
  fontWeight: 'bold' as 'bold',
  letterSpacing: '2px',
  display: 'flex',
  justifyContent: 'center' as 'center',
  alignItems: 'center' as 'center'
};
const recordingContainerStyles = {
  width: '17px',
  height: '17px',
  border: 'solid 1px red',
  borderRadius: '50%',
  marginRight: '1.1%',
  position: 'relative' as 'relative'
};
const recordingBoxStyles = {
  width: '50%',
  height: '50%',
  backgroundColor: 'red',
  position: 'absolute' as 'absolute',
  top: '25%',
  left: '25%'
};
const subHeaderStyles = {
  fontSize: '14px',
  letterSpacing: '1.8px'
};

interface Props {
  endLecture: any;
}

class EndLecture extends React.Component<Props, {}> {
  render() {
    return (
      <div style={containerStyles} onClick={this.props.endLecture}>
        <div style={headerStyles}>
          <div style={recordingContainerStyles}>
            <div className='flash-animation' style={recordingBoxStyles} />
          </div>
          <div>Lecture In Progress</div>
        </div>
        <div style={subHeaderStyles}>CLICK TO END LECTURE</div>
      </div>
    );
  }
}

export default EndLecture;
