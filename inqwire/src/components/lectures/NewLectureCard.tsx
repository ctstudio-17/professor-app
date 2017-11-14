import * as React from 'react';

const containerStyles = {
  padding: '2.9%',
  backgroundColor: 'var(--white)',
  boxShadow: '0 2px 11px 0 rgba(190, 190, 190, 0.45)',
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center' as 'center',
  alignItems: 'center' as 'center',
  height: '100px',
  minWidth: '20%',
  maxWidth: '20%',
  fontSize: '60px',
  color: 'rgb(190,190,190)',
  border: 'dashed rgb(190,190,190)',
  cursor: 'pointer'
};

interface Props {
  startLecture: any;
}

class LectureCard extends React.Component<Props, {}> {
  render() {
    return (
      <div style={containerStyles} onClick={this.props.startLecture}>
        +
      </div>
    );
  }
}

export default LectureCard;
