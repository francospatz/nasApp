import React, { useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import Expanded from "./Expanded/";
import { Card, Typography } from "@mui/material/";
import CardHeader from "@mui/material/CardHeader";
import Avatar from '@mui/material/Avatar';
import { v4 as uuidv4 } from "uuid";

const List = (props) => {
  // paginator
  const [offset, setOffset] = useState(0);
  const [currentResult, setCurrentResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 25;
  const data = props.data;

  useEffect(() => {
    setCurrentResult(data.slice(offset, offset + pageLimit));
  }, [offset, data]);

  return (
    <div className="list">
      <Typography variant="h3" color="#8A95A5" sx={{ mb: 4, mt: 4, fontStyle: 'italic', fontFamily: 'Abril Fatface' }}>
        Landings list
      </Typography>
      
      <section className="landings-list">
        {currentResult.map((landing) => (
          <Card sx={{ width: 340, margin: 1, background: "#B9C6AE" }} key={uuidv4()} >
            <CardHeader
              title={landing.name}
              subheader={landing.year}
              avatar={
                <Avatar sx={{ bgcolor: "#474056" }}>
                  L
                </Avatar>
              }
              onClick={() => { props.sendPosition([Number(landing.reclat), Number(landing.reclong)]) }
              }
            />
            <Expanded data={landing} /> {/* expanded details for each card, another component */}
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

export default List;

