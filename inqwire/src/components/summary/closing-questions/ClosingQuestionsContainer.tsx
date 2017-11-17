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
  <span>Students were <b>not engaged</b> in this lecture.</span>,
  <span>Students were <b>moderately engaged</b> in this lecture.</span>,
  <span>Students were <b>engaged</b> in this lecture.</span>,
  <span>Students had a <b>bad understanding</b> of this lecture.</span>,
  <span>Students had an <b>OK understaning</b> of this lecture.</span>,
  <span>Students had a <b>good understanding</b> of this lecture.</span>,
  <span>Students found this lecture to be <b>too slow</b>.</span>,
  <span>Students found this lecture to have a <b>good pace</b>.</span>,
  <span>Students found this lecture to be <b>too fast</b>.</span>
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
