import * as React from 'react';

const containerStyles = {
  padding: '2.9%',
  backgroundColor: 'var(--white)',
  boxShadow: '0 2px 11px 0 rgba(190, 190, 190, 0.45)',
  flexGrow: 1,
  height: '100px',
  minWidth: '20%',
  maxWidth: '20%',
  fontSize: '22px',
  cursor: 'pointer'
};

const parseDate = (date: any) => {
  const a = date.getHours() > 12 ? 'PM' : 'AM';
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours() % 12}:${date.getMinutes()}${a}`;
};

interface Props {
  inProgress: boolean;
  startTime: Date;
  endTime?: Date;

  selectLecture: any;
}

class LectureCard extends React.Component<Props, {}> {
  render() {
    return (
      <div style={containerStyles} onClick={this.props.selectLecture}>
        {
          this.props.inProgress ?
            'In Progress' :
            `${parseDate(this.props.startTime)} - ${parseDate(this.props.endTime)}`
        }
      </div>
    );
  }
}

export default LectureCard;
