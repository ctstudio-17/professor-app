import * as React from 'react';

import { PollAnswer } from '../../../models';

const containerStyles = {
  width: '100%',
  height: '100px',
  margin: '15px 3.1% 15px 0'
};
const answerTextStyles = {
  fontSize: '25px',
  letterSpacing: '1px',
  fontWeight: 'bold' as 'bold',
  marginBottom: '10px'
};
const rowStyles = {
  height: '60px',
  display: 'flex',
  alignItems: 'center' as 'center',
  fontSize: '30px',
  whiteSpace: 'nowrap'
};
const barStyles = {
  height: '100%',
  marginRight: '1.6%'
};

interface Props {
  withMargin: boolean;
  answer: PollAnswer;
  barWidth: number;
}

class PollResultAnswer extends React.Component<Props, {}> {
  shouldComponentUpdate() {
    return !this.props.withMargin;
  }

  render() {
    return (
      <div style={{...containerStyles, margin: this.props.withMargin ? containerStyles.margin : '0'}}>
        <div style={{...answerTextStyles, color: this.props.answer.isCorrect ? '#4f92ff' : 'black'}}>
          {this.props.answer.answerText}
        </div>
        <div style={{...rowStyles, color: this.props.answer.isCorrect ? '#4f92ff' : '#5f5f5f'}}>
          <div style={{
            ...barStyles,
            backgroundColor: this.props.answer.isCorrect ? '#4f92ff' : '#e4e4e4',
            width: `${this.props.barWidth}%`
          }} />
          {this.props.answer.numStudentResponses} vote{this.props.answer.numStudentResponses === 1 ? '' : 's'}
        </div>
      </div>
    );
  }
}

export default PollResultAnswer;
