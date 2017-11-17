import * as React from 'react';
import api from '../../firebase';

import ChartBar from './ChartBar';

const containerStyles = {
  width: '100%',
  border: 'solid 1px #e4e4e4',
  borderRadius: '4px',
  flexGrow: 1
};
const headerStyles = {
  width: '100%',
  height: '60px',
  borderBottom: 'solid 1px #e4e4e4',
  paddingLeft: '35px',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center' as 'center',
  fontSize: '18px',
  letterSpacing: '2.3px',
  color: 'black'
};
const chartContainerStyles = {
  height: '445px',
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

interface State {
  confusedStudents: number[];
  topBarNum: number;
  thumbnails: string[];
}

class ConfusionChart extends React.Component<{}, State> {
  componentDidMount() {
    this.fetchConfusions();
  }

  fetchConfusions() {
    let confusions: any[] = []
    let confusedStudents: number[] = []
    let slider_ids: number[] = []
    let thumbnails: string[] = []
    api.getConfusionRef().once('value').then((snapshot: any) => {
      if (snapshot.val() == null) { throw new Error('error'); }
      confusions = Object.keys(snapshot.val()).map((key) => {return snapshot.val()[key]})
      slider_ids = confusions.reduce((slides: number[], confusion: any) => {
        if(slides.indexOf(confusion.slide_number) != -1){return slides}
        return slides.concat(confusion.slide_number);
      }, []);
      confusedStudents = Array(slider_ids.length).fill(0)
      confusions.forEach((confusion) => {
        confusedStudents[slider_ids.indexOf(confusion.slide_number)] += 1;
      });
    }).then(() => {
      return api.getPresentationSlides()
    }).then((sliders: any) => {
      thumbnails = slider_ids.map((id) => {
        return sliders.val()[id]['thumbnailUrl']
      });
      return thumbnails
    }).then(() => {
      this.setState({
        confusedStudents: confusedStudents,
        topBarNum: Math.ceil(Math.max.apply(null, confusedStudents) / 5) * 5,
        thumbnails: thumbnails,
      });
    }).catch( (error: any) => {
      this.setState({
        confusedStudents: [],
      });
    });
  }

  render() {
    if (!this.state) {
      return this.renderLoadingView();
    }

    if (this.state.confusedStudents.length === 0) {
      return this.renderNoData();
    }

    return this.renderChart();
  }

  renderLoadingView() {
    return (
      <div> Loading... </div>
    );
  }

  renderNoData() {
    return (
      <div> No data </div>
    );
  }

  renderChart() {
    return (
      <div style={containerStyles}>
        <div style={headerStyles}>Slides students found most confusing</div>
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
                this.state.confusedStudents.map((student_number: number, i: number) => {
                  return <ChartBar key={i}
                                   numStudents={student_number}
                                   height={(student_number / this.state.topBarNum) * 100 + '%'} />;
                })
              }
            </div>
          </div>
          <div style={thumbnailRowStyles}>
            {
              this.state.thumbnails.map((thumbnailSrc: any, i: number) => {
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
