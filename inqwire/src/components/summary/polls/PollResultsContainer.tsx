import * as React from 'react';

import PollResult from './PollResult';

import { PollResults } from '../../../models';

const containerStyles = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as 'column'
};

interface Props {
  polls: PollResults[];
}
interface State {
  currentPollIdx: number;
  expanded: boolean[];
}

class PollResultsContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.togglePoll = this.togglePoll.bind(this);
    this.state = {
      currentPollIdx: 0,
      expanded: Array(props.polls.length).fill(false)
    };
  }

  togglePoll(i: number) {
    const expanded = this.state.expanded.slice();
    expanded[i] = !expanded[i];
    this.setState({ expanded });
  }

  render() {
    return (
    <div style={containerStyles}>
      {
        this.props.polls.map((poll: PollResults, i: number) => <PollResult key={i}
                                                                           poll={poll}
                                                                           isExpanded={this.state.expanded[i]}
                                                                           togglePoll={() => this.togglePoll(i)} />)
      }
    </div>
    );
  }
}

export default PollResultsContainer;
