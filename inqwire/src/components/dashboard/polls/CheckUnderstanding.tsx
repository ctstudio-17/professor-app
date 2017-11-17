import * as React from 'react';

const icon = require('../../../assets/lightbulb-icon.png');
const containerStyles = {
  width: '100%',
  height: '100%',
  border: 'solid 1px #585858',
  borderRadius: '3px',
  backgroundColor: '#2c2c2c',
  color: 'white',
  letterSpacing: '1.1px',
  display: 'flex',
  alignItems: 'center' as 'center',
  cursor: 'pointer'
};

const textStyles = {
  marginLeft: '8.3%',
  fontSize: '30px',
  fontWeight: 'bold' as 'bold',
  letterSpacing: '1.1px',
  height: '37.5%'
};

interface Props {
  startPoll: any;
}

class CheckUnderstanding extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.checkUnderstanding = this.checkUnderstanding.bind(this);
  }

  checkUnderstanding(e: any) {
    this.props.startPoll({
      pollTime: 1,
      questionText: 'Do you understand?',
      answers: ['Yes', 'No'],
      correctAns: [false, false]
    }, e);
  }

  render() {
    return (
      <div style={containerStyles} onClick={this.checkUnderstanding}>
        <div style={textStyles}>Check Understanding <img src={icon} style={{height: '100%', verticalAlign: 'text-top'}} /></div>
      </div>
    );
  }
}

export default CheckUnderstanding;
