import React, { useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import Expanded from "./Expanded/";
import { Card, Typography } from "@mui/material/";
import CardHeader from "@mui/material/CardHeader";
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { v4 as uuidv4 } from "uuid";

const List = (props) => {
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
      <Typography variant="h3" color="white" sx={{ mb: 4, mt: 4 }}>
        Landings list
      </Typography>
      <Paginator
        totalRecords={data.length}
        pageLimit={pageLimit}
        pageNeighbours={4}
        setOffset={setOffset}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <section className="landings-list">
        {currentResult.map((landing) => (
          <Card sx={{ width: 340, margin: 1 }} key={uuidv4()} >
            <CardHeader
              title={landing.name}
              subheader={landing.year}
              avatar={
                <Avatar sx={{ bgcolor: red[600] }}>
                  L
                </Avatar>
              }
              onClick={() => { props.sendPosition([Number(landing.reclat), Number(landing.reclong)]) }
              }
            />
            <Expanded data={landing} />
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

