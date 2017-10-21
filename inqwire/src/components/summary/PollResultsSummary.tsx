import * as React from 'react';

import SummaryCardHeader from './SummaryCardHeader';

import { PollAnswer, PollResults } from '../../models';

const starIcon = require('../../assets/star-icon-filled.svg');

const flexSpaceBetween = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between' as 'space-between'
};
const containerStyles = {
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  border: 'solid 1px black',
  backgroundColor: 'var(--white)',
  ...flexSpaceBetween
};
const resultsContainerStyles = {
  height: '77.7%',
  padding: '3%',
  boxSizing: 'border-box',
  ...flexSpaceBetween
};
const resultsHeaderStyles = {
  fontSize: '14px',
  letterSpacing: '1.8px'
};
const questionStyles = {
  fontSize: '35px',
  fontWeight: 'bold' as 'bold',
  lineHeight: 1.14
};
const answerStyles = {
  fontSize: '24px'
};
const correctAnswerStyles = {
  ...answerStyles,
  fontWeight: 'bold' as 'bold',
  color: 'var(--lavender-blue)'
};
const nextButtonStyles = {
  height: '11.1%',
  fontSize: '16px',
  fontWeight: 'bold' as 'bold',
  display: 'flex',
  justifyContent: 'space-around' as 'space-around',
  alignItems: 'center' as 'center',
  letterSpacing: '1.8px',
  padding: '2.2%',
  boxSizing: 'border-box',
  borderTop: 'solid 1px rgba(151, 151, 151, 0.24)'
};

interface Props {
  polls: PollResults[];
}
interface State {
  currentPollIdx: number;
}

class PollResultsSummary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currentPollIdx: 0
    };
  }

  goToPoll(pollIdx: number) {
    if (pollIdx < 0 || pollIdx >= this.props.polls.length) { return; }
    this.setState({currentPollIdx: pollIdx});
  }

  render() {
    return (
    <div style={containerStyles}>
      <div style={{height: '11.2%'}}>
        <SummaryCardHeader title='Polls & Quizzes' />
      </div>

      <div style={resultsContainerStyles}>
        <div style={resultsHeaderStyles}>
          RESULTS: POLL #{this.state.currentPollIdx + 1}
        </div>
        <div style={questionStyles}>
          {this.props.polls[this.state.currentPollIdx].questionText}
        </div>
        {
          this.props.polls[this.state.currentPollIdx].answers.map((answer: PollAnswer, i: number) => {
            return (
              <div key={i} style={answer.isCorrect ? correctAnswerStyles : answerStyles} >
                {`${String.fromCharCode(65 + i)}. ${answer.answerText} - ${answer.numStudentResponses} ${answer.isCorrect ? 'answered correctly' : (answer.numStudentResponses === 1 ? 'response' : 'responses')}`}
                {answer.isCorrect ? <img src={starIcon} style={{marginLeft: '0.9%'}} /> : ''}
              </div>
            );
          })
        }
      </div>

      <div style={nextButtonStyles}>
        <span style={{cursor: 'pointer'}} onClick={() => this.goToPoll(this.state.currentPollIdx - 1)}>PREVIOUS</span>
        <span style={{cursor: 'pointer'}} onClick={() => this.goToPoll(this.state.currentPollIdx + 1)}>NEXT</span>
      </div>
    </div>
    );
  }
}

export default PollResultsSummary;
