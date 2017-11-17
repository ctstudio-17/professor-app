import * as React from 'react';

import ClosingQuestionsOverview from './ClosingQuestionsOverview';
import MetricOverview from './MetricOverview';

const icons = [
  require('../../../assets/bad_engagement.png'),
  require('../../../assets/med_engagement.png'),
  require('../../../assets/good_engagement.png'),
  require('../../../assets/bad_understanding.png'),
  require('../../../assets/med_understanding.png'),
  require('../../../assets/good_understanding.png'),
  require('../../../assets/slow_pace.png'),
  require('../../../assets/good_pace.png'),
  require('../../../assets/fast_pace.png'),
];

const texts = [
  <span>Students were not <b>engaged</b> in this lecture.</span>,
  <span>Students were moderately engaged in this lecture.</span>,
  <span>Students were <b>engaged</b> in this lecture.</span>,
  <span>Students did not understand in this lecture.</span>,
  <span>Students had an OK understaning.</span>,
  <span>Students had a good understanding in this lecture.</span>,
  <span>Students found this lecture to be too fast.</span>,
  <span>Students found this lecture to have a good pace.</span>,
  <span>Students found this lecture to be too slow</span>
];

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
  levels: number[];
}

class ClosingQuestionsContainer extends React.Component<Props, {}> {
  render() {
    return (
      <div style={containerStyles}>
        <ClosingQuestionsOverview />

        <div style={ratingsOverviewContainerStyles}>
          {
            ['Lecture Engagement', 'Lecture Understanding', 'Lecture Pace'].map((s: string, i: number, arr: string[]) => {
              return <MetricOverview key={i}
                                     icon={icons[i * 3 + this.props.levels[i]]}
                                     text={texts[i * 3 + this.props.levels[i]]}
                                     title={s}
                                     isLast={i === arr.length - 1} />;
            })
          }
        </div>
      </div>
    );
  }
}

export default ClosingQuestionsContainer;
