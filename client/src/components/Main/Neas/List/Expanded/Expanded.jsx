import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import { CardContent, CardActions, Collapse, IconButton, Typography, Button } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from "../../../../../context/cartContext";
import { useAuth0 } from "@auth0/auth0-react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Expanded = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [added, setAdded] = useState(false);
  const { isAuthenticated } = useAuth0();
  const { addProduct } = useContext(CartContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (isAuthenticated) {
    return (
      <div>
        <CardActions disableSpacing>
          <Button onClick={() => {
            addProduct(props.data.designation);
            setAdded(!added);
          }}>
            <ShoppingCartIcon sx={{color: "#757083"}}/>
            <Typography paragraph sx={{margin: 0, color: "#757083"}}>{added ? "Remove from cart" : "Add to cart"}</Typography>
          </Button>      
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{props.data.pha === "Y" ? "Potentially hazardous object" : "Not hazardous"}</Typography>
            <Typography paragraph>Orbit class: {props.data.orbit_class}</Typography>
            <Typography paragraph>Period year: {props.data.period_yr}</Typography>
            <Typography paragraph>H mag: {props.data.h_mag}</Typography>
            <Typography paragraph>Moid au: {props.data.moid_au}</Typography>
            <Typography paragraph>Q au 1: {props.data.q_au_1}</Typography>
            <Typography paragraph>Q au 2: {props.data.q_au_2}</Typography>
            
            
            
          </CardContent>
        </Collapse>
      </div>
    );
  } else {
    return (
      <div>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>H mag: {props.data.h_mag}</Typography>
            <Typography paragraph>Moid au: {props.data.moid_au}</Typography>
            <Typography paragraph>Q au 1: {props.data.q_au_1}</Typography>
            <Typography paragraph>Q au 2: {props.data.q_au_2}</Typography>
            <Typography paragraph>Period year: {props.data.period_yr}</Typography>
            <Typography paragraph>I deg: {props.data.i_deg}</Typography>
            <Typography paragraph>Pha: {props.data.pha}</Typography>
            <Typography paragraph>Orbit class: {props.data.orbit_class}</Typography>
          </CardContent>
        </Collapse>
      </div>
    );
  }
};

export default Expanded;
