import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Grid from '@material-ui/core/Grid';

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <Grid container alignItems='center' className="nav">
      <Grid item xs={2}>
      <NavLink to="/home">
        <img id='logo' src='herdsman.png'/>
      </NavLink>
      </Grid>
      <Grid item xs={10}>
      <Grid container justify='flex-end' className="nav-right">
       
        <NavLink className="nav-link" to={loginLinkData.path}>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {loginLinkData.text}
        </NavLink>

        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id && (
          <>
            <NavLink className="nav-link" to="/calvingbook">
              CalvingBook
            </NavLink>
            <NavLink className="nav-link" to="/herd">
              Herd
            </NavLink>
            <NavLink className="nav-link" to="/pasture/">
              Pasture
            </NavLink>

            <LogOutButton className="nav-link" />
          </>
        )}
        {/* Always show this link since the about page is not protected */}
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default connect(mapStoreToProps)(Nav);
