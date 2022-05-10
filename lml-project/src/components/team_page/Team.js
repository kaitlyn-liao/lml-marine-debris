// Team.js renders the Team Page for the site
// This page will display information about the Developement team as
//  well as the LML Research team in the form of Member Components

// Team.js is rendered by Controller.js, and renders the child Member.js

import React from 'react';
import "../../css/Team.css";
import avatar from '../team_page/images/default-avatar.png'
import githubButton from '../team_page/images/GitHub-Mark.png'
import linkedInButton from '../team_page/images/linkedin.png'
import juliImg from '../team_page/images/juli-limon.jpg'
import maiaImg from '../team_page/images/maia-smith.jpeg'
import robinImg from '../team_page/images/robin-dunkin.jpg'
import kaitlynImg from '../team_page/images/kaitlyn-liao.JPG'
// import bridgetImg from '../team_page/images/bridget-chew.jpg'
import noahImg from '../team_page/images/noah-cantwell.JPG'
import zackImg from '../team_page/images/zack-miller.jpeg'
import spencerImg from '../team_page/images/spencer-fulgham.png'

/* When adding this file to the topology, make sure to transfer all images
    and the CSS properties from Team.css */


/* 
*  Description: The member class, for a team member 
*  Inputs: name, bio, github, linkedIn, photo
*  Outputs: formatted card for team member with given info
*/

function Member(props) {
    return (
        /* box css defines background color */
        <div>
            <div class="box">
                {/* Row with one column for name/bio/buttons and one for picture*/}
                <div class="row">
                    <div class="col-sm">
                        <div class="row">
                            <h3 class="name">{props.name}</h3>
                            <p class="bio">{props.bio}</p>
                        </div>
                            
                        <div class="row">
                            <div class="col-sm"><a href={props.github}><img src={githubButton} class="icon-button"></img></a></div>
                            <div class="col-sm"><a href={props.linkedIn}><img src={linkedInButton} class="icon-button"></img></a></div>
                            {/* This is the only way I could get the buttons close together */}
                            <div class="col-lg"></div>
                            <div class="col-lg"></div>
                            <div class="col-lg"></div>
                        </div>
                    </div>
                        
                    <div class="col-sm">
                        <img src={props.photo} class="img-thumbnail profile-photo"></img>
                    </div> 
                </div>
            </div>
        </div>  
    );
}

/* 
*  Description: The Researcher class, for LML Researchers, no GitHub or LinkedIn links
*  Inputs: name, bio, photo
*  Outputs: formatted card for LML team member with given info
*/
function Researcher(props) {
    return (
        <div>
            <div class="researcher-box">
                <div class="row">
                            <div>
                            <img src={props.photo} class="img-thumbnail r-profile-photo"></img>
                            <h3 class="name">{props.name}</h3>
                            <p class="r-bio">{props.bio}</p></div>
                            
                    
                </div>
            </div>
        </div>  
    );
}

/* Creates a column for software team and for LML team, with Acknowledgements at the bottom */
class Team extends React.Component {
    
  render() {     
    return (
        <div>
            <div class="col-lg float-start">
                <h1>Meet the Software Team</h1>
                <p>We are a team of five computer science students at UCSC.</p>
                <p><br></br></p>
                
                <div class="row">
                    <Member name='Kaitlyn Liao' bio='Product Owner and Software Engineer, Computer Science student at UCSC' 
                        github="https://github.com/kaitlyn-liao/lml-marine-debris"
                        photo={kaitlynImg} linkedIn="https://www.linkedin.com/"/>
                </div>
                    
                <div class="row">
                    <Member name='Noah Cantwell' bio='Developer and Software Engineer, Computer Science student at UCSC' 
                        github="https://github.com/kaitlyn-liao/lml-marine-debris"
                        photo={noahImg} linkedIn="https://www.linkedin.com/"/>
                </div>
                <div class="row">
                    <Member name='Spencer Fulgham' bio='Developer and Software Engineer, Computer Science student at UCSC' 
                        github="https://github.com/srfslvr14"
                        photo={spencerImg} linkedIn="https://www.linkedin.com/in/spencer-fulgham-831971165/"/>
                </div>
                <div class="row">
                    <Member name='Zachary Miller' bio='Developer and Software Engineer, Computer Science student at UCSC' 
                        github="https://github.com/kaitlyn-liao/lml-marine-debris"
                        photo={zackImg} linkedIn="https://www.linkedin.com/"/>
                </div>
                <div class="row">
                    <Member name='Bridget Chew' bio='Developer and Software Engineer, Computer Science student at UCSC' 
                        github="https://github.com/kaitlyn-liao/lml-marine-debris"
                        photo={avatar} linkedIn="https://www.linkedin.com/"/>
                </div>
                <div class="row">
                    <Member name='Vinh Le' bio='Developer and Software Engineer, Computer Science student at UCSC' 
                        github="https://github.com/kaitlyn-liao/lml-marine-debris"
                        photo={avatar} linkedIn="https://www.linkedin.com/"/>
                </div>
                
                <div class="thanks-box">
                    <h1>Acknowledgements</h1>
                    <p>We would like to thank our Researchers from the UCSC Long Marine Lab and Professor Jullig.<br/>
                    In adddition, we would like to thank the team behind the Marine Mammal Stranding Map, which served<br/>
                    as inspiration and a starting point for our project.</p>
                </div>
            </div>
        
            <div class="col-lg float-end">
                <div class="text-end"><h1>Meet the LML Team</h1>
                <p>From the UCSC Long Marine Lab.</p></div>
                <p><br></br></p>
                <div class="row">
                    <Researcher name='Robin Dunkin' bio='Dr. Robin Dunkin is the Marine Mammal Stranding Operations 
                    manager for The Long Marine Lab Stranding Network and has worked in this role since 2005. 
                    Robin completed her Ph.D. in the lab of Dr. Terrie Williams in 2012 but first began learning 
                    about marine mammal stranding response while completing her master’s degree in the lab of 
                    Dr. Ann Pabst and Bill McLellan at the University of North Carolina Wilmington in 2001. 
                    As an undergraduate at U.C. Santa Cruz, Robin volunteered as a docent at Long Marine Lab and 
                    worked for the Marine Mammal Physiology Project as an animal trainer from 1998 to 2001. Robin 
                    is responsible for the day to day operations of the stranding network and works with the stranding 
                    coordinator and the director to coordinate stranding response for Santa Cruz County.'
                        photo={robinImg} />
                </div>
                <div class="row">
                    <Researcher name='Juliana Limon' bio='Juliana Limon is a Stranding Technician for the Long Marine Lab Stranding 
                    Network. She is a recent graduate with a major in Marine Biology at UCSC. She began volunteering 
                    for the Long Marine Lab stranding network shortly after she transferred to UCSC in 2019 and got 
                    hired as a Stranding Technician in 2021. During her time as an undergrad she participated in 
                    research at UCSC, California Academy of Sciences, and the Monterey Bay Aquarium Research Institute. 
                    She has plans to pursue graduate school in the near future with the hopes to enter the field of 
                    conservation genomics. '
                        photo={juliImg} />
                </div>
                <div class="row">
                    <Researcher name='Maia Smith' bio='Maia Smith is a Stranding Technician for the Long Marine Lab Stranding Network. 
                    She is a recent graduate with a major in Marine Biology at UCSC. She began volunteering for the Long Marine Lab 
                    stranding network in 2017 as a first year and got hired as a Stranding Technician in 2021. During her time as an 
                    undergrad she participated in research at UCSC, Moss Landing, and The Marine Mammal Center. She has plans to continue 
                    research on marine mammals in graduate school. '
                        photo={maiaImg} />
                </div>
                {/*<div class="row">
                    <Researcher name='Samantha Rozal' bio=''
                        photo={avatar} />
                </div>*/}
            </div>
        </div>
    );
  }
}

export default Team