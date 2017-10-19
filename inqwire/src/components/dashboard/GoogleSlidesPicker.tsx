import * as React from 'react';
import * as GoogleApi from '../shared/GoogleApiInterface';

const containerStyles = {
  backgroundColor: 'var(--white)',
  textAlign: 'center',
  border: `solid 7px var(--lavender-blue)`,
  position: 'relative' as 'relative',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column' as 'column'
};
const rowStyles = {
  border: 'solid 1px #e7e7e7',
  backgroundColor: 'var(--white)',
  cursor: 'pointer',
  flex: '1 1 0'
};

interface Presentation {
  id: string;
  title: string;
}

interface Props {
  logOutGoogleAuth: any;
  selectPresentation: any;
}
interface State {
  currPage: number;
  presentations: Presentation[];
  nextPageToken: string;
}

class GoogleSlidesPicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    GoogleApi.getSlides('').then((response: any) => {
      this.setState({
        currPage: 1,
        presentations: response.result.files.map((pres: any) => ({id: pres.id, title: pres.name})),
        nextPageToken: response.result.nextPageToken
      });
    });

    this.state = {
      currPage: 0,
      presentations: [],
      nextPageToken: ''
    };
  }

  render() {
    return (
      <div style={containerStyles}>
        <div style={{...rowStyles, textAlign: 'right'}} onClick={this.props.logOutGoogleAuth}>Log Out</div>
        {this.state.presentations.map((pres: Presentation, i: number) => {
          return <div key={i} style={rowStyles} onClick={() => this.props.selectPresentation(pres.id)}>{pres.title}</div>;
        })}
      </div>
    );
  }
}

export default GoogleSlidesPicker;
