import * as React from 'react';

import ClosingQuestionsOverview from './ClosingQuestionsOverview';
import MetricOverview from './MetricOverview';

const icons = {
  bad: require('../../../assets/angry-face.svg'),
  med: require('../../../assets/weird-face.svg'),
  good: require('../../../assets/smiley-face.svg')
};

const containerStyles = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  width: '100%',
  height: '100%',
};
const ratingsOverviewContainerStyles = {
  borderRadius: '4px',
  border: 'solid 1px #e4e4e4',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column' as 'column'
};

interface Props {
  ratings: number[];
  // ratingBreakdowns: number[];
}

class ClosingQuestionsContainer extends React.Component<Props, {}> {
  render() {
    return (
      <div style={containerStyles}>
        <ClosingQuestionsOverview />

        <div style={ratingsOverviewContainerStyles}>
          {
            ['Lecture Engagement', 'Student Comprehension', 'Keeping Pace'].map((s: string, i: number, arr: string[]) => {
              return <MetricOverview key={i}
                                     icon={icons.bad}
                                     title={s}
                                     numStudents={3}
                                     isLast={i === arr.length - 1} />;
            })
          }
        </div>
      </div>
    );
  }
}

export default ClosingQuestionsContainer;
