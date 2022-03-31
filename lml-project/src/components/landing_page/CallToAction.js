// CallToAction.js renders the CallToAction Page on the website
// This page displays information about how the general public can help 
// decrease their impact on marine debris.  
// Most of this page will be static formated text.

// CallToAction.js is rendered by Controller.js, and currently renders no children.

import React from 'react';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav'
import placeholder from '../../images/placeholder.png';
import photogenicPlaceholder from '../../images/MainBeachPlaceholder.png';
import '../../css/CallToAction.css';

const slides = [
    {
        src: photogenicPlaceholder,
        alt: "Beach 1 Name",
        targetURL: "/sample1",
        caption: "What type of trash is most common on Main Beach?"
    },
    {
        src: placeholder,
        alt: "Beach 2 Name",
        targetURL: "/sample2",
        caption: "Sample Question"
    }
    // etc
]

class CallToAction extends React.Component {
    render() {
        return (
            // html goes here
            <div>        
                <Container>
                    <center>
                        <h1>UCSC Long Marine Lab: Marine Debris</h1>
                        <br></br>
                        <Carousel variant="dark" fluid-interval={8000} pause='hover'>
                            
                            {/* new solution to slides: modular and easy to extend with list above */}
                            {slides.map((item) => (
                                    // uncomment nav link when targetURL is determined
                                    // <Nav.Link href={item.targetURL}>
                                        <Carousel.Item>
                                            <img    src={item.src} 
                                                    alt={item.alt}/>
                                            <Carousel.Caption>
                                                <h3>{item.caption}</h3>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    // </Nav.Link>
                            ))}
                        </Carousel>
                    </center> 
                    <br></br>
                    <Container>
                        <center>
                          <h1>Marine Debris: Understand The Data</h1>
                        </center>
                            <Col sm={8} className="pgs">
                                <p className="indent1">
                                The Long Marine Lab Survey Slug program connects passionate student volunteers with the resources and knowledge 
                                to collect crucial information about one of the most pressing environmental issues we face today. 
                                </p>
                                <p className="indent2">
                                Our Long Marine Lab Stranding volunteers each mentor a team of undergraduate students and teach them our 
                                unique data collection process. We survey 8 beaches in Santa Cruz and Monterey County every month and use 
                                this information to find out what are the types, amounts, and temporal and geographic patterns of marine 
                                debris on Monterey Bay beaches. These surveys provide opportunities for undergraduate students to experience 
                                real data collection in the field, learn more about the local community in which they are living, make an 
                                impactful contribution to cleaning up marine debris, meet and work with other students that are similarly 
                                interested in marine science, and develop a relationship with a mentor working in a science field. Marine 
                                debris can entangle and harm marine life, litter our waterways, and pollute our water when it degrades; 
                                help us to combat this problem by taking action now!
                                </p>
                            </Col>

                    </Container>
                </Container>
                
            </div>
        );
    }
}

export default CallToAction
