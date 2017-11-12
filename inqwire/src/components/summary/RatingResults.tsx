import * as React from 'react';

import RatingBreakdownBar from './RatingBreakdownBar';

// const ratingResultsSample = require('../../assets/rating-results.png');

const flexSpaceBetween = {
  display: 'flex',
  justifyContent: 'space-between' as 'space-between',
  flexDirection: 'column' as 'column'
};
const containerStyles = {
  width: '100%',
  height: '100%',
  padding: '6.2%',
  boxSizing: 'border-box',
  border: 'solid 1px black',
  ...flexSpaceBetween
};
const headerContainerStyles = {
  height: '29.8%',
  textAlign: 'center',
  ...flexSpaceBetween
};
const headerStyles = {
  fontSize: '20px',
  fontWeight: 'bold' as 'bold'
};
const averageRatingContainerStyles = {
  color: 'var(--lavender-blue)'
};
const averageRatingStyles = {
  fontSize: '100px',
  fontWeight: 'bold' as 'bold',
  lineHeight: '0.8',
  letterSpacing: '2.5px'
};
const averageRatingFooterStyles = {
  fontSize: '18px',
  lineHeight: '1.06',
  letterSpacing: '2.6px'
};
const dividerStyles = {
  height: '0.5%',
  backgroundColor: '#e7e7e7'
};
const breakdownContainerStyles = {
  height: '57%',
  ...flexSpaceBetween
};
const breakdownHeaderStyles = {
  fontSize: '14px',
  lineHeight: '1.36',
  letterSpacing: '2px'
};
interface Props {
  ratings: number[];
}
interface State {
  totalStudents: number;
  ratingBreakdowns: number[];
}

const ratingOpacities = [0.1, 0.23, 0.36, 0.73, 1];
const arrToAvg = (arr: number[]) => {
  return arr.length ? (arr.reduce( ( p, c ) => p + c, 0 ) / arr.length).toFixed(2) : '0.00';
};

class RatingResults extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      totalStudents: 0,
      ratingBreakdowns: Array(5).fill(0)
    };
  }

  componentWillReceiveProps(newProps: Props) {
    let newRatings: number[];
    if (newProps.ratings.length === this.state.totalStudents + 1) {
      const r = newProps.ratings[newProps.ratings.length - 1];
      newRatings = this.state.ratingBreakdowns.slice();
      newRatings[r - 1] += 1;
    } else {
      newRatings = Array(5).fill(0);
      for (const rating of newProps.ratings) {
        newRatings[rating - 1] += 1;
      }
    }

    this.setState({
      totalStudents: newProps.ratings.length,
      ratingBreakdowns: newRatings
    })
  }

  render() {
    return (
      <div style={containerStyles}>
        <div style={headerContainerStyles}>
          <div style={headerStyles}>Rating of Lecture</div>
          <div style={averageRatingContainerStyles}>
            <div style={averageRatingStyles}>{arrToAvg(this.props.ratings)}</div>
            <div style={averageRatingFooterStyles}>out of 5</div>
          </div>
        </div>
        <div style={dividerStyles} />
        <div style={breakdownContainerStyles}>
          <div style={breakdownHeaderStyles}>Rating Breakdown:</div>
          {
            this.state.ratingBreakdowns.map((numStudents: number, i: number) =>
              <RatingBreakdownBar key={i}
                                  opacity={ratingOpacities[i]}
                                  numStars={i + 1}
                                  numStudents={numStudents}
                                  totalStudents={this.state.totalStudents} />)
          }
        </div>
      </div>
    );
  }
}

export default RatingResults;
