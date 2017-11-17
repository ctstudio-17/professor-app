import * as React from 'react';
import * as GoogleApi from './shared/GoogleApiInterface';
import api from '../firebase';

import PresentationViewerContainer from './dashboard/presentation/PresentationViewerContainer';
import ConfusionComments from './dashboard/ConfusionComments';
import NextSlide from './dashboard/presentation/NextSlide';
import ConfusedStudents from './dashboard/ConfusedStudents';
import PollsCard from './dashboard/polls/PollsCard';
import CheckUnderstanding from './dashboard/polls/CheckUnderstanding';
import PollModal from './dashboard/polls/PollModal';
import CreatePoll from './dashboard/polls/CreatePoll';
import PollResult from './summary/polls/PollResult';

import { Confusion, Poll, PollResults, Presentation, Slide } from '../models';

const ReactCountdownClock = require('react-countdown-clock');

const dashboardStyles = {
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between' as 'space-between',
  backgroundColor: 'rgba(255, 255, 255, 0.3)'
};
const darkScreen = {
  position: 'absolute' as 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'black',
  zIndex: 1,
  opacity: 0.75
};
const colStyles = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between' as 'space-between'
};
const col1Styles = {
  ...colStyles,
  width: '63.1%'
};
const col2Styles = {
  ...colStyles,
  width: '36.7%',
  backgroundColor: '#1f1e1e',
  padding: '40px',
  boxSizing: 'border-box'
};
const sectionStyles = {
  backgroundColor: '#1f1e1e',
  display: 'flex',
  justifyContent: 'center' as 'center',
  alignItems: 'center' as 'center',
  width: '100%'
};
const currentSlideSectionStyles = {
  ...sectionStyles,
  height: '59.4%',
};

interface Props {
  endLecture: any;
  selectPresentation: any;
  closePresentation: any;
  startTime?: Date;
  selectedPresentation?: Presentation;
}
interface State {
  currentPollResults?: PollResults;
  pollModalOpen: boolean;
  pollRunning: boolean;
  pollEndSeconds?: number;
  userAuthorized: boolean;
  currentSlide: number;
  slides: Slide[];
  confusions: Confusion[];
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.updateGoogleAuthStatus = this.updateGoogleAuthStatus.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.startPoll = this.startPoll.bind(this);
    this.openPollModal = this.openPollModal.bind(this);
    this.closePollModal = this.closePollModal.bind(this);
    this.setSlides = this.setSlides.bind(this);
    this.updateSlideThumbnail = this.updateSlideThumbnail.bind(this);
    this.updateSlide = this.updateSlide.bind(this);

    this.state = {
      pollModalOpen: false,
      pollRunning: false,
      currentSlide: -1,
      slides: props.selectedPresentation ? props.selectedPresentation.slides : [],
      userAuthorized: false,
      confusions: []
    };
  }

  componentDidMount() {
    GoogleApi.setupApi(this.updateGoogleAuthStatus);
    this.initConfusions();
  }

  initConfusions() {
    const confusionsRef = api.getConfusionRef();
    confusionsRef.on('child_added', (snapshot: any) => {
      const confusion = snapshot.val();
      const confusions = this.state.confusions.slice();
      confusions.push({
        student: confusion.student,
        timestamp: new Date(confusion.timestamp * 1000),
        slideNumber: confusion.slide_number,
        comment: confusion.comment
      });
      this.setState({ confusions });
    });
  }

  updateGoogleAuthStatus(isSignedIn: boolean) {
    if (isSignedIn) {
      this.setState({userAuthorized: true});
    } else {
      this.setState({userAuthorized: false});
    }
  }

  handleAuthClick() {
    if (this.state.userAuthorized) {
      GoogleApi.signOut();
    } else {
      GoogleApi.signIn();
    }
  }

  setSlides(slides: Slide[]) {
    this.setState({ slides });
    api.setSlides(slides);
  }

  updateSlideThumbnail(i: number, url: string) {
    this.state.slides[i].thumbnailUrl = url;
    api.setSlideThumbnail(i, url);
  }

  updateSlide(page: number) {
    this.setState({ currentSlide: page });
  }

  openPollModal(e: MouseEvent) {
    e.stopPropagation();
    this.setState({ pollModalOpen: true });
  }

  closePollModal() {
    this.setState({ pollModalOpen: false });
  }

  closePoll(pollKey: string) {
    api.closePoll(pollKey);
    this.setState({
      pollRunning: false
    });
  }

  startPoll(poll: Poll, e: MouseEvent) {
    e.stopPropagation();
    const pollKey = api.createPoll({
      ...poll,
      isActive: true,
      responses: []
    }).key;

    this.setState({
      currentPollResults: {
        questionText: poll.questionText,
        answers: poll.answers.map((answerText: string, i: number) => {
          return {
            answerText,
            isCorrect: poll.correctAns[i],
            numStudentResponses: 0
          };
        })
      },
      pollModalOpen: true,
      pollRunning: true,
      pollEndSeconds: parseInt(String(new Date().getTime() / 1000), 10) + (poll.pollTime * 60)
    });

    setTimeout(() => this.closePoll(pollKey), poll.pollTime * 60 * 1000);
    api.getPollResponseRef(pollKey).on('child_added', this.onPollResponse.bind(this));
  }

  onPollResponse(snapshot: any) {
    if (this.state.currentPollResults) {
      const res = snapshot.val();
      const currentPollResults = this.state.currentPollResults;
      currentPollResults.answers[res].numStudentResponses++;
      this.setState({ currentPollResults });
    }
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        {
          this.state.pollModalOpen ?
            <PollModal>
              {
                this.state.pollRunning && this.state.currentPollResults && this.state.pollEndSeconds ?
                  <div style={{position: 'relative', height: '100%', width: '100%'}}>
                    <PollResult poll={this.state.currentPollResults}
                                isExpanded={true}
                                togglePoll={() => {}}
                                inModal={true} />
                    <div style={{position: 'absolute', right: 0, bottom: 0, height: '100px', width: '100px'}}>
                      <ReactCountdownClock seconds={this.state.pollEndSeconds - parseInt(String(new Date().getTime() / 1000), 10)}
                                          color='rgb(79, 146, 255'
                                          alpha={0.9}
                                          size={100}
                                          fontSize='18px'
                                          font='Rubik, sans-serif'
                                          showMilliseconds={false} />
                    </div>
                  </div> :
                  <CreatePoll startPoll={this.startPoll} />
              }
            </PollModal> :
            ''
        }
        <div style={dashboardStyles} onClick={this.closePollModal} >
          {this.state.pollModalOpen ? <div style={darkScreen} /> : ''}

          <div style={col1Styles}>
            <div style={currentSlideSectionStyles}>
              <PresentationViewerContainer selectedPresentation={this.props.selectedPresentation}
                                          currentSlide={this.state.currentSlide}
                                          gUserAuthorized={this.state.userAuthorized}
                                          startTime={this.props.startTime}
                                          slides={this.state.slides}
                                          selectPresentation={this.props.selectPresentation}
                                          closePresentation={this.props.closePresentation}
                                          setSlides={this.setSlides}
                                          updateSlideThumbnail={this.updateSlideThumbnail}
                                          updateSlide={this.updateSlide}
                                          handleAuthClick={this.handleAuthClick}
                                          endLecture={this.props.endLecture} />
            </div>

            <div style={{...sectionStyles, height: '40.3%'}}>
              <ConfusionComments confusionComments={this.state.confusions
                .filter((confusion: Confusion) => confusion.comment)
                .map((confusion: Confusion) => confusion.comment)
                .reverse()} />
            </div>
          </div>

          <div style={col2Styles}>
            <div style={{...sectionStyles, height: '27.2%'}}>
            {
              this.props.selectedPresentation ?
                <NextSlide slideSrc={this.state.slides && this.state.currentSlide >= 0 && this.state.currentSlide < this.state.slides.length - 1 ? this.state.slides[this.state.currentSlide + 1].thumbnailUrl : 'last'} /> :
                ''
            }
            </div>

            <div style={{...sectionStyles, height: '17.9%'}}>
              <ConfusedStudents currentSlide={this.state.currentSlide} confusions={this.state.confusions} />
            </div>

            <div style={{...sectionStyles, height: '17.9%'}}>
              <PollsCard openPoll={this.openPollModal} />
            </div>

            <div style={{...sectionStyles, height: '11.1%'}}>
              <CheckUnderstanding startPoll={this.startPoll} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
