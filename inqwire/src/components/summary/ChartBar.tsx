import * as React from 'react';

const containerStyles = {
  width: '8.9%',
  backgroundColor: 'var(--pale-lilac)',
  position: 'relative' as 'relative'
};
const activeContainerStyles = {
  ...containerStyles,
  backgroundColor: 'var(--lavender-blue)'
};
const tooltipStyles = {
  position: 'absolute' as 'absolute',
  top: '-46px',
  left: '25%',
  width: '50%',
  height: '35px',
  backgroundColor: 'var(--lavender-blue)',
  boxShadow: '-2px 0 11px 0 var(--pale-lilac)',
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
        {
          this.state.showTooltip ?
          <div style={tooltipStyles}>
            {this.props.numStudents}
            <div style={tooltipArrowStyles} />
          </div> :
          ''
        }
      </div>
    );
  }
}

export default ChartBar;
