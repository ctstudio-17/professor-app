import * as React from 'react';
import api from '../firebase';

import LectureCard from './lectures/LectureCard';
import NewLectureCard from './lectures/NewLectureCard';

import { Lecture } from '../models';

const containerStyles = {
  height: '100%',
  display: 'flex',
  justifyContent: 'space-evenly' as 'space-evenly',
  alignContent: 'space-evenly' as 'inherit',
  flexWrap: 'wrap' as 'wrap'
};

interface Props {
  selectLecture: any;
  startLecture: any;
}
interface State {
  lectures: Lecture[];
}

class Classes extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      lectures: []
    };
  }

  componentDidMount() {
    api.getAllLectures().once('value', (snapshot: any) => {
      const res = snapshot.val();
      const lectures = [];
      if (res) {
        for (const id in res) {
          if (res.hasOwnProperty(id)) {
            const l = res[id];
            lectures.push({
              id,
              inProgress: l.in_progress,
              startTime: new Date(l.start_time * 1000),
              endTime: l.end_time ? new Date(l.end_time * 1000) : undefined,
              presentation: l.presentation
            });
          }
        }
        this.setState({ lectures });
      }
    });
  }

  render() {
    return (
      <div style={containerStyles}>
        {
          this.state.lectures.map((lecture: Lecture, i: number) => <LectureCard inProgress={lecture.inProgress}
                                                                                startTime={lecture.startTime}
                                                                                endTime={lecture.endTime}
                                                                                selectLecture={() => this.props.selectLecture(lecture)}
                                                                                key={i} />)
        }
        <NewLectureCard startLecture={this.props.startLecture} />
      </div>
    );
  }
}

export default Classes;
