// Team.js renders the Team Page for the site
// This page will display information about the Developement team as
//  well as the LML Research team in the form of Member Components

// Team.js is rendered by Controller.js, and renders the child Member.js

import React from 'react';
import avatar from '../team_page/images/default-avatar.png'
import githubButton from '../team_page/images/GitHub-Mark.png'
import linkedInButton from '../team_page/images/linkedin.png'

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
*  Description: The sponsor class, for LML sponsors, no GitHub or LinkedIn links
*  Inputs: name, bio, photo
*  Outputs: formatted card for LML team member with given info
*/
function Sponsor(props) {
    return (
        <div>
            <div class="sponsor-box">
                <div class="row">
                    <div class="col-sm">
                        <div class="row">
                            <h3 class="name">{props.name}</h3>
                            <p class="bio">{props.bio}</p>
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
                    <Member name='Kaitlyn Liao' bio='Product Owner and Software Engineer, Computer Science student at UCSC' github="https://github.com/kaitlyn-liao/lml-marine-debris"
                            photo={avatar} linkedIn="https://www.linkedin.com/"/>
                </div>
                    
                <div class="row">
                    <Member name='Noah Cantwell' bio='Developer and Software Engineer, Computer Science student at UCSC' github="https://github.com/kaitlyn-liao/lml-marine-debris"
                        photo={avatar} linkedIn="https://www.linkedin.com/"/>
                </div>
                <div class="row">
                    <Member name='Bridget Chew' bio='Developer and Software Engineer, Computer Science student at UCSC' github="https://github.com/kaitlyn-liao/lml-marine-debris"
                        photo={avatar} linkedIn="https://www.linkedin.com/"/>
                </div>
                <div class="row">
                    <Member name='Spencer Fulgham' bio='Developer and Software Engineer, Computer Science student at UCSC' github="https://github.com/kaitlyn-liao/lml-marine-debris"
                        photo={avatar} linkedIn="https://www.linkedin.com/"/>
                </div>
                <div class="row">
                    <Member name='Zachary Miller' bio='Developer and Software Engineer, Computer Science student at UCSC' github="https://github.com/kaitlyn-liao/lml-marine-debris"
                        photo={avatar} linkedIn="https://www.linkedin.com/"/>
                </div>
                
                <h1>Ackowledgements</h1>
                <p>We would like to thank our sponsors from the UCSC Long Marine Lab and Professor Jullig.<br/>
                    In adddition, we would like team behind the Marine Mammal Stranding Map, which served<br/>
                    as inspiration and a starting point for our project.</p>
            </div>
        
            <div class="col-lg float-end">
                <div class="text-end"><h1>Meet the LML Team</h1>
                <p>From the UCSC Long Marine Lab.</p></div>
                <p><br></br></p>
                <div class="row">
                    <Sponsor name='Robin Dunkin' bio='Professor at UCSC'
                        photo={avatar} />
                </div>
                <div class="row">
                    <Sponsor name='Juli Limon' bio=''
                        photo={avatar} />
                </div>
                <div class="row">
                    <Sponsor name='Maia Smith' bio=''
                        photo={avatar} />
                </div>
                <div class="row">
                    <Sponsor name='Sam' bio=''
                        photo={avatar} />
                </div>
            </div>
        </div>
    );
  }
}

export default Team