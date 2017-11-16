import * as React from 'react';

const containerStyles = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as 'column'
};
const titleStyles = {
  marginBottom: '20px',
  fontSize: '25px',
  fontWeight: 'bold' as 'bold',
  letterSpacing: '0.9px'
};
const iconStyles = {
  width: '25px',
  height: '25px',
  verticalAlign: 'text-top'
};

interface Props {
  title: string;
  icon: any;
  width: string;
}

class SummarySection extends React.Component<Props, {}> {
  render() {
    return (
      <div style={{...containerStyles, width: this.props.width}}>
        <div style={titleStyles}>{this.props.title} <img style={iconStyles} src={this.props.icon} /></div>
        {this.props.children}
      </div>
    );
  }
}

export default SummarySection;
