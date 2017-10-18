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

interface State {
  bar: any;
}

class PigmentBar extends React.Component<Props, State> {
  componentDidMount() {
    const bar = new ProgressBar.Line('#bar-container', progressSettings);
    bar.svg.style.strokeLinecap = 'round';
    bar.path.style.strokeLinecap = 'round';
    this.setState({ bar });
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const ratio = this.props.numConfusedStudents / this.props.numTotalStudents;
    this.state.bar.animate(ratio);
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
