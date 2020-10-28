import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router'
import { FormLabel } from '@material-ui/core';
import CalvingBookItem from './CalvingBookItem';
import CalvingBookTable from './CalvingBookTable';



const useStyles = makeStyles((theme) => ({
    input: {
        marginTop: 25,
        color: "white",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    container: {
        maxHeight: 440,
        width: 'auto',
        textAlign: 'center',
    },
    root: { width: 500 },
    grid: { marginBottom: 25 },
}));



//this component will bring in the entire herd and display it 
//in table form
const CalvingBook = (props) => {
    const classes = useStyles();
    useEffect(() => { props.dispatch({ type: 'GET_HERD' }) }, [])




    return (

        <>
            {/* {console.log(rows())}
            {console.log(props)} */}
            <Grid
                className={classes.grid}
                container
                direction='column'
                alignItems="center"
                spacing={0}
            > 
            <CalvingBookTable closeToCalving={props.closeToCalving} heading={'Close To Calving'} /> 
            <CalvingBookTable closeToCalving={props.yetToCalf} heading={'Not Close'} />
            <CalvingBookTable closeToCalving={props.alreadyCalved} heading={'Already Calved'} />
            </Grid>
        </>

    );

}

const map = (state) => ({ 
    herd: state.herd,
    yetToCalf: state.yetToCalf,
    alreadyCalved: state.alreadyCalved, 
    closeToCalving: state.closeToCalving });

export default connect(map)(withRouter(CalvingBook));