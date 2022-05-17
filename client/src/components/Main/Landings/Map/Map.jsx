import React, { memo, useState } from "react";
import Control from "react-leaflet-custom-control";
import { styled, alpha } from "@mui/material/styles";
import { FormControl, TextField, Button, Menu, MenuItem, Divider, Typography } from '@mui/material';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Search } from "@mui/icons-material";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import * as L from "leaflet";

const StyledMenu = styled((props) => ( // MUI styles
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Map = (props) => {
  const [show, setShow] = useState(false);
  const [showing, setShowing] = useState("");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [lClass, setLClass] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (e) => { // handles form submit and changes deps to fetch
    e.preventDefault();
    sendDepsToParent(lClass);
    setShow(true)
  }

  const sendDepsToParent = (dep) => {
    props.changeDeps(dep)
  }

  const LeafIcon = L.Icon.extend({
    options: {},
  });

  const asteroidIcon = new LeafIcon({ // custom leaflet marker icon
    iconUrl: require("../../../../static/asteroid.png"),
    iconSize: [14],
  });



  return (

    <MapContainer center={props.position} zoom={5} id="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.result.map((landing, i) =>
        landing.reclat ? (
          <Marker
            icon={asteroidIcon}
            position={[parseInt(landing.reclat), parseInt(landing.reclong)]}
            key={i}
          >
            <Popup>
              <p>Name: {landing.name}</p>
              <p>Mass: {landing.mass}</p>
              <p>Class: {landing.recclass}</p>
              <p>Date: {landing.year}</p>
              <p>
                Geolocation: {landing.geolocation.latitude},{" "}
                {landing.geolocation.longitude}
              </p>
            </Popup>
          </Marker>
        ) : (
          []
        )
      )}
      <Control position="topleft">{show ? <p className="showing">Showing results for: {showing}</p> : ""}</Control>
      <Control position="topright">
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="outlined"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{ color: "#090C08"}}
        >
          Search
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          disableAutoFocusItem
        >
          <Typography sx={{ margin: 1.3 }}>Filters will also apply to the list below</Typography>
          <MenuItem disableRipple onKeyDown={(e) => e.stopPropagation()} >
            <Search />
            <form onSubmit={handleSubmit}>
              <FormControl>
                <TextField
                  id="1"
                  label="By class"
                  variant="outlined"
                  onInput={(e) => {
                    setLClass("landings/class/" + e.target.value)
                    setShow(false)
                    setShowing(e.target.value)
                  }}
                />
              </FormControl>
            </form>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem disableRipple onKeyDown={(e) => e.stopPropagation()}>
            <Search />
            <form onSubmit={handleSubmit}>
              <FormControl>
                <TextField
                  id="2"
                  label="By mass"
                  variant="outlined"
                  onInput={(e) => {
                    setLClass("landings/mass/" + e.target.value)
                    setShow(false)
                    setShowing(e.target.value)
                  }}
                />
              </FormControl>
            </form>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem disableRipple onKeyDown={(e) => e.stopPropagation()}>
            <Search />
            <form onSubmit={handleSubmit}>
              <FormControl>
                <TextField
                  id="3"
                  label="By year from"
                  variant="outlined"
                  onInput={(e) => {
                    setLClass("landings/mass/?from=" + e.target.value + "&to=" + toValue)
                    setFromValue(e.target.value)
                    setShowing(`${e.target.value} to ${toValue}`);
                    setShow(false)
                  }}
                />
                <br />
                <TextField
                  id="3"
                  label="to"
                  variant="outlined"
                  onInput={(e) => {
                    setLClass("landings/mass/?from=" + fromValue + "&to=" + e.target.value)
                    setToValue(e.target.value)
                    setShowing(`${fromValue} to ${e.target.value}`);
                    setShow(false)
                  }}
                />
                <Divider sx={{ my: 0.5, mt: 2 }} />
                
              </FormControl>
              <br />
              <Button onClick={() => props.changeDeps("landings")} sx={{color: "#474056"}}>Reset filter</Button>
            </form>
          </MenuItem>
        </StyledMenu>

      </Control>
    </MapContainer>
  );
};

export default memo(Map);
