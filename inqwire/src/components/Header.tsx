import * as React from 'react';

const headerStyles = {
  width: '100%',
  height: '100%',
  backgroundColor: 'var(--white)',
  boxShadow: '0 2px 11px 0 rgba(190, 190, 190, 0.63)',
  display: 'flex',
  alignItems: 'center' as 'center',
  justifyContent: 'space-between' as 'space-between'
};
const titleStyles = {
  fontSize: '25px',
  fontWeight: 'bold' as 'bold',
  marginLeft: '1.5%'
};
const imgContainerStyles = {
  marginRight: '1.5%'
};
const profAvatar = require('../assets/professor_icon.svg');

class Header extends React.Component<{}, {}> {
  render() {
    return (
      <div id='header' style={headerStyles}>
        <div style={titleStyles}>inQwire</div>
        <div style={imgContainerStyles}>
          <img src={profAvatar} />
        </div>
      </div>
    );
  }
}

export default Header;
