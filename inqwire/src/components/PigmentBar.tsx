import * as React from 'react';

var ProgressBar = require('progressbar.js');

const divStyles = {
  padding: '2px',
  width: '100%',
  height: '30px',
}

const progressSetting = {
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
  confusing_number: number;
  student_number: number;
}

class PigmentBar extends React.Component<Props, {}> {
  componentDidMount() {
    var bar = new ProgressBar.Line('#bar-container', progressSetting);
    bar.path.style.strokeLinecap = 'round';
    var ratio = this.props.confusing_number/this.props.student_number;
    bar.animate(ratio);  // Number from 0.0 to 1.0
  }

  render() {
    return (
      <div >
        <div id="bar-container" style={divStyles}></div>
      </div>
    );
  }
}

export default PigmentBar;

