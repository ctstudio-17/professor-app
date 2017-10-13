import * as React from 'react';

import Button from './Button';
import PollAnswer from './PollAnswer';

const clockIcon = require('../assets/clock-icon.svg');
const pollContainerStyles = {
  width: '35.2%',
  height: '100%',
  padding: '2%',
  boxSizing: 'border-box',
  border: 'solid 1px black',
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between' as 'space-between'
};
const headerRowStyles = {
  display: 'flex',
  fontSize: '16px',
  letterSpacing: '2px',
  justifyContent: 'space-between' as 'space-between',
  height: '3.5%'
};
const imgStyles = {
  height: '100%',
  verticalAlign: 'top'
};
const inputStyles = {
  border: 'none',
  fontSize: '20px',
  fontWeight: 'bold' as 'bold'
};
const answerContainerStyles = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between' as 'space-between',
  height: '24.5%',
  overflowY: 'auto' as 'auto'
};

interface State {
  pollTime: number;
  questionText: string;
  answers: string[];
  correctIdx: number;
  pollRunning: boolean;
}

class CreatePoll extends React.Component<{}, State> {
  componentWillMount() {
    this.setState({
      pollTime: 1,
      questionText: '',
      answers: ['', ''],
      correctIdx: 0,
      pollRunning: false
    });
  }

  updateQuestionText(e: any) {
    this.setState({
      questionText: e.target.value
    });
  }
  updateAnswerText(e: any, i: number) {
    const newAnswers = this.state.answers;
    newAnswers[i] = e.target.value;
    this.setState({
      answers: newAnswers
    });
  }
  setCorrectAnswer(i: number) {
    this.setState({
      correctIdx: i
    });
  }
  addAnotherAnswer() {
    const newAnswers = this.state.answers;
    newAnswers.push('');
    this.setState({
      answers: newAnswers
    });
  }
  startPoll() {
    console.log('Start the poll!');
  }
  checkUnderstanding() {
    console.log('Check understanding!');
    this.startPoll();
  }

  render() {
    return (
      <div style={pollContainerStyles}>
        <div style={headerRowStyles}>
          <div>POLLS & QUIZZES</div>
          <div>
            <img src={clockIcon} style={imgStyles}/> {this.state.pollTime} MIN
          </div>
        </div>

        <div>
          <input type='text' placeholder='Type a question...' style={inputStyles}
                 value={this.state.questionText} onChange={this.updateQuestionText.bind(this)} />
        </div>

        <div style={{height: '2px', width: '100%', backgroundColor: 'black'}} />

        <div style={answerContainerStyles}>
          {
            this.state.answers.map((answerText, i) => <PollAnswer answerText={answerText}
                                                                  isCorrect={i === this.state.correctIdx}
                                                                  setAnswerText={this.updateAnswerText.bind(this, i = i)}
                                                                  setCorrect={this.setCorrectAnswer.bind(this, i)} />)
          }
        </div>

        <div style={answerContainerStyles}>
          <Button height='41.5%' backgroundColor='#e7e7e7' textColor='#5f5f5f' buttonText='ADD ANOTHER ANSWER' handleButtonClick={this.addAnotherAnswer.bind(this)} />
          <Button height='41.5%' backgroundColor='#bbbbbb' textColor='#ffffff' buttonText='START POLL' handleButtonClick={this.startPoll.bind(this)} />
        </div>

        <div style={{height: '1px', width: '100%', backgroundColor: 'black'}} />

        <div style={{...answerContainerStyles, height: '17.7%'}}>
          <div>COMPREHENSION POLL</div>
          <Button height='57.3%' backgroundColor='#8e8df3' textColor='#ffffff' buttonText='CHECK UNDERSTANDING' handleButtonClick={this.checkUnderstanding.bind(this)} />
        </div>
      </div>
    );
  }
}

export default CreatePoll;
