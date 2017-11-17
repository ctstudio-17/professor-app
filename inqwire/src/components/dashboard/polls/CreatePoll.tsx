import * as React from 'react';

import Button from '../../shared/Button';
import PollAnswer from './PollAnswer';

const clockIcon = require('../../../assets/clock-icon.svg');
const notebookIcon = require('../../../assets/notebook.svg');

const containerStyles = {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between' as 'space-between'
};
const headerRowStyles = {
  display: 'flex',
  fontSize: '25px',
  fontWeight: 'bold' as 'bold',
  letterSpacing: '0.9px',
  justifyContent: 'space-between' as 'space-between',
  height: '25px'
};
const timeContainerStyles = {
  borderBottom: 'solid 1px black',
  display: 'inline-block',
  height: '100%',
  marginLeft: '8px'
};
const imgStyles = {
  height: '100%',
  verticalAlign: 'top'
};
const numInputStyles = {
  border: 'none',
  padding: '0',
  width: '15px',
  font: 'inherit',
  height: '100%',
  verticalAlign: 'text-top'
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
    this.updatePollTime = this.updatePollTime.bind(this);
    this.addAnotherAnswer = this.addAnotherAnswer.bind(this);
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
  updatePollTime(e: any) {
    const v = parseInt(e.target.value, 10);
    if (e.target.value === '' || (v == e.target.value && v > 0 && v < 10)) {
      this.setState({pollTime: e.target.value});
    }
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

  render() {
    return (
      <div style={containerStyles}>
        <div style={headerRowStyles}>
          <div style={{flexGrow: 1}}>
            Create a Poll or Quiz <img src={notebookIcon} style={{height: '100%', verticalAlign: 'text-top'}} />
          </div>

          <div style={{flexGrow: 1, textAlign: 'right'}}>
            <img src={clockIcon} style={imgStyles}/>
            <div style={timeContainerStyles}>
              <input style={numInputStyles} size={1} type='text' value={this.state.pollTime} onChange={this.updatePollTime} /> MIN
            </div>
          </div>
        </div>

        <div>
          <input type='text' placeholder='Type your question *' style={inputStyles}
                 value={this.state.questionText} onChange={this.updateQuestionText} />
        </div>

        <div style={{height: '2px', width: '100%', backgroundColor: '#424242'}} />

        <div style={answerContainerStyles}>
          {
            this.state.answers.map((answerText, i) => <PollAnswer key={i}
                                                                  answerText={answerText}
                                                                  isCorrect={this.state.correctAns[i]}
                                                                  setAnswerText={this.updateAnswerText.bind(this, i = i)}
                                                                  setCorrect={this.toggleCorrectAnswer.bind(this, i)} />)
          }
        </div>

        <div style={{...answerContainerStyles, height: '19.2%'}}>
          <Button height='41.5%'
                  backgroundColor='inherit'
                  textColor='#4f92ff'
                  border='solid 2px #4f92ff'
                  buttonText='Add Another Answer'
                  handleButtonClick={this.addAnotherAnswer} />
          <Button height='41.5%'
                  backgroundColor='#4f92ff'
                  textColor='white'
                  buttonText='Start Poll'
                  handleButtonClick={() => this.props.startPoll(this.state, event)} />
        </div>
      </div>
    );
  }
}

export default CreatePoll;
