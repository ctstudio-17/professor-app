import * as React from 'react';
import PollResultAnswer from './PollResultAnswer';

import { PollAnswer, PollResults } from '../../../models';

const containerStyles = {
  width: '100%',
  marginBottom: '20px'
};
const headerStyles = {
  height: '116px',
  borderRadius: '4px',
  border: 'solid 1px #e4e4e4',
  fontSize: '30px',
  fontWeight: 'bold' as 'bold',
  letterSpacing: '1px',
  padding: '0 3.1%',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center' as 'center',
  justifyContent: 'space-between' as 'space-between',
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
}
interface State {
  barWidths: number[];
}

class PollResult extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const totalResponses = props.poll.answers.reduce(
      (sum: number, answer: PollAnswer) => sum += answer.numStudentResponses, 0
    );
    this.state = {
      barWidths: props.poll.answers.map((answer: PollAnswer) => answer.numStudentResponses / totalResponses * 100)
    };
  }

  shouldComponentUpdate(nextProps: Props) {
    return this.props.isExpanded !== nextProps.isExpanded;
  }

  render() {
    const { isExpanded } = this.props;
    return (
      <div style={containerStyles}>
        <div style={{...headerStyles, borderBottomLeftRadius: isExpanded ? 0 : 'initial', borderBottomRightRadius: isExpanded ? 0 : 'initial'}} onClick={this.props.togglePoll} >
          <span style={{color: isExpanded ? '#4f92ff' : 'black'}}>{this.props.poll.questionText}</span>
          <div style={isExpanded ? openArrowStyles : arrowStyles} />
        </div>

        {
          isExpanded ?
            <div style={bodyStyles}>
              {
                this.props.poll.answers.map((answer: PollAnswer, i: number) =>
                  <PollResultAnswer answer={answer} barWidth={this.state.barWidths[i]} />
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
