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

const parseTime = (date: any) => {
  const a = date.getHours() >= 12 ? 'PM' : 'AM';
  return `${date.getHours() === 12 ? 12 : date.getHours() % 12}:${date.getMinutes()}${a}`;
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
            <div>
              <span>{this.props.startTime.toLocaleDateString()}</span>
              <span style={{display: 'block'}}>{parseTime(this.props.startTime)} - {parseTime(this.props.endTime)}</span>
            </div>
        }
      </div>
    );
  }
}

export default LectureCard;
