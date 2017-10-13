import * as React from 'react';

import PigmentBar from './PigmentBar';

const profAvatar = require('../assets/confusion-icon.svg');

const containerStyles = {
  padding: '2.9%',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 2px 11px 0 rgba(190, 190, 190, 0.45)'
};
const imgContainerStyles = {
  float: 'left',
  marginRight: '1.5%',
};
const firstLineStyles = {
  fontSize: '26px',
  fontWeight: 'bold' as 'bold'
};
const secondLineStyles = {
  textTransform: 'uppercase',
  fontSize: '14px',
};

interface State {
  numConfusedStudents: number;
  numTotalStudents: number;
}

class ConfusingStudents extends React.Component<{}, State> {
  constructor() {
    super();
    this.state = {
      numConfusedStudents: 15,
      numTotalStudents: 147
    };
  }

  render() {
    return (
      <div style={containerStyles}>
        <div style={imgContainerStyles}>
          <img src={profAvatar} />
        </div>
        <div style={firstLineStyles}>
          {this.state.numConfusedStudents} student{this.state.numConfusedStudents === 1 ? '' : 's'}
        </div>
        <div style={secondLineStyles}> {this.state.numConfusedStudents === 1 ? 'is' : 'are'} confused</div>
        <PigmentBar numConfusedStudents={this.state.numConfusedStudents} numTotalStudents={this.state.numTotalStudents} />
      </div>
    );
  }
}

export default ConfusingStudents;
