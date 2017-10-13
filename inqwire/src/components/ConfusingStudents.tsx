import * as React from 'react';
import fire from '../firebase';

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
  confused_students: string[];
  student_number: number;
}

class ConfusingStudents extends React.Component<{},State> {
  constructor() {
    super();
    let studentsRef = fire.database().ref('classes/1/students');
    var students = 1;
    studentsRef.once("value", (snapshot: any) => {
      this.setState({ student_number: snapshot.numChildren() });
    });
    this.state = {
      confused_students: [],
      student_number: students,
    };
  }

  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let confusionsRef = fire.database().ref('lectures/1/confusions');
    confusionsRef.on('child_added', (snapshot: any) => {
      /* Update React state when message is added at Firebase Database */
      let student = snapshot.child('student').val();
      if ( this.state.confused_students.indexOf(student) < 0 ) {
        var _confused_students = this.state.confused_students.slice()
        _confused_students.push(student);
        this.setState({ confused_students: _confused_students });
      }
    })
  }

  render() {
    return (
      <div style={divStyles}>
        <div style={imgContainerStyles}>
          <img src={profAvatar} />
        </div>
        <div style={firstLineStyles}>
          {this.state.confused_students.length} students 
        </div>
        <div style={secondLineStyles}> are confused</div>
        <PigmentBar confusing_number={this.state.confused_students.length} student_number={this.state.student_number} />
      </div>
    );
  }
}

export default ConfusingStudents;
