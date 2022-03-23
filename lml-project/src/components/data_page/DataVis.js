// DataVis.js renders the data visualization page.
// This page will display the components which render the interactive 
// map, the data filters, and the informational popup with graphs

// DataVis.js is rendered by Controller.js, and renders 
// the children Map.js, Filters.js, and Display.js

import React from 'react';
import BarChart from '../charts/BarChart.js';
import PieChart from '../charts/PieChart.js';
import StackedChart from '../charts/StackedChart.js';
import ComparisonChart from '../charts/ComparisonChart.js';

class DataVis extends React.Component {
    
    render() {     
      return (
        // html goes here
        <div>
          <hr></hr>
          <BarChart/>
          <hr></hr>
          <StackedChart/>
          <hr></hr>
          <ComparisonChart/>
          <hr></hr>
          <PieChart/>
          <hr></hr>
        </div>
      );
      
    }
}
export default DataVis