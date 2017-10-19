import * as React from 'react';

import Button from '../shared/Button';
import PollAnswer from './PollAnswer';

const clockIcon = require('../../assets/clock-icon.svg');
const pollContainerStyles = {
  width: '100%',
  height: '100%',
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
const timeContainerStyles = {
  color: 'var(--lavender-blue)',
  borderBottom: 'solid 1px var(--lavender-blue)',
  display: 'inline-block',
  boxSizing: 'border-box',
  height: '100%',
  marginLeft: '8px'
};
const imgStyles = {
  height: '100%',
  verticalAlign: 'top'
};
const inputStyles = {
  border: 'none',
  width: '100%',
  fontSize: '20px',
  fontWeight: 'bold' as 'bold'
};
const answerContainerStyles = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between' as 'space-between',
  height: '41.1%',
  overflowY: 'auto' as 'auto'
};

interface Props {
  startPoll: any;
}
interface State {
  pollTime: number;
  questionText: string;
  answers: string[];
  correctAns: boolean[];
}

class CreatePoll extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.updateQuestionText = this.updateQuestionText.bind(this);
    this.addAnotherAnswer = this.addAnotherAnswer.bind(this);
    this.checkUnderstanding = this.checkUnderstanding.bind(this);
    const numDefaultQues = 4;
    this.state = {
      pollTime: 1,
      questionText: '',
      answers: Array(numDefaultQues).fill(''),
      correctAns: Array(numDefaultQues).fill(false)
    };
  }

  updateQuestionText(e: any) {
    this.setState({
      questionText: e.target.value
    });
  }
  updateAnswerText(i: number, e: any) {
    const newAnswers = this.state.answers;
    newAnswers[i] = e.target.value;
    this.setState({
      answers: newAnswers
    });
  }
  toggleCorrectAnswer(i: number) {
    const correctAns = this.state.correctAns;
    correctAns[i] = !correctAns[i];
    this.setState({
      correctAns: correctAns
    });
  }
  addAnotherAnswer() {
    const newAnswers = this.state.answers;
    const correctAns = this.state.correctAns;
    newAnswers.push('');
    correctAns.push(false);
    this.setState({
      answers: newAnswers,
      correctAns: correctAns
    });
  }
  checkUnderstanding() {
    this.setState({
      questionText: 'Do you understand?',
      answers: ['Yes', 'No', '', ''],
      correctAns: [false, false, false, false]
    });
    this.props.startPoll();
  }

  render() {
    return (
      <div style={pollContainerStyles}>
        <div style={headerRowStyles}>
          <div>POLLS & QUIZZES</div>
          <div>
            <img src={clockIcon} style={imgStyles}/>
            <div style={timeContainerStyles}> {this.state.pollTime} MIN</div>
          </div>
        </div>

        <div>
          <input type='text' placeholder='Type a question...' style={inputStyles}
                 value={this.state.questionText} onChange={this.updateQuestionText} />
        </div>

        <div style={{height: '2px', width: '100%', backgroundColor: 'black'}} />

        <div style={answerContainerStyles}>
          {
            this.state.answers.map((answerText, i) => <PollAnswer key={i}
                                                                  letter={String.fromCharCode(65 + i)}
                                                                  answerText={answerText}
                                                                  isCorrect={this.state.correctAns[i]}
                                                                  setAnswerText={this.updateAnswerText.bind(this, i = i)}
                                                                  setCorrect={this.toggleCorrectAnswer.bind(this, i)} />)
          }
        </div>

        <div style={{...answerContainerStyles, height: '19.2%'}}>
          <Button height='41.5%' backgroundColor='#e7e7e7' textColor='#5f5f5f' buttonText='ADD ANOTHER ANSWER' handleButtonClick={this.addAnotherAnswer} />
          <Button height='41.5%' backgroundColor='#bbbbbb' textColor='#ffffff' buttonText={'START POLL'} handleButtonClick={this.props.startPoll} />
        </div>

        <div style={{height: '1px', width: '100%', backgroundColor: 'black'}} />

        <div style={{...answerContainerStyles, height: '13.7%'}}>
          <div>COMPREHENSION POLL</div>
          <Button height='57.3%' backgroundColor='var(--lavender-blue)' textColor='#ffffff' buttonText='CHECK UNDERSTANDING' handleButtonClick={this.checkUnderstanding} />
        </div>
      </div>
    );
  }
}

export default CreatePoll;
