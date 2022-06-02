// CallToAction.js renders the CallToAction Page on the website
// This page displays information about how the general public can help 
// decrease their impact on marine debris.  
// Most of this page will be static formated text.

// CallToAction.js is rendered by Controller.js, and currently renders no children.

import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import teamphoto1 from '../../images/TeamPhoto1.jpg';
import teamphoto2 from '../../images/TeamPhoto2.jpeg';
import MainBeachPlaceholder from '../../images/MainBeachPlaceholder.png';
import slideshow_img2 from '../../images/slideshow_img2.jpg';
import slideshow_img3 from '../../images/slideshow_img3.jpg';

import '../../css/CallToAction.css';
import CardItem from './CardItem';

const slides = [
    {
        src: MainBeachPlaceholder,
        alt: "Debris Data",
        targetURL: "/debris-data",
        caption: "What type of debris are we finding on our beaches?"
    },
    {
        src: slideshow_img2,
        alt: "Data Collection",
        targetURL: "/methodology",
        caption: "How do we collect our data?"
    },
    {
        src: slideshow_img3,
        alt: "About Us",
        targetURL: "/team",
        caption: "About Us"
    }
    // etc
]

class CallToAction extends React.Component {
    render() {
        return (
            // html goes here
            <div>      
                <Carousel variant="dark" fluid-interval={8000} pause='hover'>
                    {/* new solution to slides: modular and easy to extend with list above */}
                    {slides.map((item) => (
                        <Carousel.Item>
                            <a href={item.targetURL}>
                                <img className="slides d-flex w-100"
                                src={item.src} 
                                alt={item.alt}
                                />
                            </a>
                                <Carousel.Caption className='caption-background'>
                                <h3 className=''>{item.caption}</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
                <div className='cards'>
                <div className='cards__container'>
                    <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem
                        src={teamphoto2}
                        text='The Long Marine Lab Survey Slug program connects passionate student volunteers with the resources and knowledge 
                        to collect crucial information about one of the most pressing environmental issues we face today.'
                        label='About Us'
                        path='/team'
                        />
                        <CardItem
                        src={teamphoto1}
                        style={{ align:"top" }}
                        text='Our Long Marine Lab Stranding volunteers each mentor a team of undergraduate students and teach them our 
                        unique data collection process.'
                        label='Our Work'
                        path='/methodology'
                        />
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default CallToAction
