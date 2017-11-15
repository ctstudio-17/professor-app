import * as React from 'react';
import api from '../firebase';

import RatingResults from './summary/RatingResults';
import FeedbackResults from './summary/FeedbackResults';
import ConfusionChart from './summary/ConfusionChart';
import PollResultsSummary from './summary/PollResultsSummary';

import { Presentation } from '../models';
import { confusionSlides } from '../mockdata/confusion-slides';
import { pollResults } from '../mockdata/poll-results';

const rowStyles = {
  display: 'flex',
  justifyContent: 'space-between' as 'space-between'
};

const colStyles = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between' as 'space-between',
  height: '100%'
};

interface Props {
  selectedPresentation?: Presentation | null;
}
interface State {
  feedback: string[];
  ratings: number[];
}

class Summary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      feedback: [],
      ratings: []
    };

    api.getFeedbackRef().on('child_added', this.onFeedback.bind(this));
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
      <div style={colStyles}>
        <div style={{...rowStyles, height: '52.4%'}}>
          <div style={{width: '30.1%'}}>
            <RatingResults ratings={this.state.ratings} />
          </div>
          <div style={{width: '67.5%'}}>
            {
              this.props.selectedPresentation ?
              <ConfusionChart presentationId={this.props.selectedPresentation.id} confusionSlides={confusionSlides} /> :
              'No presentation was selected'
            }
          </div>
        </div>
        <div style={{...rowStyles, height: '44.5%'}}>
          <div style={{width: '36.2%'}}>
            <FeedbackResults feedback={this.state.feedback} />
          </div>
          <div style={{width: '60.9%'}}>
            <PollResultsSummary polls={pollResults} />
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
