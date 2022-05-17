import React from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import { red } from '@mui/material/colors';

const Checkout = () => {
  return <div>
  <Typography sx={{ color: "white", width: 500, mt: 5 }} variant="h6" component="div">
    A purchase request has been sent to our team, we will send you an email after processing your purchase.
  </Typography>
  <Typography sx={{ color: "white", width: 500, mt: 2 }} variant="h6" component="div">
    The delay period is 2 to 4 weeks. Consider the wait, the purchase of giant space objects is not an easy thing to handle.
  </Typography>
  <Typography sx={{ color: "white", width: 500, mt: 2 }} variant="h6" component="div">
    Thanks!
  </Typography>
  <Typography sx={{ color: "white", width: 500, mt: 2 }} variant="body" component="div">
    The NASAPP team
  </Typography>
  <Link to="/" className="a2">
  <Button variant="outlined" sx={{color: red[600], mt: 3}}>
    Back to home
  </Button>
  </Link>
  </div>;
};

export default Checkout;
