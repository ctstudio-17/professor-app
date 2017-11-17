import * as React from 'react';
import api from '../../firebase';

import { Confusion } from '../../models';

const icon = require('../../assets/confused-emoji.png');

const containerStyles = {
  width: '100%',
  height: '100%',
  background: 'linear-gradient(to bottom, #fbb249, #fb973d)',
  border: 'solid 1px #585858',
  borderRadius: '3px',
  display: 'flex',
  justifyContent: 'center' as 'center',
  alignItems: 'center' as 'center'
};
const contentStyles = {
  width: '75%',
  height: '50%'
};
const imgContainerStyles = {
  height: '100%',
  backgroundColor: '#feb46b',
  boxShadow: '0 2px 12px 0 #f18443',
  border: 'solid 1px #ffa636',
  borderRadius: '50%',
  padding: '10px',
  boxSizing: 'border-box',
  display: 'inline-block',
  marginRight: '5.6%'
};
const textStyles = {
  display: 'inline-flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-evenly' as 'space-evenly',
  height: '100%',
  verticalAlign: 'bottom',
  color: 'white',
  fontSize: '33px',
  letterSpacing: '0.3px'
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
        <div style={contentStyles}>
          <div style={imgContainerStyles}>
            <img src={icon} style={{height: '100%'}} />
          </div>

          <div style={textStyles}>
            <div style={{fontWeight: 'bold'}}>{numConfused} student{numConfused === 1 ? '' : 's'}</div>
            <div> {numConfused === 1 ? 'feels' : 'feel'} confused</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfusedStudents;
