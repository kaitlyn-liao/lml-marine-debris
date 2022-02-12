import React, {Component} from "react";

class heatItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 0,
        };
    }
    render() {
        if (document.getElementById('Heatmap').state["value"] == 1){
            return (
                <div class="button is-Link is-pulled-right">Heatmap Display</div>
            )
        }
        
    }
}

export default heatItem;