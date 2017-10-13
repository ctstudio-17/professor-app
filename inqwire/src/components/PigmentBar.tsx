import * as React from 'react';

var ProgressBar = require('progressbar.js');

const divStyles = {
  padding: '2px',
  width: '100%',
  height: '30px',
};

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

interface State {
  bar: any;
}

class PigmentBar extends React.Component<Props, State> {
  componentDidMount() {
    this.setState({bar: new ProgressBar.Line('#bar-container', progressSetting)});
    // this.state.bar.path.style.strokeLinecap = 'round';
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    var ratio = this.props.confusing_number / this.props.student_number;
    console.log(this.props.student_number);
    this.state.bar.animate(ratio);  // Number from 0.0 to 1.0
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