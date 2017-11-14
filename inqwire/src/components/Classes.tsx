import * as React from 'react';
import api from '../firebase';

import ClassCard from './classes/ClassCard';

import { Class } from '../models';

const containerStyles = {
  height: '100%',
  display: 'flex',
  justifyContent: 'space-evenly' as 'space-evenly',
  flexWrap: 'wrap' as 'wrap'
};

interface Props {
  selectClass: any;
}
interface State {
  classes: Class[];
}

class Classes extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      classes: []
    };
  }

  componentDidMount() {
    api.getAllClasses().once('value', (snapshot: any) => {
      this.setState({
        classes: snapshot.val().map((x: any, i: number) => {
          return {
            id: i,
            classNumber: x.class_number,
            classTitle: x.class_title
          };
        })
      });
    });
  }

  render() {
    return (
      <div style={containerStyles}>
        {
          this.state.classes.map((c: Class, i: number) => <ClassCard classNumber={c.classNumber}
                                                                     className={c.classTitle}
                                                                     selectClass={() => this.props.selectClass(i)}
                                                                     key={i} />)
        }
      </div>
    );
  }
}

export default Classes;
