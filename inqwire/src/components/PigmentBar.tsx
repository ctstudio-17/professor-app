import * as React from 'react';

const ProgressBar = require('progressbar.js');

const divStyles = {
  padding: '2px',
  width: '100%',
  height: '30px',
};
const progressSettings = {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1400,
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 4,
  svgStyle: {width: '100%', height: '100%'},
  from: {color: '#FFEA82'},
  to: {color: '#ED6A5A'},
  step: (state: any, bar: any) => {
    bar.path.setAttribute('stroke', state.color);
  }
};

interface Props {
  numConfusedStudents: number;
  numTotalStudents: number;
}

class PigmentBar extends React.Component<Props, {}> {
  componentDidMount() {
    const bar = new ProgressBar.Line('#bar-container', progressSettings);
    bar.path.style.strokeLinecap = 'round';
    const ratio = this.props.numConfusedStudents / this.props.numTotalStudents;
    bar.animate(ratio);
  }

  render() {
    return (
      <div >
        <div id='bar-container' style={divStyles}></div>
      </div>
    );
  }
}

export default PigmentBar;
