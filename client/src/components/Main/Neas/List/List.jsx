import React, { useState, useEffect, memo } from "react";
import {  TextField, Button, Typography, Card } from '@mui/material';
import Paginator from "react-hooks-paginator";
import Expanded from "./Expanded/";
import CardHeader from "@mui/material/CardHeader";
import Avatar from '@mui/material/Avatar';
import { v4 as uuidv4 } from "uuid";

const List = (props) => { //works exactly how landings list do
  const [offset, setOffset] = useState(0);
  const [currentResult, setCurrentResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 25;
  const data = props.data;

  const [orbitClass, setOrbitClass] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orbitClass !== "") {
      props.changeDeps("neas/?orbit_class=" + orbitClass); 
      setOrbitClass("");
    } else if (from !== "" && to !== "") {
      props.changeDeps("neas/?from=" + from + "&to=" + to); 
      setFrom("");
      setTo("");
    } 
  };

  useEffect(() => {
    setCurrentResult(data.slice(offset, offset + pageLimit));
  }, [offset, data]);

  return (
    <div className="list">
      <Typography variant="h3" color="#8A95A5" sx={{ mt: 4, fontFamily: 'Abril Fatface', fontStyle: 'italic' }}>
        Neas list
      </Typography>
      <form onSubmit={handleSubmit} className="neas-form">
        <Typography variant="h5" color="#8A95A5" sx={{ mt: 4, fontFamily: 'Abril Fatface', fontStyle: 'italic' }}>
          Search
        </Typography>
        <TextField
          size="small"
          id="1"
          label="By orbit class."
          variant="outlined"
          value={orbitClass}
          onChange={(e) => {
            setOrbitClass(e.target.value)
            setFrom("")
            setTo("")
          }}
          sx={{background: "#8A95A5", color: "#474056"}}
          ></TextField>
        <TextField
          size="small"
          id="2"
          label="By year from"
          variant="outlined"
          value={from}
          onChange={(e) => {
            setFrom(e.target.value)
            setOrbitClass("")
          }}
          sx={{background: "#8A95A5", color: "#474056"}}></TextField>
        <TextField
          size="small"
          id="3"
          label="to"
          variant="outlined"
          value={to}
          onChange={(e) => {
            setTo(e.target.value)
            setOrbitClass("")
          }}
          sx={{background: "#8A95A5", color: "#474056"}}></TextField>
        <Button type="submit" sx={{ display: "none" }}></Button>
      </form>
      <section className="neas-list">
        {currentResult.map((nea, i) => (
          <Card sx={{ width: 340, margin: 1, background: "#B9C6AE" }} key={uuidv4()} >
            <CardHeader
              title={nea.designation}
              subheader={nea.discovery_date}
              avatar={
                <Avatar sx={{ bgcolor: "#474056" }}>
                  N
                </Avatar>
              }
            />
            <Expanded data={nea} />
          </Card>
        ))}
      </section>
      <Paginator
        totalRecords={data.length}
        pageLimit={pageLimit}
        pageNeighbours={4}
        setOffset={setOffset}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default memo(List);
