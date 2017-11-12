import * as React from 'react';
import '../../styles/animations.css';

const containerStyles = {
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: '#e7e7e7',
  textAlign: 'center',
  padding: '2.3% 0',
  color: '#5f5f5f',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between' as 'space-between',
  position: 'relative' as 'relative'
};
const headerStyles = {
  fontSize: '26px',
  fontWeight: 'bold' as 'bold',
  letterSpacing: '2px',
  display: 'flex',
  justifyContent: 'center' as 'center',
  alignItems: 'center' as 'center'
};
const recordingContainerStyles = {
  width: '17px',
  height: '17px',
  border: 'solid 1px red',
  borderRadius: '50%',
  marginRight: '1.1%',
  position: 'relative' as 'relative'
};
const recordingBoxStyles = {
  width: '50%',
  height: '50%',
  backgroundColor: 'red',
  position: 'absolute' as 'absolute',
  top: '25%',
  left: '25%'
};
const subHeaderStyles = {
  fontSize: '14px',
  letterSpacing: '1.8px'
};
const timeContainerStyles = {
  position: 'absolute' as 'absolute',
  width: '5.8%',
  height: '24.7%',
  top: '9.9%',
  right: '0.9%',
  display: 'flex',
  flexDirection: 'column' as 'column',
  color: '#5f5f5f'
};
const timeStyles = {
  fontSize: '14px',
  fontWeight: 'bold' as 'bold',
  letterSpacing: '1.8px'
};
const timeLabelStyles = {
  fontSize: '7px',
  letterSpacing: '1px',
  display: 'flex',
  justifyContent: 'space-between' as 'space-between'
};

interface Props {
  endLecture: any;
}
interface State {
  intervalId: number;
  minutes: number;
  seconds: number;
}

class EndLecture extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      intervalId: -1,
      minutes: 0,
      seconds: 0
    };
  }

  updateTime() {
    const minutes = this.state.minutes + Math.floor((this.state.seconds + 1) / 60);
    this.setState({
      minutes: minutes,
      seconds: (this.state.seconds + 1) % 60
    });
  }

  componentDidMount() {
    this.setState({
      minutes: 0,
      seconds: 0
    });
    const intervalId = setInterval(this.updateTime.bind(this), 1000);
    this.setState({ intervalId });
  }

  render() {
    return (
      <div style={containerStyles} onClick={this.props.endLecture}>
        <div style={headerStyles}>
          <div style={recordingContainerStyles}>
            <div className='flash-animation' style={recordingBoxStyles} />
          </div>
          <div>Lecture In Progress</div>
        </div>
        <div style={subHeaderStyles}>CLICK TO END LECTURE</div>

        <div style={timeContainerStyles}>
          <div style={timeStyles}>
            <span>{('0' + this.state.minutes).slice(-2)}</span>
            <span>:</span>
            <span>{('0' + this.state.seconds).slice(-2)}</span>
          </div>
          <div style={timeLabelStyles}><span>min</span><span>sec</span></div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
}

export default EndLecture;
