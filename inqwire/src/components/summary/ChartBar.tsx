import * as React from 'react';

const containerStyles = {
  width: '8.9%',
  opacity: 0.21,
  position: 'relative' as 'relative',
  display: 'flex',
  flexDirection: 'column' as 'column'
};
const activeContainerStyles = {
  ...containerStyles,
  opacity: 0.68
};
const topBarStyles = {
  height: '3px',
  marginBottom: '2px',
  borderRadius: '1.5px',
  backgroundColor: '#4f92ff'
};
const barStyles = {
  flexGrow: 1,
  background: 'linear-gradient(to bottom, #317bf2, #cadeff)',
};
const tooltipStyles = {
  position: 'absolute' as 'absolute',
  top: '-46px',
  left: '25%',
  width: '50%',
  height: '35px',
  backgroundColor: '#4f92ff',
  boxShadow: '-2px 0 11px 0 rgba(79, 146, 255, 0.36)',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center' as 'center',
  justifyContent: 'center' as 'center',
  fontSize: '14px',
  letterSpacing: '0.9px',
  color: 'white'
};
const tooltipArrowStyles = {
  position: 'absolute' as 'absolute',
  top: '82%',
  left: '39%',
  width: '25%',
  height: '25%',
  transform: 'rotate(45deg)',
  backgroundColor: 'inherit'
};

interface Props {
  numStudents: number;
  height: string;
}
interface State {
  showTooltip: boolean;
}

export class ChartBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.state = {
      showTooltip: false
    };
  }

  toggleTooltip() {
    this.setState({showTooltip: !this.state.showTooltip});
  }

  render() {
    const thisContainerStyles = this.state.showTooltip ? activeContainerStyles : containerStyles;
    return (
      <div style={{...thisContainerStyles, height: this.props.height}}
           onMouseEnter={this.toggleTooltip}
           onMouseLeave={this.toggleTooltip}
      >
        <div style={topBarStyles}></div>
        <div style={barStyles}>
          {
            this.state.showTooltip ?
            <div style={tooltipStyles}>
              {this.props.numStudents}
              <div style={tooltipArrowStyles} />
            </div> :
            ''
          }
        </div>
      </div>
    );
  }
}

export default ChartBar;
