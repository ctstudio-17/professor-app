import * as React from 'react';
import * as GoogleApi from './shared/GoogleApiInterface';
import api from '../firebase';

import PresentationViewerContainer from './dashboard/presentation/PresentationViewerContainer';
import NextSlide from './dashboard/presentation/NextSlide';
import ConfusedStudents from './dashboard/ConfusedStudents';
import PollsCard from './dashboard/polls/PollsCard';
import CheckUnderstanding from './dashboard/polls/CheckUnderstanding';
import CreatePoll from './dashboard/polls/CreatePoll';

// import PollResults from './dashboard/PollResults';

import { Poll, Presentation, Slide } from '../models';

const dashboardStyles = {
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between' as 'space-between',
  backgroundColor: 'rgba(255, 255, 255, 0.3)'
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
  pollModalOpen: boolean;
  pollRunning: boolean;
  userAuthorized: boolean;
  currentSlide: number;
  slides: Slide[];
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.updateGoogleAuthStatus = this.updateGoogleAuthStatus.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.startPoll = this.startPoll.bind(this);
    this.openPollModal = this.openPollModal.bind(this);
    this.setSlides = this.setSlides.bind(this);
    this.updateSlideThumbnail = this.updateSlideThumbnail.bind(this);
    this.updateSlide = this.updateSlide.bind(this);

    this.state = {
      pollModalOpen: false,
      pollRunning: false,
      currentSlide: -1,
      slides: props.selectedPresentation ? props.selectedPresentation.slides : [],
      userAuthorized: false
    };
  }

  componentDidMount() {
    GoogleApi.setupApi(this.updateGoogleAuthStatus);
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

  openPollModal() {
    this.setState({ pollModalOpen: true });
  }

  startPoll(poll: Poll) {
    const pollKey = api.createPoll({
      ...poll,
      isActive: true,
      responses: []
    }).key;
    this.setState({pollRunning: true});
    api.getPollResponseRef(pollKey).on('child_added', this.onPollResponse.bind(this));
  }

  onPollResponse(snapshot: any) {
    console.log(snapshot.val());
  }

  render() {
    return (
      <div style={dashboardStyles}>
        {
          this.state.pollModalOpen ?
            <CreatePoll startPoll={this.startPoll} /> :
            ''
        }
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
          <div style={{...sectionStyles, height: '40.3%'}} />
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
            <ConfusedStudents currentSlide={this.state.currentSlide} />
          </div>

          <div style={{...sectionStyles, height: '17.9%'}}>
            <PollsCard openPoll={this.openPollModal} />
          </div>

          <div style={{...sectionStyles, height: '11.1%'}}>
            <CheckUnderstanding startPoll={this.startPoll} />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
