// Methodology.js renders the Methodology Page on the website
// This page displays inforation about any methodologies for gathering data,
// where the data was gathered from. 
// Most of this page will be static formated text.

// Methodology.js is rendered by Controller.js, and currently renders no children.

import React from 'react';
import placeholder from '../../images/placeholder.png';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../../css/Methodology.css';

class Methodology extends React.Component {
    render() {
        return (
            <div>        
                <Container>
                  <Row>
                    <Col sm={8}>
                      <center>
                        <h1>Marine Debris Collection Methodology</h1>
                      </center>
                    </Col>
                    <Col sm={4}>
                      <Carousel variant="dark" fluid>
                          <Carousel.Item>
                              <img
                                  className="d-block w-100"
                                  src={placeholder}
                                  alt="First slide"
                              />
                              <Carousel.Caption>
                                  <h6>First slide label</h6>
                              </Carousel.Caption>
                          </Carousel.Item>
                          <Carousel.Item>
                              <img
                                  className="d-block w-100"
                                  src={placeholder}
                                  alt="Second slide"
                              />

                              <Carousel.Caption>
                                  <h6>Second slide label</h6>
                              </Carousel.Caption>
                          </Carousel.Item>
                          <Carousel.Item>
                              <img
                                  className="d-block w-100"
                                  src={placeholder}
                                  alt="Third slide"
                              />

                              <Carousel.Caption>
                                  <h6>Third slide label</h6>
                              </Carousel.Caption>
                          </Carousel.Item>
                      </Carousel>
                    </Col>
                  </Row>

                </Container>
                
            </div>
        );
    }
}

export default Methodology