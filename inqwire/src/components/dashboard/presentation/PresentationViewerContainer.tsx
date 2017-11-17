import * as React from 'react';

import PresentationViewer from './PresentationViewer';
import GoogleSlidesPicker from './GoogleSlidesPicker';
import Button from '../../shared/Button';

import { Presentation, Slide } from '../../../models';

const containerStyles = {
  position: 'relative' as 'relative',
  width: '91.2%',
  height: '90%'
};

interface Props {
  gUserAuthorized: boolean;
  selectedPresentation?: Presentation;
  slides: Slide[];
  currentSlide: number;
  startTime?: Date;
  closePresentation: any;
  setSlides: any;
  updateSlideThumbnail: any;
  updateSlide: any;
  handleAuthClick: any;
  selectPresentation: any;
}

class PresentationViewerContainer extends React.Component<Props, {}> {
  render() {
    return (
      <div style={containerStyles}>
        {
          this.props.gUserAuthorized ?
          (this.props.selectedPresentation ?
            <PresentationViewer presentation={this.props.selectedPresentation}
                                slides={this.props.slides}
                                currentSlide={this.props.currentSlide}
                                startTime={this.props.startTime}
                                closePresentation={this.props.closePresentation}
                                setSlides={this.props.setSlides}
                                updateSlideThumbnail={this.props.updateSlideThumbnail}
                                updateSlide={this.props.updateSlide} /> :
            <GoogleSlidesPicker logOutGoogleAuth={this.props.handleAuthClick} selectPresentation={this.props.selectPresentation} />) :
          <Button height='10%'
                  backgroundColor='black'
                  textColor='white'
                  buttonText='Log In'
                  handleButtonClick={this.props.handleAuthClick} />
        }
      </div>
    );
  }
}

export default PresentationViewerContainer;
