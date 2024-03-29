import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

const Header = () => {
  const { user, isAuthenticated } = useAuth0();// let's you check if user is authenticated and see user credentials
  const { loginWithRedirect } = useAuth0(); // let's you login with auth0
  const { logout } = useAuth0();// let's you logout with auth0
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // makes MUI work
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (isAuthenticated) { // checks if user is authenticated and renders if true
    return (
      isAuthenticated && (
        <AppBar position="static" style={{ background: "#474056" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <RocketLaunchIcon sx={{ display: { xs: "none", md: "flex", color: "#B9C6AE", fontSize: 40 }, mr: 1 }} />
              <Link to="/" className="a2">
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "#090C08",
                    textDecoration: "none",
                    fontSize: 30,
                    fontFamily: 'Abril Fatface',
                    fontStyle: 'italic'
                  }}
                  className="NASAPP"
                >
                  NASAPP
                </Typography>
              </Link>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" }
                  }}
                >
                  <MenuItem key={1} onClick={handleCloseNavMenu}>
                    <Link to="/landings" className="a">
                      <Typography
                        noWrap
                        textalign="center"
                        sx={{
                          textDecoration: "none",
                          color: "#8A95A5"
                        }}
                      >
                        Landings
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem key={2} onClick={handleCloseNavMenu}>
                    <Link to="/neas" className="a">
                      <Typography
                        noWrap
                        textalign="center"
                        sx={{
                          textDecoration: "none",
                          color: "#8A95A5"
                        }}
                      >
                        Neas
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem key={3} onClick={handleCloseNavMenu}>
                    <Link to="/cart" className="a">
                      <Typography
                        noWrap
                        textalign="center"
                        sx={{
                          textDecoration: "none",
                          color: "#8A95A5"
                        }}
                      >
                        Cart
                      </Typography>
                    </Link>
                  </MenuItem>
                </Menu>
              </Box>
              <RocketLaunchIcon sx={{ display: { xs: "flex", md: "none", color: "#B9C6AE", fontSize: 40 }, mr: 1 }} />
              <Link to="/" className="a2">
                <Typography
                  variant="h5"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontWeight: 700,
                    fontSize: 30,
                    letterSpacing: ".3rem",
                    color: "#090C08",
                    textDecoration: "none",
                    fontFamily: 'Abril Fatface',
                    fontStyle: 'italic'
                  }}
                >
                  NASAPP
                </Typography>
              </Link>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Link to="/landings" className="a">
                  <Button
                    key={3}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "#8A95A5", display: "block" }}
                  >
                    Landings
                  </Button>
                </Link>
                <Link to="/neas" className="a">
                  <Button
                    key={4}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "#8A95A5", display: "block" }}
                  >
                    Neas
                  </Button>
                </Link>
                <Link to="/cart" className="a">
                  <Button
                    key={5}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "#8A95A5", display: "block" }}
                  >
                    Cart
                  </Button>
                </Link>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.name}
                      src={user.picture}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Link to="/cart" className="a">
                    <MenuItem key={11} onClick={handleCloseUserMenu}>
                      <ShoppingCartIcon />
                      <Typography textalign="center">My Cart</Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem key={12} onClick={handleCloseUserMenu}>
                    <LogoutIcon />
                    <Typography textalign="center" onClick={() => logout({ returnTo: window.location.origin })}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )
    );
  } else { // renders if isAuthenticated is false
    return (
      <AppBar position="static" style={{ background: "#474056" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters >
            <RocketLaunchIcon sx={{ display: { xs: "none", md: "flex", color: "#B9C6AE", fontSize: 40 }, mr: 1 }} />
            <Link to="/" className="a2">
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "#090C08",
                    textDecoration: "none",
                    fontSize: 30,
                    fontFamily: 'Abril Fatface',
                    fontStyle: 'italic'
                  }}
                >
                  NASAPP
                </Typography>
              </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem key={1} onClick={handleCloseNavMenu}>
                <Link to="/landings" className="a">
                      <Typography
                        noWrap
                        textalign="center"
                        sx={{
                          textDecoration: "none",
                          color: "#8A95A5"
                        }}
                      >
                        Landings
                      </Typography>
                    </Link>
                </MenuItem>
                <MenuItem key={2} onClick={handleCloseNavMenu}>
                <Link to="/neas" className="a">
                      <Typography
                        noWrap
                        textalign="center"
                        sx={{
                          textDecoration: "none",
                          color: "#8A95A5"
                        }}
                      >
                        Neas
                      </Typography>
                </Link>
                </MenuItem>
              </Menu>
            </Box>
            <RocketLaunchIcon sx={{ display: { xs: "flex", md: "none", color: "#B9C6AE", fontSize: 40 }, mr: 1 }} />
            <Link to="/" className="a2">
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#090C08",
                textDecoration: "none",
                fontSize: 30,
                fontStyle: 'italic'
              }}
            >
              NASAPP
            </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to="/landings" className="a">
                <Button
                  key={3}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "#8A95A5", display: "block" }}
                >
                  Landings
                </Button>
              </Link>
              <Link to="/neas" className="a">
                <Button
                  key={4}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "#8A95A5", display: "block" }}
                >
                  Neas
                </Button>
              </Link>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Button textalign="center" sx={{ color: "#8A95A5" }} onClick={() => loginWithRedirect()}>
                <LoginIcon sx={{ mr: 1, color: "#8A95A5" }} />Login
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
};

export default Header;