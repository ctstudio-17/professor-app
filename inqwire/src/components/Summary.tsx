import * as React from 'react';
import api from '../firebase';

import GreetingBar from './summary/GreetingBar';
import SummarySection from './summary/SummarySection';
import ClosingQuestionsContainer from './summary/closing-questions/ClosingQuestionsContainer';
import FeedbackResults from './summary/FeedbackResults';
import ConfusionChart from './summary/ConfusionChart';
import PollResultsContainer from './summary/polls/PollResultsContainer';

import { Presentation } from '../models';
import { confusionSlides } from '../mockdata/confusion-slides';
import { pollResults } from '../mockdata/poll-results';

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
  feedback: string[];
  ratings: number[];
  showGreeting: boolean;
}

class Summary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.closeGreeting = this.closeGreeting.bind(this);
    this.state = {
      feedback: [],
      ratings: [],
      showGreeting: true
    };

    api.getFeedbackRef().on('child_added', this.onFeedback.bind(this));
  }

  closeGreeting() {
    this.setState({ showGreeting: false });
  }

  onFeedback(snapshot: any) {
    const feedback = this.state.feedback.slice();
    feedback.push(snapshot.val().content);
    const ratings = this.state.ratings.slice();
    ratings.push(snapshot.val().rating);

    this.setState({ feedback, ratings });
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
              <ConfusionChart presentationId={this.props.selectedPresentation.id} confusionSlides={confusionSlides} />
            </SummarySection> :
            'No presentation was selected'
          }
          <SummarySection title='Closing Questions'
                          icon={icons.ballot}
                          width='26.6%'>
            <ClosingQuestionsContainer ratings={this.state.ratings} />
          </SummarySection>
        </div>

        <div style={{...rowStyles, height: '600px'}}>
          <SummarySection title='Student Feedback'
                          icon={icons.mailbox}
                          width='100%'>
            <FeedbackResults feedback={this.state.feedback} />
          </SummarySection>
        </div>

        <div style={rowStyles}>
          <SummarySection title='Polls & Quizzes'
                          icon={icons.notebook}
                          width='100%'>
            <PollResultsContainer polls={pollResults} />
          </SummarySection>
        </div>
      </div>
    );
  }
}

export default Summary;
