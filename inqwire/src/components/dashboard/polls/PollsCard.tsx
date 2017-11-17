import * as React from 'react';

const icon = require('../../../assets/notebook.svg');
const containerStyles = {
  width: '100%',
  height: '100%',
  border: 'solid 1px #585858',
  backgroundColor: '#2c2c2c',
  color: 'white',
  letterSpacing: '1.1px',
  display: 'flex',
  justifyContent: 'center' as 'center',
  alignItems: 'center' as 'center',
  cursor: 'pointer'
};
const contentStyles = {
  width: '84%',
  height: '60%',
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between' as 'space-between'
};
const imgStyles = {
  height: '100%',
  verticalAlign: 'text-top'
};
const titleStyles = {
  fontSize: '30px',
  fontWeight: 'bold' as 'bold',
  height: '40%'
};
const subTextStyles = {
  fontSize: '20px'
};

interface Props {
  openPoll: any;
}

class CreatePoll extends React.Component<Props, {}> {
  render() {
    return (
      <div style={containerStyles}>
        <div style={contentStyles}>
          <div style={titleStyles}>Polls & Quizzes <img src={icon} style={imgStyles} /></div>
          <div style={subTextStyles}>Send a quick poll or quiz out to your class to check their comprehension.</div>
        </div>
      </div>
    );
  }
}

export default CreatePoll;
