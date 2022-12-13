import React from 'react';

import './Map.css';

const Map = props => {

  
  const { latitude,longitude } = props;
  return (
    <div
      className={`map ${props.className}`}
      style={props.style}
    ><h1>{latitude}</h1>
     <h1>{longitude}</h1>
    </div>
  );
};

export default Map;



