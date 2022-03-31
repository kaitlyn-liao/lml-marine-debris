// DataVis.js renders the data visualization page.
// This page will display the components which render the interactive 
// map, the data filters, and the informational popup with graphs

// DataVis.js is rendered by Controller.js, and renders 
// the children Map.js, Filters.js, and Display.js

import React from 'react';
import Graph from './Graph.js';
import mapImg from '../../images/placeholderMap.png'

class DataVis extends React.Component {
    
    render() {     
      const placeholderMapStyle = {
        // width: "100%",

      };
      return (
        // html goes here
        <div>
          
          <Graph />
          <img src={ mapImg } style={ placeholderMapStyle } alt=""></img>
          
        </div>
      );
      
    }
}
export default DataVis