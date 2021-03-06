import * as React from "react";
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { Link } from "react-router-dom";
import "./css/banner.css";

export default function Banner() {
  const auth = document.cookie.indexOf("Bearer") !== -1;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            />

            {!auth && (
              <div>
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
                    <MenuItem>
                      <Link to="./login" className="linkToButton">Connexion</Link>
                    </MenuItem>

                    <MenuItem>
                      <Link to="./signup" className="linkToButton">Inscription</Link>
                    </MenuItem>
                  </Menu>
                </Box>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                >
                  Groupomania
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  <MenuItem>
                    <Link to="./login" className="linkToButton">Connexion</Link>
                  </MenuItem>

                  <MenuItem>
                    <Link to="./signup" className="linkToButton">Inscription</Link>
                  </MenuItem>
                </Box>
              </div>
            )}

            {auth && (
              <div>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="G??rer mon profil">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Ic??ne d'une personne" />
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
                    <MenuItem>
                      <Link to="./account" className="linkToButton">Mon profil</Link>
                    </MenuItem>

                    <MenuItem>
                      <a onClick={eraseCookie} className="linkToButton">Se d??connecter</a>
                    </MenuItem>
                  </Menu>
                </Box>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
function eraseCookie() {
  document.cookie = "Bearer=; max-age=0; path=/;";
  // Rediriger vers la page de connexion
  window.location.href = "/login";
}
