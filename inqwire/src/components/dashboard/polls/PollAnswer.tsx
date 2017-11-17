import * as React from 'react';

const starIcon = require('../../../assets/star-icon.svg');
const starIconFilled = require('../../../assets/star-icon-filled.svg');

const answerBoxStyles = {
  width: '100%',
  height: '20.8%',
  borderBottom: 'solid 1.5px #c2c2c2',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center' as 'center',
  justifyContent: 'space-between' as 'space-between'
};
const inputStyles = {
  border: 'none',
  flexGrow: 1,
  fontSize: '20px',
  lineHeight: 1.11,
  color: '#c2c2c2'
};
const correctContainerStyles = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'center' as 'center',
  justifyContent: 'space-evenly' as 'space-evenly',
  fontSize: '10px',
  color: '#c2c2c2'
};
const starDiv = {
  cursor: 'pointer',
  width: '75%',
};
const imgStyles = {
  width: '100%'
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
        <input type='text' placeholder='Write an answer' style={inputStyles}
               value={this.props.answerText} onChange={this.props.setAnswerText} />
        <div style={correctContainerStyles}>
          <div style={starDiv} onClick={this.props.setCorrect}>
            <img src={this.props.isCorrect ? starIconFilled : starIcon} style={imgStyles} />
          </div>
          <span>Correct</span>
        </div>
      </div>
    );
  }
}

export default CreatePoll;
