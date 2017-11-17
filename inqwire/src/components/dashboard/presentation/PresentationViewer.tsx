import * as React from 'react';
import * as GoogleApi from '../../shared/GoogleApiInterface';

import SlidePreview from './SlidePreview';

import api from '../../../firebase';
import { Presentation, Slide } from '../../../models';

const flexSpaceBetween = {
  display: 'flex',
  justifyContent: 'space-between' as 'space-between'
};
const containerStyles = {
  ...flexSpaceBetween,
  height: '100%',
  flexDirection: 'column' as 'column',
};
const headerStyles = {
  ...flexSpaceBetween,
  color: 'white',
  height: '3.1%',
  fontSize: '14px',
  letterSpacing: '0.9px'
};
const bottomRowStyles = {
  display: 'flex',
  justifyContent: 'space-between' as 'space-between',
  height: '6.4%'
};
const slideCounterStyles = {
  width: '23.5%',
  height: '100%',
  border: 'solid 2px #565555',
  borderRadius: '17.5px',
  display: 'flex',
  justifyContent: 'space-evenly' as 'space-evenly',
  alignItems: 'center' as 'center',
  marginLeft: '38.25%',
  fontSize: '14px',
  letterSpacing: '0.9px',
  color: 'white'
};
const arrowStyles = {
  cursor: 'pointer',
  borderTop: '8px solid transparent',
  borderBottom: '8px solid transparent'
};
const leftArrowStyles = {
  ...arrowStyles,
  borderRight: '10px solid white'
};
const rightArrowStyles = {
  ...arrowStyles,
  borderLeft: '10px solid white'
};
const endLectureButtonStyles = {
  width: '20%',
  height: '100%',
  backgroundColor: 'rgba(244, 51, 72, 0.17)',
  border: 'solid 2px #f43333',
  borderRadius: '17.5px',
  fontSize: '14px',
  letterSpacing: '0.9px',
  color: '#f43333',
  display: 'flex',
  justifyContent: 'center' as 'center',
  alignItems: 'center' as 'center',
  cursor: 'pointer'
};

const convertDateToSeconds = (date: Date) => parseInt(String(date.getTime() / 1000), 10);

interface Props {
  presentation: Presentation;
  slides: Slide[];
  currentSlide: number;
  closePresentation: any;
  setSlides: any;
  updateSlideThumbnail: any;
  updateSlide: any;
  endLecture: any;

  startTime?: Date;
}
interface State {
  currentSlideImgSrc: string;
  totalSlides: number;
  cached: boolean[];
  cachingId?: any;

  intervalId: any;
  minutes: number;
  seconds: number;
}

class PresentationViewer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.openInNewWindow = this.openInNewWindow.bind(this);

    let state;

    if (props.startTime) {
      const passedTime = convertDateToSeconds(new Date()) - convertDateToSeconds(props.startTime);
      state = {
        intervalId: -1,
        minutes: parseInt(String(passedTime / 60), 10),
        seconds: passedTime % 60
      };
    } else {
      state = {
        intervalId: -1,
        minutes: 0,
        seconds: 0
      };
    }

    if (props.presentation.currentPage >= 0) {
      this.state = {
        ...state,
        currentSlideImgSrc: props.presentation.slides[props.presentation.currentPage].thumbnailUrl,
        totalSlides: props.presentation.slides.length,
        cached: Array(props.presentation.slides.length).fill(false)
      };
      this.setPage(props.presentation.currentPage);
      setTimeout(() => this.cacheAllThumbnails(), 0);
    } else {
      this.state = {
        ...state,
        currentSlideImgSrc: '',
        totalSlides: 0,
        cached: []
      };
      setTimeout(() => this.loadPresentation(), 0);
    }
  }

  updateTime() {
    const minutes = this.state.minutes + Math.floor((this.state.seconds + 1) / 60);
    this.setState({
      minutes: minutes,
      seconds: (this.state.seconds + 1) % 60
    });
  }

  componentDidMount() {
    const intervalId = setInterval(this.updateTime.bind(this), 1000);
    this.setState({ intervalId });
  }

  loadPresentation() {
    GoogleApi.getPresentation(this.props.presentation.id).then((response: any) => {
      this.props.setSlides(response.result.slides.map((slide: any) => ({slideId: slide.objectId, thumbnailUrl: '', studentsConfused: 0})));
      this.props.updateSlide(0);
      this.setState({
        totalSlides: response.result.slides.length,
        cached: Array(response.result.slides.length).fill(false)
      });

      this.setPage(0);
      this.cacheAllThumbnails();
    });
  }

  cacheAllThumbnails() {
    this.cacheThumbnails(0, Math.min(this.state.totalSlides, 10));
    let start = 10;
    const id = setInterval(() => {
      if (start > this.props.slides.length) {
        clearInterval(id);
      } else {
        this.cacheThumbnails(start, Math.min(this.state.totalSlides, start + 5));
        start += 5;
      }
    }, 5000);
    this.setState({cachingId: id});
  }

  cacheThumbnails(start: number, end: number) {
    this.props.slides.slice(start, end).map((slide: Slide, i: number) => {
      if (!this.state.cached[start + i]) {
        GoogleApi.getSlideThumbnail(this.props.presentation.id, slide.slideId).then((res: any) => {
          api.setSlideThumbnail(start + i, res.result.contentUrl);
          this.props.updateSlideThumbnail(start + i, res.result.contentUrl);
          this.state.cached[start + i] = true;
        });
      }
    });
  }

  openInNewWindow() {
    window.open(this.props.presentation.webViewLink);
  }

  setPage(page: number) {
    if (page < 0 || page >= this.state.totalSlides) { return; }
    if (this.props.slides[page].thumbnailUrl) {
      this.updatePage(page, this.props.slides[page].thumbnailUrl);
    } else {
      GoogleApi.getSlideThumbnail(this.props.presentation.id, this.props.slides[page].slideId).then((res: any) => {
        api.setSlideThumbnail(page, res.result.contentUrl);
        this.updatePage(page, res.result.contentUrl);
      });
    }
  }

  updatePage(page: number, url: string) {
    api.setCurrentSlide(page);
    this.props.updateSlide(page);
    this.setState({
      currentSlideImgSrc: url
    });
    this.cacheThumbnails(page, Math.min(this.state.totalSlides, page + 10));
  }

  render() {
    return (
      <div style={containerStyles}>
        <div style={headerStyles}>
          <span>Current Slide</span>
          <div>
            <span>{this.state.minutes < 10 ? '0' + this.state.minutes : this.state.minutes}</span>
            <span>:</span>
            <span>{('0' + this.state.seconds).slice(-2)}</span>
          </div>
        </div>

        <SlidePreview slideSrc={this.state.currentSlideImgSrc} height='85%' />

        <div style={bottomRowStyles}>
          <div style={slideCounterStyles}>
            <div style={{...leftArrowStyles, cursor: this.props.currentSlide <= 0 ? 'not-allowed' : 'pointer'}}
                onClick={() => this.setPage(this.props.currentSlide - 1)} />
            <div>{this.props.currentSlide + 1} of {this.state.totalSlides}</div>
            <div style={{...rightArrowStyles, cursor: this.props.currentSlide + 1 >= this.state.totalSlides ? 'not-allowed' : 'pointer'}}
                onClick={() => this.setPage(this.props.currentSlide + 1)} />
          </div>

          <div style={endLectureButtonStyles} onClick={this.props.endLecture}>
            End Lecture
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.state.cachingId);
    clearInterval(this.state.intervalId);
  }
}

export default PresentationViewer;
