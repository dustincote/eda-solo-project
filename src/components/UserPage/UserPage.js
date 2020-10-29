import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import CalvingBookItem from '../CalvingBook/CalvingBookItem';
import CalvingBookTable from '../CalvingBook/CalvingBookTable';
import Grid from '@material-ui/core/Grid';
import { XYPlot, ArcSeries, XAxis, YAxis } from 'react-vis';

class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  componentDidMount(){this.props.dispatch({type: 'GET_HERD'})}
  render() {
    return (
     <>
        
        <Grid container direction='column' alignItems='center' justify='center'   >
          <h1>Home</h1>

            <CalvingBookTable closeToCalving={this.props.closeToCalving} heading={'Close To Calving'} />

            <CalvingBookTable closeToCalving={this.props.yetToCalf} heading={'Not Close'} />

            <LogOutButton  />
        </Grid>
         </>
        
     
    );
  }
}

const map = (state) => ({
  closeToCalving: state.closeToCalving,
  yetToCalf: state.yetToCalf,
})
// this allows us to use <App /> in index.js
export default connect(map)(UserPage);
