import * as React from 'react';
import PollResultAnswer from './PollResultAnswer';

import { PollAnswer, PollResults } from '../../../models';

const containerStyles = {
  width: '100%',
  marginBottom: '20px'
};
const inModalHeader = {
  height: '20%',
  fontSize: '30px',
  fontWeight: 'bold' as 'bold',
  letterSpacing: '1px',
  padding: '0 3.1%',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center' as 'center',
  borderRadius: '4px',
  border: 'solid 1px #e4e4e4',
};
const headerStyles = {
  ...inModalHeader,
  cursor: 'pointer'
};
const arrowStyles = {
  height: '15px',
  width: '15px',
  border: 'solid 2px black',
  borderTop: 'none',
  borderLeft: 'none',
  transform: 'rotate(45deg)'
};
const openArrowStyles = {
  ...arrowStyles,
  transform: 'rotate(225deg)',
  borderColor: '#4f92ff'
};
const inModalBody = {
  padding: '3% 3.1%',
  boxSizing: 'border-box',
  border: 'solid 1px #e4e4e4',
  borderBottomLeftRadius: '4px',
  borderBottomRightRadius: '4px'
};
const bodyStyles = {
  padding: '40px 3.1%',
  boxSizing: 'border-box',
  border: 'solid 1px #e4e4e4',
  borderBottomLeftRadius: '4px',
  borderBottomRightRadius: '4px'
};

interface Props {
  poll: PollResults;
  isExpanded: boolean;
  togglePoll: any;
  inModal?: boolean;
}

class PollResult extends React.Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props) {
    return nextProps.inModal || this.props.isExpanded !== nextProps.isExpanded;
  }

  render() {
    const { inModal, isExpanded } = this.props;
    const hStyles = inModal ? inModalHeader : headerStyles;
    const totalResponses = this.props.poll.answers.reduce(
      (sum: number, answer: PollAnswer) => sum += answer.numStudentResponses, 0
    );
    const barWidths = this.props.poll.answers.map((answer: PollAnswer) => answer.numStudentResponses / totalResponses * 100);

    return (
      <div style={{...containerStyles, height: inModal ? '100%' : 'initial'}}>
        <div style={{
          ...hStyles,
          borderBottomLeftRadius: isExpanded ? 0 : 'initial', borderBottomRightRadius: isExpanded ? 0 : 'initial'
        }} onClick={this.props.togglePoll}>
          <span style={{color: isExpanded ? '#4f92ff' : 'black'}}>{this.props.poll.questionText}</span>
          {inModal ? '' : <div style={isExpanded ? openArrowStyles : arrowStyles} />}
        </div>

        {
          isExpanded ?
            <div style={inModal ? inModalBody : bodyStyles}>
              {
                this.props.poll.answers.map((answer: PollAnswer, i: number) =>
                  <PollResultAnswer withMargin={!inModal} answer={answer} barWidth={barWidths[i]} />
                )
              }
            </div> :
            ''
        }
      </div>
    );
  }
}

export default PollResult;
