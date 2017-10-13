import * as React from 'react';

import PigmentBar from './PigmentBar';

const divStyles = {

};

const imgContainerStyles = {
  float: 'left',
  marginRight: '1.5%',
};

const firstLineStyles = {
  'font-size': 'medium',
  'font-weight': 'bold'
};

const secondLineStyles = {
  'text-transform': 'uppercase',
  'font-size': 'x-small',
};

const profAvatar = require('../assets/confusion-icon.svg');

interface State {
  confusing_student_number: number;
  student_number: number;
}

class ConfusingStudents extends React.Component<{},State> {
  constructor() {
    super();
    this.state = {
      confusing_student_number: 1,
      student_number: 15
    };
  }

  render() {
    return (
      <div style={divStyles}>
        <div style={imgContainerStyles}>
          <img src={profAvatar} />
        </div>
        <div style={firstLineStyles}>
          {this.state.confusing_student_number} students 
        </div>
        <div style={secondLineStyles}> are confused</div>
        <PigmentBar confusing_number={this.state.confusing_student_number} student_number={this.state.student_number} />
      </div>
    );
  }
}

export default ConfusingStudents;
