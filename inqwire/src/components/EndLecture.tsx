import * as React from 'react';

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
  justifyContent: 'space-between' as 'space-between'
};
const headerStyles = {
  fontSize: '26px',
  fontWeight: 'bold' as 'bold',
  letterSpacing: '2px'
};
const subHeaderStyles = {
  fontSize: '14px',
  letterSpacing: '1.8px'
};

class EndLecture extends React.Component<{}, {}> {
  render() {
    return (
      <div style={containerStyles}>
        <div style={headerStyles}>Lecture In Progress</div>
        <div style={subHeaderStyles}>CLICK TO END PRESENTATION</div>
      </div>
    );
  }
}

export default EndLecture;
