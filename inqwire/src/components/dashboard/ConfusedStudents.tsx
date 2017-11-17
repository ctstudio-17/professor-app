import * as React from 'react';

import { Confusion } from '../../models';

const rings = [
  {
    backgroundColor: '#13c456',
    boxShadow: '0 2px 12px 0 #65e797',
    border: 'solid 1px #13c456'
  },
  {
    backgroundColor: '#feb46b',
    boxShadow: '0 2px 12px 0 #f18443',
    border: 'solid 1px #ffa636'
  },
  {
    backgroundColor: '#feb46b',
    boxShadow: '0 2px 12px 0 #f18443',
    border: 'solid 1px #ffa636'
  },
  {
    backgroundColor: '#fea16b',
    boxShadow: '0 2px 12px 0 rgba(208, 2, 27, 0.2)',
    border: 'solid 1px #ff6e36'
  },
  {
    backgroundColor: 'rgba(255, 234, 234, 0.4)',
    boxShadow: '0 2px 12px 0 rgba(208, 2, 27, 0.36)',
    border: 'solid 1px #f43348'
  }
];
const icons = [
  require('../../assets/good_pace.png'),
  require('../../assets/neutral-face.png'),
  require('../../assets/confused-emoji.png'),
  require('../../assets/curious-emoji.png'),
  require('../../assets/sick-emoji.png')
];
const backgrounds = [
  'linear-gradient(to bottom, #1bd461, #9fd326)',
  'linear-gradient(to bottom, #fbb249, #fb973d)',
  'linear-gradient(to bottom, #f67436, #fb973d)',
  'linear-gradient(to bottom, #ed2a26, #fb943d)',
  'linear-gradient(to bottom, #ef242f, #ec3814)'
];

const containerStyles = {
  width: '100%',
  height: '100%',
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
  confusions: Confusion[];
}

class ConfusedStudents extends React.Component<Props, {}> {
  currentConfusedStudents(): number {
    if (this.props.currentSlide) {
      return this.props.confusions.reduce((sum: number, confusion: Confusion) => {
        return sum += confusion.slideNumber === this.props.currentSlide ? 1 : 0;
      }, 0);
    } else {
      return this.props.confusions.length;
    }
  }

  render() {
    const numConfused = this.currentConfusedStudents();
    const idx = numConfused < backgrounds.length ? numConfused : backgrounds.length - 1;
    return (
      <div style={{...containerStyles, background: backgrounds[idx]}}>
        <div style={contentStyles}>
          <div style={{...imgContainerStyles, ...rings[idx]}}>
            <img src={icons[idx]} style={{height: '100%'}} />
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
