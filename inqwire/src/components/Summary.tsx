import * as React from 'react';
import api from '../firebase';

import GreetingBar from './summary/GreetingBar';
import SummarySection from './summary/SummarySection';
import ClosingQuestionsContainer from './summary/closing-questions/ClosingQuestionsContainer';
import FeedbackResults from './summary/FeedbackResults';
import ConfusionChart from './summary/ConfusionChart';
import PollResultsContainer from './summary/polls/PollResultsContainer';

import { Poll, PollResults, Presentation } from '../models';

const icons = {
  ballot: require('../assets/ballot.svg'),
  chart: require('../assets/chart.svg'),
  notebook: require('../assets/notebook.svg'),
  thumbsUp: require('../assets/thumbs-up.svg'),
  mailbox: require('../assets/mailbox.svg')
};

const containerStyles = {
  display: 'flex',
  flexDirection: 'column' as 'column'
};
const rowStyles = {
  display: 'flex',
  justifyContent: 'space-between' as 'space-between',
  marginBottom: '20px'
};
const greetingBarStyles = {
  margin: '-1.5% -1.5% 20px',
  height: '114px',
  backgroundColor: '#4f92ff',
  color: 'white'
};

interface Props {
  selectedPresentation?: Presentation;
}
interface State {
  feedback_number: number;
  feedback: string[];
  scores: number[];
  levels: number[];
  polls: PollResults[];
  showGreeting: boolean;
}

class Summary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.closeGreeting = this.closeGreeting.bind(this);
    this.state = {
      feedback_number: 0,
      feedback: [],
      scores: [0, 0, 0],
      levels: [],
      polls: [],
      showGreeting: true
    };

    api.getFeedbackRef().on('child_added', this.onFeedback.bind(this));
  }

  componentDidMount() {
    api.getPollsRef().once('value', (snapshot: any) => {
      const polls = (Object as any).values(snapshot.val()).map((poll: Poll) => {
        return {
          questionText: poll.questionText,
          answers: poll.answers.map((answerText: string, i: number) => {
            return {
              answerText,
              isCorrect: poll.correctAns[i],
              numStudentResponses: poll.responses ? (Object as any).values(poll.responses).filter((ans: number) => ans === i).length : 0
            };
          })
        };
      });
      this.setState({ polls });
    });
  }

  closeGreeting() {
    this.setState({ showGreeting: false });
  }

  onFeedback(snapshot: any) {
    const feedback_number = this.state.feedback_number + 1;
    const feedbackObj: any = snapshot.val();
    const feedback = this.state.feedback.slice();
    feedback.push(feedbackObj.comments);
    const scores = this.state.scores.slice();
    const levels = this.state.levels.slice();
    scores[0] = (scores[0] * (feedback_number - 1) + feedbackObj.engagement) / feedback_number;
    scores[1] = (scores[1] * (feedback_number - 1) + feedbackObj.understanding) / feedback_number;
    scores[2] = (scores[2] * (feedback_number - 1) + feedbackObj.pace) / feedback_number;
    levels[0] = scores[0] >= 3.5 ? 2 : (scores[0] >= 2.5 ? 1 : 0);
    levels[1] = scores[1] >= 3.5 ? 2 : (scores[1] >= 2.5 ? 1 : 0);
    levels[2] = scores[2] >= 2.33 ? 2 : (scores[2] >= 1.66 ? 1 : 0);
    this.setState({ feedback_number, feedback, scores, levels });
  }

  render() {
    return (
      <div style={containerStyles}>
        {
          this.state.showGreeting ?
            <div style={greetingBarStyles}>
              <GreetingBar professorName='Berge Selongie'
                           className='AML'
                           lectureDate={new Date()}
                           close={this.closeGreeting} />
            </div> :
          ''
        }

        <div style={{...rowStyles, height: '560px'}}>
          {
            this.props.selectedPresentation ?
            <SummarySection title='Lecture Stats'
                            icon={icons.chart}
                            width='70.2%'>
              <ConfusionChart />
            </SummarySection> :
            'No presentation was selected'
          }
          <SummarySection title='Closing Questions'
                          icon={icons.ballot}
                          width='26.6%'>
            <ClosingQuestionsContainer levels={this.state.levels} />
          </SummarySection>
        </div>

        <div style={{...rowStyles, height: '600px'}}>
          <SummarySection title='Student Feedback'
                          icon={icons.mailbox}
                          width='100%'>
            <FeedbackResults feedback={this.state.feedback} />
          </SummarySection>
        </div>

        {
          this.state.polls.length > 0 ?
            <div style={rowStyles}>
              <SummarySection title='Polls & Quizzes'
                              icon={icons.notebook}
                              width='100%'>
                <PollResultsContainer polls={this.state.polls} />
              </SummarySection>
            </div> :
            ''
        }
      </div>
    );
  }
}

export default Summary;
