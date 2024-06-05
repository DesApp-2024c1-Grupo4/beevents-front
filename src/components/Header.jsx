import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
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

export function Header() {
  const userService = new UserService();
  const [user, setUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { contrastGreen } = customMuiTheme.colors;
  const location = useLocation();

  useEffect(() => {
    const currentUser = userService.getUserFromLocalStorage();
    setUser(currentUser);
  }, [location]);

  const handleLogout = () => {
    userService.removeUserFromLocalStorage();
    setUser(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
              </Button>
              <Button
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
              </Button>
              {user === null ? (
                <Button
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
              ) : (
                <>
                  <Button
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
                  </Button>
                  <Button
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
                  </Button>
                  <Button
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
                    Log-out
                  </Button>
                </>
              )}
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
            {user === null ? (
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
            ) : (
              <>
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
