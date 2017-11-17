import * as React from 'react';

const containerStyles = {
  borderBottom: 'solid 1px #e4e4e4',
  padding: '38px 0px',
  flexGrow: 1,
  display: 'flex'
};
const iconStyles = {
  height: '34px',
  margin: '4% 7.5%',
};
const textStyles = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between' as 'space-between'
};
const labelStyles = {
  fontSize: '16px'
};
const numStudentsStyles = {
  fontSize: '16',
  fontWeight: 'lighter' as 'lighter'
};

interface Props {
  icon: string;
  title: string;
  text: string;
  isLast: boolean;
}

class MetricOverview extends React.Component<Props, {}> {
  render() {
    return (
      <div style={{...containerStyles, borderBottom: this.props.isLast ? 'none' : containerStyles.borderBottom}}>
        <img src={this.props.icon} style={iconStyles} />
        <div style={textStyles}>
          <div style={labelStyles}>{this.props.title}</div>
          <div style={numStudentsStyles}>{this.props.text}</div>
        </div>
      </div>
    );
  }
}

export default MetricOverview;
