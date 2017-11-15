import * as React from 'react';
import api from '../../firebase';

import PigmentBar from './PigmentBar';

import { Confusion } from '../../models';

const avatar = require('../../assets/confusion-icon.svg');

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

interface Props {
  currentSlide?: number;
}
interface State {
  confusions: Confusion[];
  numTotalStudents: number;
}

class ConfusedStudents extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      confusions: [],
      numTotalStudents: 13
    };
  }

  componentDidMount() {
    this.initConfusions();
  }

  initConfusions() {
    const confusionsRef = api.getConfusionRef();
    confusionsRef.on('child_added', (snapshot: any) => {
      const confusion = snapshot.val();
      const confusions = this.state.confusions.slice();
      confusions.push({
        student: confusion.student,
        timestamp: new Date(confusion.timestamp * 1000),
        slideNumber: confusion.slide_number
      });
      this.setState({ confusions });
    });
  }

  currentConfusedStudents(): number {
    if (this.props.currentSlide) {
      return this.state.confusions.reduce((sum: number, confusion: Confusion) => {
        return sum += confusion.slideNumber === this.props.currentSlide ? 1 : 0;
      }, 0);
    } else {
      return this.state.confusions.length;
    }
  }

  render() {
    const numConfused = this.currentConfusedStudents();
    return (
      <div style={containerStyles}>
        <div style={imgContainerStyles}>
          <img src={avatar} />
        </div>
        <div style={firstLineStyles}>
          {numConfused} student{numConfused === 1 ? '' : 's'}
        </div>
        <div style={secondLineStyles}> {numConfused === 1 ? 'is' : 'are'} confused</div>
        <PigmentBar numConfusedStudents={numConfused} numTotalStudents={this.state.numTotalStudents} />
      </div>
    );
  }
}

export default ConfusedStudents;
