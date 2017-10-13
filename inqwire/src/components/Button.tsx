import * as React from 'react';

import './styles/Button.css';

interface Props {
  buttonText: string;
  handleButtonClick: any;
}

class Button extends React.Component<Props, {}> {
  render() {
    return (
      <div className='button' onClick={this.props.handleButtonClick}>
        {this.props.buttonText}
      </div>
    );
  }
}

export default Button;
