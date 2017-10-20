import * as React from 'react';

const starIcon = require('../../assets/star-icon.svg');
const containerStyles = {
  height: '13%',
  border: 'solid 1px #e7e7e7',
  display: 'flex',
  position: 'relative' as 'relative'
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
const tooltipStyles = {
  position: 'absolute' as 'absolute',
  left: '50%',
  top: '-140%',
  padding: '6.5px',
  borderRadius: '4px',
  backgroundColor: '#acabf6',
  boxShadow: '-2px 0 6px 0 #bcbcf8',
  color: 'white',
  fontSize: '14px',
  letterSpacing: '0.9px'
};
const tooltipArrowStyles = {
  position: 'absolute' as 'absolute',
  top: '75%',
  left: '43%',
  width: '14%',
  height: '42%',
  transform: 'rotate(45deg)',
  backgroundColor: 'inherit'
};

interface Props {
  opacity: number;
  numStars: number;
  numStudents: number;
  totalStudents: number;
}
interface State {
  barWidth: string;
  showTooltip: boolean;
}

class RatingBreakdownBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      barWidth: this.calculateWidth(this.props.numStudents, this.props.totalStudents),
      showTooltip: false
    };
  }

  calculateWidth(numStudents: number, totalStudents: number) {
    return (numStudents / totalStudents * 100)  + '%';
  }

  componentWillReceiveProps(nextProps: Props, nextContext: any) {
    if (nextProps.numStudents !== this.props.numStudents || nextProps.totalStudents !== this.props.totalStudents) {
      this.setState({barWidth: this.calculateWidth(nextProps.numStudents, nextProps.totalStudents)});
    }
  }

  toggleTooltip(toShow: boolean) {
    this.setState({showTooltip: toShow});
  }

  render() {
    return (
      <div style={containerStyles} onMouseEnter={this.toggleTooltip.bind(this, true)} onMouseLeave={this.toggleTooltip.bind(this, false)}>
        <div style={starContainerStyles}>
          <img src={starIcon} height='42.9%' />
          <div>{this.props.numStars}</div>
        </div>
        <div style={dividerStyles} />
        <div style={barContainerStyles}>
          {/* TODO: animate this transition */}
          <div style={{...barStyles, opacity: this.props.opacity, width: this.state.barWidth}} />
        </div>

        {
          this.state.showTooltip ?
            <div style={tooltipStyles}>
              <div style={tooltipArrowStyles} />
              {this.props.numStudents} {this.props.numStudents === 1 ? 'student' : 'students'}
            </div> :
            ''
        }
      </div>
    );
  }
}

export default RatingBreakdownBar;
