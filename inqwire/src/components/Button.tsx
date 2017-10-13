import * as React from 'react';

const buttonStyles = {
  display: 'flex',
  alignItems: 'center' as 'center',
  justifyContent: 'space-around' as 'space-around',
  width: '100%',
  borderRadius: '4px',
  fontSize: '16px',
  letterSpacing: '2px',
  cursor: 'pointer'
};

interface Props {
  height: string;
  backgroundColor: string;
  textColor: string;
  buttonText: string;
  handleButtonClick: any;
}

class Button extends React.Component<Props, {}> {
  render() {
    return (
      <div style={{
          ...buttonStyles,
          height: this.props.height,
          backgroundColor: this.props.backgroundColor,
          color: this.props.textColor}}
          onClick={this.props.handleButtonClick}>
        {this.props.buttonText}
      </div>
    );
  }
}

export default Button;
