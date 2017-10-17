import * as React from 'react';
import fire from '../firebase';

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
  numConfusedStudents: string[];
  numTotalStudents: number;
}

class ConfusingStudents extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.initStudents();
    this.initConfusions();

    this.state = {
      numConfusedStudents: [],
      numTotalStudents: 1,
    };
  }

  initStudents() {
    const studentsRef = fire.database().ref('classes/1/students');
    studentsRef.once('value', (snapshot: any) => {
      this.setState({ numTotalStudents: snapshot.numChildren() });
    });
  }

  initConfusions() {
    /* Create reference to messages in Firebase Database */
    const confusionsRef = fire.database().ref('lectures/1/confusions');
    confusionsRef.on('child_added', (snapshot: any) => {
      /* Update React state when message is added at Firebase Database */
      const student = snapshot.child('student').val();
      if ( this.state.numConfusedStudents.indexOf(student) < 0 ) {
        const _numConfusedStudents = this.state.numConfusedStudents.slice();
        _numConfusedStudents.push(student);
        this.setState({ numConfusedStudents: _numConfusedStudents });
      }
    });
  }

  render() {
    return (
      <div style={containerStyles}>
        <div style={imgContainerStyles}>
          <img src={profAvatar} />
        </div>
        <div style={firstLineStyles}>
          {this.state.numConfusedStudents.length} student{this.state.numConfusedStudents.length === 1 ? '' : 's'}
        </div>
        <div style={secondLineStyles}> {this.state.numConfusedStudents.length === 1 ? 'is' : 'are'} confused</div>
        <PigmentBar numConfusedStudents={this.state.numConfusedStudents.length} numTotalStudents={this.state.numTotalStudents} />
      </div>
    );
  }
}

export default ConfusingStudents;
