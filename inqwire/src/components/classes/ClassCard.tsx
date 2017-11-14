import * as React from 'react';

const containerStyles = {
  padding: '2.9%',
  backgroundColor: 'var(--white)',
  boxShadow: '0 2px 11px 0 rgba(190, 190, 190, 0.45)',
  flexGrow: 1,
  height: '100px',
  maxWidth: '20%',
  cursor: 'pointer'
};
const numberStyles = {
  fontSize: '28px'
};
const titleStyles = {
  fontSize: '22px'
};

interface Props {
  classNumber: string;
  className: string;
  selectClass: any;
}

class ClassCard extends React.Component<Props, {}> {
  render() {
    return (
      <div style={containerStyles} onClick={this.props.selectClass}>
        <div style={numberStyles}>{this.props.classNumber}</div>
        <div style={titleStyles}>{this.props.className}</div>
      </div>
    );
  }
}

export default ClassCard;
