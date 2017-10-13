import * as React from 'react';

import './styles/Button.css';

interface Props {
  buttonText: string;
  handleButtonClick: any;
}

class Button extends React.Component<Props, {}> {
  render() {
    // const pollOptions = ['Q:', 'a)', 'b)', 'c)', 'd)'].map((s: string) => <div className='create-poll-option'>{s}</div>);

    return (
      <div className='button' onClick={this.props.handleButtonClick}>
        {this.props.buttonText}
      </div>
    );
  }
}

export default Button;
