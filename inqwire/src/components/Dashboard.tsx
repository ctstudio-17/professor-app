import * as React from 'react';
import * as GoogleApi from './shared/GoogleApiInterface';

import Button from './shared/Button';
import CreatePoll from './dashboard/CreatePoll';
import ConfusedStudents from './dashboard/ConfusedStudents';
import EndLecture from './dashboard/EndLecture';
import GoogleSlidesPicker from './dashboard/GoogleSlidesPicker';
import PollResults from './dashboard/PollResults';
import PresentationViewer from './dashboard/PresentationViewer';

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
  endLecture: Function;
}
interface State {
  pollRunning: boolean;
  selectedPresentationId: string;
  userAuthorized: boolean;
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.updateGoogleAuthStatus = this.updateGoogleAuthStatus.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.selectPresentation = this.selectPresentation.bind(this);
    this.startPoll = this.startPoll.bind(this);

    this.state = {
      pollRunning: false,
      selectedPresentationId: '',
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

  selectPresentation(id: string) {
    this.setState({selectedPresentationId: id});
    console.log(id);
  }

  startPoll() {
    this.setState({pollRunning: true});
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
                  (this.state.selectedPresentationId ?
                    <PresentationViewer presentationId={this.state.selectedPresentationId} /> :
                    <GoogleSlidesPicker logOutGoogleAuth={this.handleAuthClick} selectPresentation={this.selectPresentation} />) :
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
              <EndLecture endLecture={this.props.endLecture} />
            </div>
          </div>
        </div>
        <div style={rowStyles} />
      </div>
    );
  }
}

export default Dashboard;
