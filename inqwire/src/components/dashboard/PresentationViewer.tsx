import * as React from 'react';
import * as GoogleApi from '../shared/GoogleApiInterface';

import { Presentation } from '../../models';

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
  slideIds: string[];
}

class PresentationViewer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    GoogleApi.getPresentation(this.props.presentation.id).then((response: any) => {
      this.setState({
        currentSlide: 1,
        slideIds: response.result.slides.map((slide: any) => slide.objectId),
        totalSlides: response.result.slides.length
      });

      GoogleApi.getSlideThumbnail(this.props.presentation.id, this.state.slideIds[0]).then((res: any) => {
        this.setState({
          currentSlideImgSrc: res.result.contentUrl
        });

        // Cache the slide thumbnails
        // TODO: this currently fails with large presentations because of Google Drive quota, so
        // don't cache all at once, perhaps only the next 5 slides or so
        this.state.slideIds.map((slideId: string) => GoogleApi.getSlideThumbnail(this.props.presentation.id, slideId).then());
      });
    });

    this.state = {
      currentMode: 'Presentation',
      currentSlide: 0,
      currentSlideImgSrc: '',
      totalSlides: 0,
      slideIds: []
    };
  }

  setPage(page: number) {
    if (page < 1 || page > this.state.totalSlides) { return; }
    GoogleApi.getSlideThumbnail(this.props.presentation.id, this.state.slideIds[page - 1]).then((res: any) => {
      this.setState({
        currentSlide: page,
        currentSlideImgSrc: res.result.contentUrl
      });
    });
  }

  render() {
    return (
      <div style={containerStyles}>
        <img src={this.state.currentSlideImgSrc} style={slideStyles} />

        <div style={detailsBarStyles}>
          <div style={slidesModeStyles}>
            <img src={presentationIcon} style={imgStyles} />
            <span>{this.state.currentMode} Mode</span>
          </div>
          <div style={slideCounterStyles}>
            <div style={{cursor: this.state.currentSlide <= 1 ? 'not-allowed' : 'pointer'}}
                 onClick={() => this.setPage(this.state.currentSlide - 1)}>
              &lt;
            </div>
            <div style={{margin: '0 10px'}}>{this.state.currentSlide} of {this.state.totalSlides}</div>
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
