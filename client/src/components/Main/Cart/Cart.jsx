import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/cartContext";
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Demo = styled('div')(({ theme }) => ({ //styles for MUI
  backgroundColor: theme.palette.background.paper,
}));

const Cart = () => {
  const { cart, addProduct, setCart } = useContext(CartContext);
  const [reRender, setReRender] = useState(false); 

  const handleReRender = () => { // handles rerender since changes on context don't rerender as changes on states do
    setReRender(!reRender)
  }

  useEffect(() => {
    //localCart() // arreglar lectura del localStorage
  });

  const checkout = () => { // removes localstorage item
    setCart([]);
    localStorage.removeItem("cart");
  }
  
  if (cart.length > 0) {
    return (
        <div className="cart">
        <Box sx={{ flexGrow: 1, maxWidth: 752 }} className="cart-items">
          <Typography sx={{ mt: 4, mb: 2, color: "#B9C6AE", fontStyle: 'italic', fontFamily: 'Abril Fatface' }} variant="h3" component="div" className="your-cart">
            Your cart
          </Typography>
          <Demo>
            <List sx={{background: "#8A95A5"}}>
              {cart.map((product, i) => <ListItem key={i}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" sx={{color:"#B9C6AE"}} onClick={() => {
                    addProduct(product);
                    handleReRender();
                  }}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#474056" }}>
                    <ArrowRightAltIcon sx={{ color: "#B9C6AE" }}/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={product}
                />
              </ListItem>)
              }
            </List>
          </Demo>
        </Box>
        <Link to="/checkout" className="a">
          <Button /* variant="outlined" */ sx={{color: "#8A95A5", ml: 2, mt: 2}} onClick={() => checkout()} >
            <ShoppingCartIcon/> Request purchase
          </Button>
        </Link>
        </div>
      );
  } else {
    return (
      <Typography sx={{ mt: 4, mb: 2, color: "#B9C6AE", fontFamily: 'Abril Fatface' }} variant="h6" component="div">Your cart will show up once you select at least one product</Typography>
    );
  }

  
};

export default Cart;
