import * as React from 'react';

const thumbsUpIcon = require('../../../assets/thumbs-up.svg');

const containerStyles = {
  borderRadius: '4px',
  border: 'solid 1px #e4e4e4',
  height: '132px',
  marginBottom: '15px',
  padding: '35px 6.5%',
  display: 'flex',
  alignItems: 'center' as 'center',
  boxSizing: 'border-box'
};
const thumbsUpContainerStyles = {
  height: '60px',
  minWidth: '60px',
  display: 'flex',
  alignItems: 'center' as 'center',
  justifyContent: 'center' as 'center',
  backgroundColor: '#fff0bb',
  border: 'solid 1px #ffe279',
  borderRadius: '50%',
  marginRight: '6.7%'
};
const iconStyles = {
  height: '50%',
  width: '50%'
};
const titleStyles = {
  fontSize: '17px',
  fontWeight: 'bold' as 'bold',
  lineHeight: 1.47,
  display: 'block',
  textAlign: 'left'
};
const subTextStyles = {
  fontSize: '14px',
  lineHeight: 1.36,
  textAlign: 'left',
  display: 'block'
};

class ClosingQuestionsOverview extends React.Component<{}, {}> {
  render() {
    return (
      <div style={containerStyles}>
        <div style={thumbsUpContainerStyles}>
          <img src={thumbsUpIcon} style={iconStyles} />
        </div>

        <div>
          <div style={titleStyles}>Great job during lecture!</div>
          <div style={subTextStyles}>Here's what your students had to say about your closing questions.</div>
        </div>
      </div>
    );
  }
}

export default ClosingQuestionsOverview;
