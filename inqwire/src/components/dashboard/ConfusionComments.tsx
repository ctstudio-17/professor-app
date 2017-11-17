import * as React from 'react';

const containerStyles = {
  width: '100%',
  height: '100%',
  fontSize: '14px',
  letterSpacing: '0.9px',
  color: 'white',
  padding: '20px 40px',
  boxSizing: 'border-box',
  overflow: 'auto' as 'auto'
};
const titleStyles = {

};

interface Props {
  confusionComments: string[];
}

class ConfusedStudents extends React.Component<Props, {}> {
  render() {
    return (
      <div style={containerStyles}>
        <div style={titleStyles}>Student Confusion:</div>

        <ul style={{padding: '0', listStylePosition: 'inside'}}>
        {
          this.props.confusionComments.map((comment: string, i: number) => <li key={i} style={{marginBottom: '10px'}}>{comment}</li>)
        }
        </ul>
      </div>
    );
  }
}

export default ConfusedStudents;
