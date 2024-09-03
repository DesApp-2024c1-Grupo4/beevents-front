import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Logo from "../assets/img/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { customMuiTheme } from "../config/customMuiTheme";
import UserService from "../services/userService";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function Header() {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const userService = new UserService();
  const [user, setUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { contrastGreen } = customMuiTheme.colors;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = userService.getUserFromLocalStorage();
    console.log(currentUser);
    setUser(currentUser);
  }, [location]);

  const handleLogout = () => {
    userService.removeUserFromLocalStorage();
    setUser(null);
    navigate("/");
    window.scrollTo(0, 0);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const menuItems = [
    <Button
      key="Inicio"
      component={Link}
      to="/"
      onClick={handleCloseNavMenu}
      sx={{
        display: "flex",
        whiteSpace: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        my: 2,
        mx: 1,
        px: 2,
        color: "white",
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
    </Button>,
    <Button
      key="Eventos"
      component={Link}
      to="/events"
      onClick={handleCloseNavMenu}
      sx={{
        display: "flex",
        whiteSpace: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        my: 2,
        mx: 1,
        px: 2,
        color: "white",
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
    </Button>,
  ];

  if (user === null) {
    menuItems.push(
      <Button
        key="Ingresar"
        component={Link}
        to="/auth/login"
        onClick={handleCloseNavMenu}
        sx={{
          display: "flex",
          whiteSpace: "nowrap",
          justifyContent: "center",
          alignItems: "center",
          width: "8rem",
          my: 2,
          mx: 1,
          px: 4,
          color: "white",
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
    );
  } else if (user.role === "user") {
    menuItems.push(
      <Button
        key="MiPerfil"
        component={Link}
        to="/account"
        sx={{
          display: "flex",
          whiteSpace: "nowrap",
          justifyContent: "center",
          alignItems: "center",
          width: "8rem",
          my: 2,
          mx: 1,
          px: 4,
          color: "white",
          textDecoration: "none",
          "&:hover .MuiSvgIcon-root": {
            color: contrastGreen,
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:visited": {
            color: "white",
          },
        }}
      >
        <PersonOutlineRoundedIcon sx={{ mr: 1 }} />
        Mi perfil
      </Button>,
      <Button
        key="CerrarSesion"
        onClick={handleLogout}
        sx={{
          display: "flex",
          whiteSpace: "nowrap",
          justifyContent: "center",
          alignItems: "center",
          width: "8rem",
          my: 2,
          mx: 1,
          px: 4,
          color: "white",
          textDecoration: "none",
          "&:hover .MuiSvgIcon-root": {
            color: contrastGreen,
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:visited": {
            color: "white",
          },
        }}
      >
        <LogoutIcon sx={{ mr: 1 }} />
        Cerrar sesión
      </Button>
    );
  } else {
    menuItems.push(
      <Button
        key="CrearEvento"
        component={Link}
        to="/create_event"
        onClick={handleCloseNavMenu}
        sx={{
          display: "flex",
          whiteSpace: "nowrap",
          justifyContent: "center",
          alignItems: "center",
          my: 2,
          mx: 1,
          px: 2,
          color: "white",
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
      </Button>,
      <Button
        key="MiPerfil"
        component={Link}
        to="/account"
        sx={{
          display: "flex",
          whiteSpace: "nowrap",
          justifyContent: "center",
          alignItems: "center",
          width: "8rem",
          my: 2,
          mx: 1,
          px: 4,
          color: "white",
          textDecoration: "none",
          "&:hover .MuiSvgIcon-root": {
            color: contrastGreen,
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:visited": {
            color: "white",
          },
        }}
      >
        <PersonOutlineRoundedIcon sx={{ mr: 1 }} />
        Mi perfil
      </Button>,
      <Button
        key="CerrarSesion"
        onClick={handleLogout}
        sx={{
          display: "flex",
          whiteSpace: "nowrap",
          justifyContent: "center",
          alignItems: "center",
          width: "8rem",
          my: 2,
          mx: 1,
          px: 4,
          color: "white",
          textDecoration: "none",
          "&:hover .MuiSvgIcon-root": {
            color: contrastGreen,
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:visited": {
            color: "white",
          },
        }}
      >
        <LogoutIcon sx={{ mr: 1 }} />
        Cerrar sesión
      </Button>
    );
  }

  return (
    <AppBar
      position="static"
      sx={{
        minHeight: isTablet ? "5vh" : "10vh",
        backgroundColor: "var(--primary-color)",
        color: "var(--color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
              {menuItems}
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
            {user === null && (
              <Button
                component={Link}
                to="/auth/login"
                onClick={handleCloseNavMenu}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "8rem",
                  my: 2,
                  mx: 1,
                  px: 4,
                  color: "white",
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
            )}
            {user !== null && user.role === "admin" && (
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
            )}
            {user !== null && (
              <>
                <Button
                  component={Link}
                  to="/account"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "4rem",
                    ml: 1,
                    my: 2,
                    pl: 4,
                    pr: 1,
                    color: "white",
                    textDecoration: "none",
                    "&:hover .MuiSvgIcon-root": {
                      color: contrastGreen,
                    },
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                    "&:visited": {
                      color: "white",
                    },
                  }}
                >
                  <PersonOutlineRoundedIcon />
                </Button>
                <Button
                  onClick={handleLogout}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "4rem",
                    my: 2,
                    pl: 1,
                    pr: 4,
                    color: "white",
                    textDecoration: "none",
                    "&:hover .MuiSvgIcon-root": {
                      color: contrastGreen,
                    },
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                    "&:visited": {
                      color: "white",
                    },
                  }}
                >
                  <LogoutIcon />
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
