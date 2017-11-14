import * as React from 'react';
import * as GoogleApi from './shared/GoogleApiInterface';
import api from '../firebase';

import Button from './shared/Button';
import CreatePoll from './dashboard/CreatePoll';
import ConfusedStudents from './dashboard/ConfusedStudents';
import EndLecture from './dashboard/EndLecture';
import GoogleSlidesPicker from './dashboard/GoogleSlidesPicker';
import PollResults from './dashboard/PollResults';
import PresentationViewer from './dashboard/PresentationViewer';

import { Poll, Presentation } from '../models';

const dashboardStyles = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as 'column'
};
const rowStyles = {
  display: 'flex',
  justifyContent: 'space-between' as 'space-between'
};
const pollContainerStyles = {
  width: '36.2%',
  padding: '2%',
  boxSizing: 'border-box',
  border: 'solid 1px black',
};
const colStyles = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between' as 'space-between',
  width: '62.4%'
};

interface Props {
  endLecture: any;
  selectPresentation: any;
  closePresentation: any;
  startTime?: Date;
  selectedPresentation: Presentation | undefined;
}
interface State {
  pollRunning: boolean;
  userAuthorized: boolean;
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.updateGoogleAuthStatus = this.updateGoogleAuthStatus.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.startPoll = this.startPoll.bind(this);

    this.state = {
      pollRunning: false,
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

  startPoll(poll: Poll) {
    const pollKey = api.createPoll({
      ...poll,
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
        <div style={{...rowStyles, height: '89.7%'}}>
          <div style={pollContainerStyles}>
            {this.state.pollRunning ? <PollResults /> : <CreatePoll startPoll={this.startPoll} />}
          </div>
          <div style={colStyles}>
            <div style={{height: '61.7%', }}>
              {
                this.state.userAuthorized ?
                  (this.props.selectedPresentation ?
                    <PresentationViewer presentation={this.props.selectedPresentation}
                                        closePresentation={this.props.closePresentation} /> :
                    <GoogleSlidesPicker logOutGoogleAuth={this.handleAuthClick} selectPresentation={this.props.selectPresentation} />) :
                  <Button height='10%'
                          backgroundColor='black'
                          textColor='white'
                          buttonText='Log In'
                          handleButtonClick={this.handleAuthClick} />
              }
            </div>
            <div style={{height: '18.5%'}}>
              <ConfusedStudents />
            </div>
            <div style={{height: '12.0%'}}>
              <EndLecture endLecture={this.props.endLecture} startTime={this.props.startTime} />
            </div>
          </div>
        </div>
        <div style={rowStyles} />
      </div>
    );
  }
}

export default Dashboard;
