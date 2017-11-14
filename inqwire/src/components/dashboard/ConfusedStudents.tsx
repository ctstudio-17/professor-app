import * as React from 'react';
import api from '../../firebase';

import PigmentBar from './PigmentBar';

const profAvatar = require('../../assets/confusion-icon.svg');

const containerStyles = {
  padding: '2.9%',
  backgroundColor: 'var(--white)',
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

class ConfusedStudents extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.initConfusions();

    this.state = {
      numConfusedStudents: [],
      numTotalStudents: 10,
    };
  }

  initConfusions() {
    /* Create reference to messages in Firebase Database */
    const confusionsRef = api.getConfusionRef();
    confusionsRef.on('child_added', (snapshot: any) => {
      // const currSlide = document.getElementsByClassName('goog-flat-menu-button-caption')[0].textContent.trim().split(' ')[1];

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

export default ConfusedStudents;
