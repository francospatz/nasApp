import React, { useState, memo } from "react";
import List from "./List/";
import Map from "./Map";
import Box from '@mui/material/Box';
import useFetch from "../../../hooks/useFetch";
import CircularProgress from '@mui/material/CircularProgress';


const Landings = () => {
  const [deps, setDeps] = useState("landings");
  const [position, setPosition] = useState([40.2085, -3.7130])
  const { loading, result } = useFetch(
    "/api/astronomy/" + deps
  );
  
  const sendPosition = (pos) => {
    setPosition(pos);
  };

  const changeDeps = (dep) => {
    setDeps(dep)
  }

  return (
    <div className="landings">
      <div className="map-container">
        {loading ? <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box> 
        : 
        <Map result={result} position={position} changeDeps={changeDeps}/>}
      </div>
      <div className="list-container">{loading ? "" : <List data={result} sendPosition={sendPosition}/>}</div>
    </div>
  );
};

export default memo(Landings);