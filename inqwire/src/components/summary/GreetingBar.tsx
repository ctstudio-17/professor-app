import * as React from 'react';

const containerStyles = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-evenly' as 'space-evenly',
  alignItems: 'center' as 'center',
  fontSize: '18px',
  letterSpacing: '0.6px'
};
const closeStyles = {
  cursor: 'pointer',
  position: 'absolute' as 'absolute',
  right: '13px',
  top: '13px'
};

interface Props {
  professorName: string;
  className: string;
  lectureDate: Date;
  close: any;
}

export class GreetingBar extends React.Component<Props, {}> {
  parseDate() {
    return this.props.lectureDate.toDateString();
  }

  render() {
    return (
      <div style={containerStyles}>
        <div style={closeStyles} onClick={this.props.close} >&#10006;</div>
        <div>Hey Professor {this.props.professorName}, the results are in!</div>
        <div>Here's how you did during your {this.props.className} lecture on {this.parseDate()}</div>
      </div>
    );
  }
}

export default GreetingBar;
