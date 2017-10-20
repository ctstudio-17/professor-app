import * as React from 'react';

const containerStyles = {
  width: '100%',
  height: '100%',
  paddingLeft: '35px',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center' as 'center',
  backgroundColor: '#d2d2d2',
  fontSize: '18px',
  letterSpacing: '2.3px',
  color: 'black'
};

interface Props {
  title: string;
}

class SummaryCardHeader extends React.Component<Props, {}> {
  render() {
    return (
      <div style={containerStyles}>
        <div>{this.props.title}</div>
      </div>
    );
  }
}

export default SummaryCardHeader;
