import React from 'react';
import '../src/App.css';
import avatar from '../src/images/default-avatar.png'
import githubButton from '../src/images/GitHub-Mark.png'
import linkedInButton from '../src/images/linkedin.png'

/* When adding this file to the topology, make sure to transfer all images
    and the CSS properties for icon-button and profile-photo. */

function Member(props) {
    return (
        <div>
            <div class="conainer">
                <div class="row">
                    <div class="col-sm">
                        <div class="row">
                            <h3>{props.name}</h3>
                            <p>{props.bio}</p>
                        </div>
                        <div class="container">
                        <div class="row">
                            <a href={props.github}><img src={githubButton} class="icon-button"></img></a>
                            <p>&nbsp;</p>
                            <a href={props.linkedIn}><img src={linkedInButton} class="icon-button"></img></a>
                            
                        </div>
                        </div>
                    </div>
                    <div class="col-sm">
                        <img src={props.photo} class="img-thumbnail profile-photo"></img>
                    </div>
                    <div class="col-sm"></div>
                </div>
            </div>
            
        </div>
    );
}

function Team() {
    return (
        <div>
            <h1>Meet the Team</h1>
            <p>We are a team of five computer science students at UCSC.</p>
            <p>&nbsp;</p>
            <div class="container">
                <div class="row">
                    <Member name='Kaitlyn Liao' bio='Product Owner and Software Engineer' github="https://github.com/kaitlyn-liao/lml-marine-debris"
                            photo={avatar} linkedIn="https://www.linkedin.com/"/>
                </div><p>&nbsp;</p>
                <div class="row">
                    <Member name='Noah Cantwell' bio='Developer and Software Engineer' github="https://github.com/kaitlyn-liao/lml-marine-debris"
                        photo={avatar} linkedIn="https://www.linkedin.com/"/>
                </div><p>&nbsp;</p>
                <div class="row">
                    <Member name='Bridget Chew' bio='Developer and Software Engineer' github="https://github.com/kaitlyn-liao/lml-marine-debris"
                        photo={avatar} linkedIn="https://www.linkedin.com/"/>
                </div><p>&nbsp;</p>
                <div class="row">
                    <Member name='Spencer Fulgham' bio='Developer and Software Engineer' github="https://github.com/kaitlyn-liao/lml-marine-debris"
                        photo={avatar} linkedIn="https://www.linkedin.com/"/>
                </div><p>&nbsp;</p>
                <div class="row">
                    <Member name='Zachary Miller' bio='Developer and Software Engineer' github="https://github.com/kaitlyn-liao/lml-marine-debris"
                        photo={avatar} linkedIn="https://www.linkedin.com/"/>
                </div><p>&nbsp;</p>
            </div>
            <h1>Ackowledgements</h1>
            <p>We would like to thank our sponsors from the UCSC Long Marine Lab and Professor Jullig.<br/>
                In adddition, we would like team behind the Marine Mammal Stranding Map, which served<br/>
                as inspiration and a starting point for our project.</p>
        </div>
    );
}

export default Team;