// CallToAction.js renders the CallToAction Page on the website
// This page displays information about how the general public can help 
// decrease their impact on marine debris.  
// Most of this page will be static formated text.

// CallToAction.js is rendered by Controller.js, and currently renders no children.

import React from 'react';
import placeholder from '../../images/placeholder.png';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import '../../css/CallToAction.css';

class CallToAction extends React.Component {
    render() {
        return (
            // html goes here
            <div>        
                <Container>
                    <center>
                        <h1>UCSC Long Marine Lab: Marine Debris</h1>
                        <br></br>
                        <Carousel variant="dark" fluid>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={placeholder}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>First slide label</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={placeholder}
                                    alt="Second slide"

                                />

                                <Carousel.Caption>
                                    <h3>Second slide label</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={placeholder}
                                    alt="Third slide"
                                />

                                <Carousel.Caption>
                                    <h3>Third slide label</h3>
                                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </center> 
                    <br></br>
                    <Container>
                        <h3>How can you help?</h3>

                    </Container>
                </Container>
                
            </div>
        );
    }
}

export default CallToAction