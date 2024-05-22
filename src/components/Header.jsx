import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../assets/img/logo.png";
import { customMuiTheme } from "../config/customMuiTheme";

const pages = ["Inicio", "Eventos", "Ingresar"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { contrastGreen, oceanicBlue } = customMuiTheme.colors;

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
    <AppBar
      position="static"
      sx={{
        height: "10vh",
        backgroundColor: "var(--primary-color)",
        color: "var(--color)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              style={{ width: 100, marginRight: 10 }}
            />
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
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
              <Button
                component={Link}
                to="/"
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mx: 1,
                  px: 2,
                  color: "white",
                  display: "block",
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: contrastGreen,
                    border: `2px solid ${contrastGreen}`,
                  },
                  "&:visited": {
                    color: "white",
                  },
                }}
              >
                Inicio
              </Button>
              <Button
                component={Link}
                to="/events"
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mx: 1,
                  px: 2,
                  color: "white",
                  display: "block",
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: contrastGreen,
                    border: `2px solid ${contrastGreen}`,
                  },
                  "&:visited": {
                    color: "white",
                  },
                }}
              >
                Eventos
              </Button>
              <Button
                component={Link}
                to="/create_event"
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mx: 1,
                  px: 2,
                  color: "white",
                  display: "block",
                  border: `1px solid ${contrastGreen}`,
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: contrastGreen,
                  },
                  "&:visited": {
                    color: "white",
                  },
                }}
              >
                Crear evento
              </Button>
              <Button
                component={Link}
                to="/auth/login"
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mx: 1,
                  px: 4,
                  color: "white",
                  display: "block",
                  border: `1px solid ${contrastGreen}`,
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: contrastGreen,
                  },
                  "&:visited": {
                    color: "white",
                  },
                }}
              >
                Ingresar
              </Button>
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <Button
              component={Link}
              to="/"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                mx: 1,
                px: 4,
                color: "white",
                display: "block",
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: contrastGreen,
                },
                "&:visited": {
                  color: "white",
                },
              }}
            >
              Inicio
            </Button>
            <Button
              component={Link}
              to="/events"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                mx: 1,
                px: 3,
                color: "white",
                display: "block",
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: contrastGreen,
                },
                "&:visited": {
                  color: "white",
                },
              }}
            >
              Eventos
            </Button>
            <Button
              component={Link}
              to="/create_event"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                mx: 1,
                px: 2,
                color: "white",
                display: "block",
                border: `1px solid ${contrastGreen}`,
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: contrastGreen,
                },
                "&:visited": {
                  color: "white",
                },
              }}
            >
              Crear evento
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              component={Link}
              to="/auth/login"
              sx={{
                my: 2,
                mx: 1,
                px: 4,
                color: "white",
                display: "block",
                border: `1px solid ${contrastGreen}`,
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: contrastGreen,
                },
                "&:visited": {
                  color: "white",
                },
              }}
            >
              Ingresar
            </Button>
          </Box>
          {/* <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                flexGrow: 0,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
