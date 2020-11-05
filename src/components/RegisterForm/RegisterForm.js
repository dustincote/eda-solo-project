import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.state.username,
        password: this.state.password,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };// end handleInputChangeFor

  render() {
    return (
      <Grid container justify='center' alignItems='center'>
        <Grid xs={8} sm={5} md={4} lg={4} style={{ textAlign: 'center', margin: 15 }}>
          <Card>
            <form onSubmit={this.registerUser}>
              <h2>Register User</h2>
              {this.props.store.errors.loginMessage && (
                <h3 className="alert" role="alert">
                  {this.props.store.errors.loginMessage}
                </h3>
              )}
              <div>
                <TextField
                  style={{ margin: 15 }}
                  variant='outlined'
                  type="text"
                  name="username"
                  label='Username'
                  required
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
              </div>
              <div>
                <TextField
                  style={{ margin: 15 }}
                  label='Password'
                  variant='outlined'
                  type="password"
                  name="password"
                  required
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
              </div>
              <Button
                style={{ margin: 15 }}
                type="submit"
                color='default'
                variant='contained'>Sign Up</Button>
            </form>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default connect(mapStoreToProps)(RegisterForm);
