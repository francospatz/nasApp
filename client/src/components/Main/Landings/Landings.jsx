import React, { useState, memo } from "react";
import List from "./List/";
import Map from "./Map";
import Box from '@mui/material/Box';
import useFetch from "../../../hooks/useFetch";
import CircularProgress from '@mui/material/CircularProgress';


const Landings = () => {
  const [deps, setDeps] = useState("landings");
  const [position, setPosition] = useState([40.2085, -3.7130])
  const { loading, result } = useFetch("/api/astronomy/" + deps); // request to it's own mother route with useFetch custom hook
  
  const sendPosition = (pos) => {
    setPosition(pos);
  };

  const changeDeps = (dep) => { // handles diferent requests to the server
    setDeps(dep)
  }

  return (
    <div className="landings">
      <div className="map-container">
        {loading ? <Box sx={{ display: 'flex' }}>
          <CircularProgress sx={{color: "#B9C6AE"}} />
        </Box> 
        : 
        <Map result={result} position={position} changeDeps={changeDeps}/>} {/* paints leaflet map */}
      </div>
      <div className="list-container">{loading ? "" : <List data={result} sendPosition={sendPosition}/>}</div> {/* once loaded, prints list */} 
    </div>
  );
};

export default memo(Landings);