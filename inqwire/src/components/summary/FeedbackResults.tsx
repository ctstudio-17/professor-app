import * as React from 'react';

const nerdIcon = require('../../assets/nerd.svg');

const containerStyles = {
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'space-between' as 'space-between'
};
const boxStyles = {
  border: 'solid 1px #e4e4e4',
  borderRadius: '4px'
};
const boxOneStyles = {
  ...boxStyles,
  width: '25.5%',
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'center' as 'center'
};
const nerdContainerStyles = {
  height: '140px',
  width: '140px',
  margin: '118px 0 40px 0',
  display: 'flex',
  alignItems: 'center' as 'center',
  justifyContent: 'center' as 'center',
  backgroundColor: '#fff0bb',
  border: 'solid 1px #ffe279',
  borderRadius: '50%'
};
const titleTextStyles = {
  marginBottom: '10px',
  fontSize: '30px',
  fontWeight: 'bold' as 'bold',
  letterSpacing: '1px'
};

interface Props {
  feedback: string[];
}

class FeedbackResults extends React.Component<Props, {}> {
  render() {
    return (
    <div style={containerStyles}>
      <div style={boxOneStyles}>
        <div style={nerdContainerStyles}>
          <img src={nerdIcon} style={{height: '50%', width: '50%'}} />
        </div>
        <div style={{textAlign: 'center', margin: '0 9.7%'}}>
          <div style={titleTextStyles}>{this.props.feedback.length} students</div>
          <div style={{fontSize: '20px', lineHeight: 1.3}}>left feedback about your lecture</div>
        </div>
      </div>

      <div style={{...boxStyles, width: '71.2%', padding: '20px'}}>
        <ul id='feedback-list'>
          {
            this.props.feedback.map((s: string, i: number) => s ? <li key={i}><div style={{display: 'inline-block', height: '8px', width: '8px', borderRadius: '50%', backgroundColor: '#cecece', marginRight: '15px'}}></div>{s}</li> : '')
          }
        </ul>
      </div>
    </div>
    );
  }
}

export default FeedbackResults;
