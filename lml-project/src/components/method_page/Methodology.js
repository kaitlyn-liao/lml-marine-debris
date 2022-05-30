// Methodology.js renders the Methodology Page on the website
// This page displays inforation about any methodologies for gathering data,
// where the data was gathered from. 
// Most of this page will be static formated text.

// Methodology.js is rendered by Controller.js, and currently renders no children.

import React from 'react';
import placeholder from '../../images/placeholder.png';
import beach1 from '../../images/beach1.png';
import beach2 from '../../images/beach2.png';
import beach3 from '../../images/beach3.png';
import beach4 from '../../images/beach4.png';
import method1 from '../../images/method1.jpeg';
import method2 from '../../images/method2.jpeg';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../../css/Methodology.css';
import Carousel from 'react-bootstrap/Carousel';
import Footer from "./Footer.js";

const slides = [
    {
        src: beach1,
        alt: "Beach 1 Name",
        targetURL: "/sample1"
    },
    {
        src: beach2,
        alt: "Beach 2 Name"
    },
    {
        src: beach3,
        alt: "Beach 3 Name"
    },
    // etc
]

// Each row contains a title, paragraph, and image/carousel

class Methodology extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <center>
                            <h1>Marine Debris Collection Methodology</h1>
                        </center>

                        <Row>
                            <Col sm={8} className="pt-5">
                                <h4>How is data collected?</h4>

                                <Col className="pt-2">
                                    <p className="indent">
                                        The way that our team collects this Marine Debris data is relatively simple.
                                        First, volunteers will lay out a 100 meter transect across the beach, horizontal to the shoreline.
                                        Next, volunteers will place a 2 meter by 2 meter quadrat at 3 distances along the 100 meter transect.
                                        These distances are randomly generated numbers between 1-100 and change each month to prevent any biases.
                                        At each of the three distances, two quadrats are sampled (6 quadrats in total).
                                        One on the high tide line, and the other one 5 meters above the high tide line for each number.
                                        During each sampling, volunteers will examine the quadrat and collect debris laying on top of the sand, then record their findings on the Stranding Network Marine Debris Data Sheet.
                                        Additionally, volunteers will then rake their fingers into the sand approximately 2 cm deep and survey for buried debris.
                                        These will also be collected and recorded on the Stranding Network Marine Debris Data Sheet in the proper size region.
                                    </p>
                                </Col>
                            </Col>
                            <Col className="pt-5">
                                <img
                                    className="d-block w-100 rounded"
                                    src={method1}
                                    alt="First picture"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8} className="pt-4">
                                <h4>Study Region</h4>
                                <Col className="pt-2">
                                    <p className="indent">
                                        12 beaches along the Monterey Bay Peninsula in the Central Coast of California were selected as survey locations and were subsequently surveyed multiple times over a two year period.
                                        Eight of these beaches (Main Beach, Seaside, Sea Bright, Twin Lakes, Capitola, Sunset, Waddell, Live Oak, and Natural Bridges) were located in Santa Cruz county.
                                        The remaining four beaches (Del Monte, Zmudowski South, Marina, Zmudowski North) were located in Monterey County.
                                        Each beach was classified as either a rural beach or an urban beach based upon its proximity to a major city.
                                        Beaches were all sandy municipal beaches with public access.
                                    </p>
                                </Col>
                            </Col>
                            <Col className="pt-5">
                                <Carousel variant="dark" fluid-interval={8000} pause='hover'>

                                    {/* new solution to slides: modular and easy to extend with list above */}
                                    {slides.map((item) => (
                                        // uncomment nav link when targetURL is determined
                                        // <Nav.Link href={item.targetURL}>
                                        <Carousel.Item>
                                            <center>
                                                <img
                                                    src={item.src}
                                                    alt={item.alt}
                                                    style={{ width: 345 + 'px', height: 200 + 'px' }} />
                                            </center>
                                        </Carousel.Item>
                                        // </Nav.Link>
                                    ))}
                                </Carousel>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8} className="pt-4">
                                <h4>Data Collection</h4>
                                <Col className="pt-2">
                                    <p className="indent">
                                        Longitudinal data was collected between January 2019 and December 2020 using both 4m^2 quadrats (n= 243) and transects running in size from 0.11 miles to 0.5 miles (n= 244) through UC Santa Cruz's Long marine Lab Survey Slug program.
                                        Transect data is submitted to the National Oceanic and Atmospheric Association (NOAA) as a part of the national Marine Debris Monitoring and Assessment Project (MDMAP).

                                    </p>
                                </Col>
                            </Col>
                            <Col className="pt-5">
                                <img
                                    className="d-block w-100 rounded"
                                    src={method2}
                                    alt="Third picture"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8} className="pt-4">
                                <h4>Quadrat Surveys</h4>
                                <Col className="pt-2">
                                    <p className="indent">
                                        To determine the placement of the quadrats, a 50 meter transect was placed parallel to the shoreline along the high tide line at a predetermined and consistent starting point.
                                        Three random points along the transect were assigned per a survey and at each point one 4m^2 quadrats was placed directly beneath the transect line and one 4m^2 qudrat was placed 5m above the transect line, for a total of six 4m^2 quadrats per a survey.
                                        Within each quadrat, surveyors took note of both the marine debris on the surface of the sand by scanning the quadrat's surface and classifying any debris found on the surface by type (fragmented plastic, plastic products, food wrappers, styrofoam, cigarettes, paper/treated wood, metal, glass, fabris, fertilizer pellets, fishing gear, rubber, other) and size (meso or micro).
                                        After an initial surface scan of the quadrat was completed, surveyors used their fingertips to rake approximately 2 cm into the sand for buried debris throughout the entire quadrat and took note of the type and size of marine debris present.
                                    </p>
                                </Col>
                            </Col>
                            <Col className="pt-5">
                                <img
                                    className="d-block w-100 rounded"
                                    src={beach4}
                                    alt="Fourth picture"
                                />
                            </Col>
                        </Row>
                    </Row>

                </Container>
                <Footer/>
            </div>
        );
    }
}

export default Methodology