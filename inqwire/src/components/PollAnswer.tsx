import * as React from 'react';

const answerBoxStyles = {
  width: '100%',
  height: '41.5%',
  border: 'solid 1px black',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center' as 'center',
  justifyContent: 'space-between' as 'space-between'
};
const dotStyles = {
  marginLeft: '3.8%',
  width: '3.4%',
  height: '26.8%',
  border: 'solid 2px #5f5f5f',
  borderRadius: '100%'
};
const inputStyles = {
  border: 'none',
  marginLeft: '4.5%',
  flexGrow: 1,
  fontSize: '18px',
  lineHeight: 1.11,
  color: '#5f5f5f'
};
const correctContainerStyles = {
  margin: '0 3.8% 0 2.5%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'center' as 'center',
  justifyContent: 'space-evenly' as 'space-evenly',
  fontSize: '10px',
  color: '#5f5f5f'
};
const starDiv = {
  cursor: 'pointer',
  border: 'solid 1px black',
  width: '54.3%',
  height: '32.1%'
};

interface Props {
  answerText: string;
  isCorrect: boolean;

  setAnswerText: any;
  setCorrect: any;
}

class CreatePoll extends React.Component<Props, {}> {
  render() {
    return (
      <div style={answerBoxStyles}>
        <div style={dotStyles}></div>
        <input style={inputStyles} placeholder='Write an answer' />
        <div style={correctContainerStyles}>
          <div style={{...starDiv, backgroundColor: this.props.isCorrect ? 'yellow' : ''}} onClick={this.props.setCorrect} />
          <span>Correct</span>
        </div>
      </div>
    );
  }
}

export default CreatePoll;
