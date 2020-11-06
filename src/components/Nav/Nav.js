import React,{ useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Grid from '@material-ui/core/Grid';
import HomeOutlined from '@material-ui/icons/HomeOutlined'

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };
  const [size, setSize]= useState(window.innerWidth);

  const logOut = () => {
    props.dispatch({ type: 'LOGOUT' });
  }
  useEffect(() => {
    window.addEventListener('resize', sizeOfWindow);

    // returned function will be called on component unmount 
    return () => {
      window.removeEventListener('resize', sizeOfWindow)
    }
  }, [])

  const sizeOfWindow = () => {
    console.log(window.innerWidth);
    setSize(window.innerWidth);
  }

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
     {size > 640 && <Grid item xs={10}>
      <Grid container justify='flex-end' className="nav-right">
       
        <NavLink className="nav-link" to={loginLinkData.path}>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {loginLinkData.text}<br/>{loginLinkData.text === 'Home' && <HomeOutlined />}
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
            <Link className="nav-link" onClick={logOut}>Log Out</Link>
          </>
        )}
        {/* Always show this link since the about page is not protected */}
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
        </Grid>
      </Grid>}
    </Grid>
  );
};

export default connect(mapStoreToProps)(Nav);
