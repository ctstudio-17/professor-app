import * as React from 'react';

const starIcon = require('../../assets/star-icon.svg');
const starIconFilled = require('../../assets/star-icon-filled.svg');

const answerBoxStyles = {
  width: '100%',
  height: '20.8%',
  border: 'solid 1px black',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center' as 'center',
  justifyContent: 'space-between' as 'space-between'
};
const dotStyles = {
  marginLeft: '3.8%'
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
  width: '54.3%',
  height: '32.1%'
};

interface Props {
  letter: string;
  answerText: string;
  isCorrect: boolean;

  setAnswerText: any;
  setCorrect: any;
}

class CreatePoll extends React.Component<Props, {}> {
  render() {
    return (
      <div style={answerBoxStyles}>
        <div style={dotStyles}>{this.props.letter}.</div>
        <input type='text' placeholder='Write an answer' style={inputStyles}
               value={this.props.answerText} onChange={this.props.setAnswerText} />
        <div style={correctContainerStyles}>
          <div style={starDiv} onClick={this.props.setCorrect}>
            <img src={this.props.isCorrect ? starIconFilled : starIcon} />
          </div>
          <span>Correct</span>
        </div>
      </div>
    );
  }
}

export default CreatePoll;
