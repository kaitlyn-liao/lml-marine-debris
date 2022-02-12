import React, {Component} from "react";

class switchButton extends React.Component {
    constructor(props, id) {
        super(props);
        this.state = {
          value: 0,
          id: id,
        };
    }
    render() {
        if (this.state["value"] == 0){
            return (
                <div class="button is-danger is-pulled-right" onClick={() => this.setState({value: '1'})}>Off</div>
            )
        }
        else{
            return (
                <div class="button is-primary is-pulled-right" onClick={() => this.setState({value: '0'})}>On</div>
            )
        }
        
    }
}

export default switchButton;