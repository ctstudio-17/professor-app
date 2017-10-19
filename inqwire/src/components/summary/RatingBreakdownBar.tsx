import * as React from 'react';

const starIcon = require('../../assets/star-icon.svg');
const containerStyles = {
  height: '13%',
  border: 'solid 1px #e7e7e7',
  display: 'flex'
};
const starContainerStyles = {
  width: '11.2%',
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'center' as 'center',
  alignItems: 'center' as 'center',
  fontSize: '11px',
  fontWeight: 'bold' as 'bold',
  color: 'var(--lavender-blue)'
};
const dividerStyles = {
  width: '0.8%',
  backgroundColor: '#e7e7e7'
};
const barContainerStyles = {
  width: '88%',
  borderLeft: 'solid 0.8% #e7e7e7'
};
const barStyles = {
  height: '100%',
  backgroundColor: 'var(--lavender-blue)'
};

interface Props {
  opacity: number;
  numStars: number;
  numStudents: number;
  totalStudents: number;
}

class RatingBreakdownBar extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={containerStyles}>
        <div style={starContainerStyles}>
          <img src={starIcon} height='42.9%' />
          <div>{this.props.numStars}</div>
        </div>
        <div style={dividerStyles} />
        <div style={barContainerStyles}>
          {/* TODO: animate this transition */}
          {<div style={{...barStyles, opacity: this.props.opacity, width: (this.props.numStudents / this.props.totalStudents * 100) + '%'}} />}
        </div>
      </div>
    );
  }
}

export default RatingBreakdownBar;
