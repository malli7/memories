import React from "react";
import useStyles from "./styles";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  const goHome = () => {
    navigate('/')
  }

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <img
          className={classes.image}
          src="https://thumbs.dreamstime.com/b/memories-word-metal-type-mixed-vintage-printing-blocks-over-grunge-wood-50272791.jpg"
          alt="memories"
          height="60"
          onClick={goHome}
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6" >{user.result.name}</Typography>
            <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">SignIn</Button>
        )

        }
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
