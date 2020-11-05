import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import './LandingPage.css';
import RegisterForm from '../RegisterForm/RegisterForm';

class LandingPage extends Component {
  state = {
    heading: 'Class Component',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <Grid container justify='center' style={{textAlign:'center'}}>
        <Grid item xs={12}>
          <h2>Welcome to Herdsman!</h2>
        </Grid>
        <Grid item xs={12}>
        <p>Please Register for an account to get started</p>
        </Grid>
          <Grid xs={12}>
            <RegisterForm />

            <center>
              <h4>Already a Member?</h4>
              <Button variant='contained' color='default' className="btn btn_sizeSm" onClick={this.onLogin}>
                Login
              </Button>
            </center>
          </Grid>
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
