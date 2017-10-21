import * as React from 'react';

import ChartBar from './ChartBar';
import SummaryCardHeader from './SummaryCardHeader';
import * as GoogleApi from '../shared/GoogleApiInterface';

import { Slide } from '../../models';
import { confusionSlides } from '../../mockdata/confusion-slides';

const containerStyles = {
  width: '100%',
  height: '100%',
  border: 'solid 1px black',
  backgroundColor: 'var(--white)'
};
const chartContainerStyles = {
  height: '90.4%',
  padding: '3.7% 3.7% 2.5% 3.7%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between' as 'space-between'
};
const canvasStyles = {
  height: '86.5%',
  position: 'relative' as 'relative',
  display: 'flex',
  flexDirection: 'column-reverse' as 'column-reverse',
  justifyContent: 'space-between' as 'space-between'
};
const barsContainerStyles = {
  position: 'absolute' as 'absolute',
  right: '1%',
  width: '94.7%',
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between' as 'space-between',
  alignItems: 'flex-end' as 'flex-end'
};
const horizontalAxisStyles = {
  display: 'flex',
  alignItems: 'center' as 'center'
};
const horizontalAxisLineStyles = {
  flexGrow: 1,
  height: '0',
  border: 'dotted 1px rgba(209, 209, 209, 0.58)',
  marginLeft: '0.9%'
};
const thumbnailRowStyles = {
  height: '9.8%',
  marginLeft: '3.1%',
  display: 'flex',
  justifyContent: 'space-between' as 'space-between'
};
const thumbnailStyles = {
  backgroundColor: 'white',
  width: '11.1%'
};

interface Props {
  presentationId: string;
  confusionSlides: Slide[];
}
interface State {
  maxStudentsConfused: number;
  topBarNum: number;
  thumbnails: any[];
}

class ConfusionChart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const maxStudentsConfused = props.confusionSlides.reduce((prevVal: Slide, currVal: Slide) => {
                                                                if (currVal.studentsConfused > prevVal.studentsConfused) {
                                                                  return currVal;
                                                                } else {
                                                                  return prevVal;
                                                                }
                                                              }).studentsConfused;

    if (GoogleApi.getUserLoginStatus()) {
      props.confusionSlides.map((slide: Slide, i: number) => {
        return GoogleApi.getSlideThumbnail(props.presentationId, slide.slideId).then((res: any) => {
            const newThumbnails = this.state.thumbnails;
            newThumbnails[i] = res.result.contentUrl;
            this.setState({thumbnails: newThumbnails});
        });
      });
    }

    this.state = {
      maxStudentsConfused: maxStudentsConfused,
      topBarNum: Math.ceil(maxStudentsConfused / 5) * 5,
      thumbnails: Array(6).fill('')
    };
  }

  render() {
    return (
      <div style={containerStyles}>
        <div style={{height: '9.6%'}}>
          <SummaryCardHeader title='Slides students found most confusing' />
        </div>

        <div style={chartContainerStyles}>
          <div style={canvasStyles}>
            {
              Array(6).fill(0).map((val: number, i: number) => {
                let alignment: 'flex-end' | 'flex-start' | 'center';
                const num = i * (this.state.topBarNum / 5);
                switch (i) {
                  case 0:
                    alignment = 'flex-end';
                    break;
                  case 5:
                    alignment = 'flex-start';
                    break;
                  default:
                    alignment = 'center';
                    break;
                }
                return (
                  <div key={i} style={{...horizontalAxisStyles, alignItems: alignment}}>
                    {num}
                    <div key={i} style={horizontalAxisLineStyles} />
                  </div>
                );
              })
            }
            <div style={barsContainerStyles}>
              {
                confusionSlides.map((slide: Slide, i: number) => {
                  return <ChartBar key={i} numStudents={slide.studentsConfused} height={(slide.studentsConfused / this.state.topBarNum) * 100 + '%'} />;
                })
              }
            </div>
          </div>
          <div style={thumbnailRowStyles}>
            {
              this.state.thumbnails.map((thumbnailSrc: any, i: number) => {
                // return <img key={i} style={thumbnailStyles}><img src={thumbnailSrc} /></div>;
                return <img key={i} style={thumbnailStyles} src={thumbnailSrc} />;
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ConfusionChart;
