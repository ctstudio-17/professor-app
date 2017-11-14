import * as React from 'react';
import * as GoogleApi from '../shared/GoogleApiInterface';

import api from '../../firebase';
import { Presentation, Slide } from '../../models';

const presentationIcon = require('../../assets/presentation-icon.svg');

const containerStyles = {
  backgroundColor: 'var(--white)',
  border: `solid 7px var(--lavender-blue)`,
  position: 'relative' as 'relative',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box'
};
const slideStyles = {
  width: '100%',
  height: '100%'
};
const detailsBarStyles = {
  opacity: 0.75,
  backgroundColor: 'var(--lavender-blue)',
  position: 'absolute' as 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '10.7%',

  display: 'flex',
  alignItems: 'center' as 'center',
  justifyContent: 'space-between' as 'space-between'
};
const slidesModeStyles = {
  marginLeft: '3.8%',
  fontSize: '16px',
  width: '33%'
};
const imgStyles = {
  width: '5.2%',
  marginRight: '1.3%'
};
const slideCounterStyles = {
  fontWeight: 'bold' as 'bold',
  fontSize: '16px',
  letterSpacing: '1px',
  display: 'flex',
  width: '33%'
};

interface Props {
  presentation: Presentation;
  closePresentation: any;
}
interface State {
  currentMode: string;
  currentSlide: number;
  currentSlideImgSrc: string;
  totalSlides: number;
  slides: Slide[];
  cached: boolean[];
}

class PresentationViewer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.openInNewWindow = this.openInNewWindow.bind(this);

    if (props.presentation.currentPage >= 0) {
      this.state = {
        currentMode: 'Presentation',
        currentSlide: props.presentation.currentPage,
        currentSlideImgSrc: props.presentation.slides[props.presentation.currentPage].thumbnailUrl,
        totalSlides: props.presentation.slides.length,
        slides: props.presentation.slides,
        cached: Array(props.presentation.slides.length).fill(false)
      };
      this.setPage(props.presentation.currentPage);
    } else {
      this.state = {
        currentMode: 'Presentation',
        currentSlide: -1,
        currentSlideImgSrc: '',
        totalSlides: 0,
        slides: [],
        cached: []
      };
      this.loadPresentation();
    }
  }

  loadPresentation() {
    GoogleApi.getPresentation(this.props.presentation.id).then((response: any) => {
      this.setState({
        currentSlide: 0,
        slides: response.result.slides.map((slide: any) => ({slideId: slide.objectId, thumbnailUrl: '', studentsConfused: 0})),
        totalSlides: response.result.slides.length,
        cached: Array(response.result.slides.length).fill(false)
      });

      api.setSlides(this.props.presentation.id, this.state.slides);
      this.setPage(0);
    });
  }

  cacheThumbnails(start: number, end: number) {
    this.state.slides.slice(start, end).map((slide: Slide, i: number) => {
      if (!this.state.cached[start + i]) {
        GoogleApi.getSlideThumbnail(this.props.presentation.id, slide.slideId).then((res: any) => {
          api.setSlideThumbnail(start + i, res.result.contentUrl);
          this.state.slides[start + i].thumbnailUrl = res.result.contentUrl;
          this.state.cached[start + i] = true;
        });
      }
    });
  }

  openInNewWindow() {
    window.open(this.props.presentation.webViewLink);
  }

  setPage(page: number) {
    if (page < 0 || page > this.state.totalSlides) { return; }
    if (this.state.slides[page].thumbnailUrl) {
      this.updatePage(page, this.state.slides[page].thumbnailUrl);
    } else {
      GoogleApi.getSlideThumbnail(this.props.presentation.id, this.state.slides[page].slideId).then((res: any) => {
        api.setSlideThumbnail(page, res.result.contentUrl);
        this.updatePage(page, res.result.contentUrl);
      });
    }
  }

  updatePage(page: number, url: string) {
    api.setCurrentSlide(page);
    this.setState({
      currentSlide: page,
      currentSlideImgSrc: url
    });
    this.cacheThumbnails(page, Math.min(this.state.totalSlides, page + 10));
  }

  render() {
    return (
      <div style={containerStyles}>
        <img src={this.state.currentSlideImgSrc} style={slideStyles} />

        <div style={detailsBarStyles}>
          <div style={slidesModeStyles} onClick={this.openInNewWindow}>
            <img src={presentationIcon} style={imgStyles} />
            <span>{this.state.currentMode} Mode</span>
          </div>
          <div style={slideCounterStyles}>
            <div style={{cursor: this.state.currentSlide <= 0 ? 'not-allowed' : 'pointer'}}
                 onClick={() => this.setPage(this.state.currentSlide - 1)}>
              &lt;
            </div>
            <div style={{margin: '0 10px'}}>{this.state.currentSlide + 1} of {this.state.totalSlides}</div>
            <div style={{cursor: this.state.currentSlide >= this.state.totalSlides ? 'not-allowed' : 'pointer'}}
                 onClick={() => this.setPage(this.state.currentSlide + 1)}>
              &gt;
            </div>
          </div>
          <div style={{cursor: 'pointer', marginRight: '3.8%'}} onClick={this.props.closePresentation}>&lt; Back</div>
        </div>
      </div>
    );
  }
}

export default PresentationViewer;
