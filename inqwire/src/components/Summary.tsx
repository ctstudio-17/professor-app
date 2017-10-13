import * as React from 'react';

import RatingResults from './RatingResults';

const summaryStyles = {
  padding: '1.5%',
  height: '91.8%',
  display: 'flex',
  flexDirection: 'column' as 'column'
};
const rowStyles = {
  display: 'flex',
  justifyContent: 'space-between' as 'space-between'
};

class Summary extends React.Component<{}, {}> {
  render() {
    return (
      <div style={rowStyles}>
        <div style={summaryStyles}>
          <RatingResults />
        </div>
      </div>
    );
  }
}

export default Summary;
