// DataVis.js renders the data visualization page.
// This page will display the components which render the interactive 
// map, the data filters, and the informational popup with graphs

// DataVis.js is rendered by Controller.js, and renders 
// the children Map.js, Filters.js, and Display.js

import React from 'react';
import Graph from './Graph.js';
import Map from './Map.js';
import mapImg from '../../images/placeholderMap.png'

class DataVis extends React.Component {
    
    render() {
      return (
        // html goes here
        <div>
          <div class="row">
            <div class="col-md-1">
              <Graph />
            </div>
            <div class="col">
              <i className="text-secondary">Press "esc" to close a beach tag.</i>
            </div>
          </div>
          <Map />
        </div>
      );
      
    }
}
export default DataVis