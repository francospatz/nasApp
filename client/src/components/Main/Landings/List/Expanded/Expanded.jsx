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
  const { isAuthenticated } = useAuth0();
  const [expanded, setExpanded] = useState(false);
  const [added, setAdded] = useState(false);
  const { addProduct } = useContext(CartContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (isAuthenticated) {
    return (
      <div>
        <CardActions disableSpacing>
          <Button onClick={() => {
            addProduct(props.data.name);
            setAdded(!added);
          }}>
            <ShoppingCartIcon/>
            <Typography paragraph sx={{margin: 0}}>{added ? "Remove from cart" : "Add to cart"}</Typography>
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
            <Typography paragraph>Class: {props.data.recclass}</Typography>
            <Typography paragraph>Mass: {props.data.mass}</Typography>
            <Typography paragraph>Fall: {props.data.fall}</Typography>
            <Typography>
              Geolocation: {props.data.reclat}, {props.data.reclong}
            </Typography>
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
            <Typography paragraph>Class: {props.data.recclass}</Typography>
            <Typography paragraph>Mass: {props.data.mass}</Typography>
            <Typography paragraph>Fall: {props.data.fall}</Typography>
            <Typography>
              Geolocation: {props.data.reclat}, {props.data.reclong}
            </Typography>
          </CardContent>
        </Collapse>
      </div>
    );
  }

  
};

export default Expanded;
