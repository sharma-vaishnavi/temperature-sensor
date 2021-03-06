import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Lightbox from 'react-image-lightbox';
import RrdChart from './RrdChart';
import './css/rrdCharts.css';

const images = [
  'temperature-1-days.png',
  'temperature-7-days.png',
  'temperature-30-days.png'
];

const imageTitles = [
  '24 Hours',
  '7 Days',
  '1 Month'
];

class RrdCharts extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      photoTitle: null,
      isOpen: false
    };
  }

  render() {
    return (
        <div>
          <Grid>
            <Row>
              <Col md={4}>
                <div className='image-link' onClick={ this.setPhoto(0) }>
                  <RrdChart label="24 Hours" file={ images[0] }/>
                </div>
              </Col>
              <Col md={4}>
                <div className='image-link' onClick={ this.setPhoto(1) }>
                  <RrdChart label="7 Days" file={ images[1] } />
                </div>
              </Col>
              <Col md={4}>
                <div className='image-link' onClick={ this.setPhoto(2) }>
                  <RrdChart label="1 Month" file={ images[2] } />
                </div>
              </Col>
            </Row>
          </Grid>

          {this.state.isOpen &&
            <Lightbox
                mainSrc={ images[this.state.photoIndex] }
                nextSrc={ images[this.incrementedIndex()] }
                prevSrc={ images[this.decrementedIndex()] }
                imageTitle={ this.state.photoTitle }
                onCloseRequest={ this.close() }
                onMovePrevRequest={ this.prevImage() }
                onMoveNextRequest={ this.nextImage() }
            />
          }

        </div>
    )
  }

  setPhoto(index) {
    return () => this.setState({
      isOpen: true,
      photoIndex: index,
      photoTitle: imageTitles[index],
    }, () => {
      console.log(this.state)
    });
  }

  prevImage() {
    return () => this.setState({
      photoIndex: this.decrementedIndex(),
      photoTitle: imageTitles[this.decrementedIndex()]
    });
  }

  nextImage() {
    return () => this.setState({
      photoIndex: this.incrementedIndex(),
      photoTitle: imageTitles[this.incrementedIndex()]
    });
  }

  close() {
    return () => this.setState({isOpen: false});
  }

  incrementedIndex() {
    return (this.state.photoIndex + 1) % images.length;
  }
  
  decrementedIndex() {
    return (this.state.photoIndex + images.length - 1) % images.length;
  }
}

export default RrdCharts;
