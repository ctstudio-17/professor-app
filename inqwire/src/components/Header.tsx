import * as React from 'react';

const headerStyles = {
  width: '100%',
  height: '100%',
  padding: '0 1.5%',
  boxSizing: 'border-box',
  backgroundColor: 'var(--white)',
  boxShadow: '0 2px 11px 0 rgba(190, 190, 190, 0.63)',
  display: 'flex',
  alignItems: 'center' as 'center',
  justifyContent: 'space-between' as 'space-between'
};
const linkContainerStyles = {
  display: 'flex',
  alignItems: 'center' as 'center',
  justifyContent: 'space-between' as 'space-between',

  fontSize: '12px',
  fontWeight: 'bold' as 'bold',
  letterSpacing: '0.5px',
  color: '#b3b3b3'
};
const titleStyles = {
  fontSize: '27px',
  letterSpacing: '2px',
  color: 'black'
};
const linkStyles = {
  cursor: 'pointer'
};

interface Props {
  currPage: string;
  setPage: any;
}

class Header extends React.Component<Props, {}> {
  render() {
    return (
      <div style={headerStyles}>
        <div style={{...linkContainerStyles, width: '12.1%'}}>
          <div style={{...linkStyles, color: this.props.currPage  === 'classes' ? 'black' : 'inherit'}}
               onClick={() => this.props.setPage('classes')}>
            HOME
          </div>
          <div style={{...linkStyles, color: this.props.currPage  === 'dashboard' ? 'black' : 'inherit'}}>
            DASHBOARD
          </div>
        </div>

        <div style={titleStyles}>inQwire</div>

        <div style={{...linkContainerStyles, width: '10.4%'}}>
          <div style={linkStyles}>ACCOUNT</div>
          <div style={linkStyles}>LOG OUT</div>
        </div>
      </div>
    );
  }
}

export default Header;
