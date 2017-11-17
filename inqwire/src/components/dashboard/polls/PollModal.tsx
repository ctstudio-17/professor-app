import * as React from 'react';

const containerStyles = {
  width: '65%',
  height: '65%',
  position: 'absolute' as 'absolute',
  top: '17.5%',
  left: '17.5%',
  zIndex: 2,
  backgroundColor: 'white',
  boxShadow: '2px 2px 4px 0 rgba(0, 0, 0, 0.5)',
  border: 'solid 1px #e4e4e4',
  padding: '30px',
  boxSizing: 'border-box'
};

class PollModal extends React.Component<{}, {}> {
  render() {
    return (
      <div style={containerStyles}>
        {this.props.children}
      </div>
    );
  }
}

export default PollModal;
