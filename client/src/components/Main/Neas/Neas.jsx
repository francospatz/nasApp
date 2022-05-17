import React, { useState, memo } from "react";
import List from "./List/";
import useFetch from "../../../hooks/useFetch";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Neas = () => {
  const [deps, setDeps] = useState("neas");
  const { loading, result } = useFetch( // makes request with custom hook useFetch
    "/api/astronomy/" + deps
  );

  const changeDeps = (dep) => { // sets deps, which makes custom hook uiseFetch send a request
    setDeps(dep)
  }

  return (
    <div className="neas">
      <div className="list-container">{loading ? 
        <Box sx={{ display: 'flex' }}>
          <CircularProgress sx={{color: "#B9C6AE"}}/>
        </Box>  
        : 
        <List data={result} changeDeps={changeDeps}/>}</div>
    </div>
  );
};

export default memo(Neas);