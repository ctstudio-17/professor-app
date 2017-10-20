import * as React from 'react';

import SummaryCardHeader from './SummaryCardHeader';

const containerStyles = {
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  border: 'solid 1px black',
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between' as 'space-between'
};
const feedbackListStyles = {
  height: '74.8%',
  overflowX: 'hidden' as 'hidden',
  overflowY: 'auto' as 'auto'
};
const feedbackRowStyles = {
  padding: '6.3%',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center' as 'center',
  borderBottom: 'solid 1px rgba(151, 151, 151, 0.24)',
  fontSize: '18px',
  fontWeight: 'lighter' as 'lighter',
  lineHeight: 1.39
};
const viewAllButtonStyles = {
  ...feedbackRowStyles,
  height: '14%',
  fontSize: '16px',
  fontWeight: 'bold' as 'bold',
  alignSelf: 'center' as 'center',
  cursor: 'pointer'
};

interface Props {
  feedback: string[];
}

class FeedbackResults extends React.Component<Props, {}> {
  render() {
    return (
    <div style={containerStyles}>
      <div style={{height: '11.2%'}}>
        <SummaryCardHeader title='Student Feedback' />
      </div>

      <div style={feedbackListStyles}>
        {
          this.props.feedback.map((feedback: string, i: number) => {
            return <div key={i} style={feedbackRowStyles}>{feedback}</div>;
          })
        }
      </div>

      <div style={viewAllButtonStyles}>VIEW ALL</div>
    </div>
    );
  }
}

export default FeedbackResults;
