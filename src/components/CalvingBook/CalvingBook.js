import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router'
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
    grid: { marginBottom: 25, },
}));



//this component will display 3 tables, close to calving, not close, and already calved
//we bring in the data for these tables through props and the redux store
const CalvingBook = (props) => {
    const classes = useStyles();
    useEffect(() => { props.dispatch({ type: 'GET_HERD' }) },[])
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) },[]);





    return (

        <>
            {/* {console.log(rows())}
            {console.log(props)} */}
            <div style={{ textAlign: 'center', marginBottom: 40, marginLeft: 20, marginRight: 20 }}>
                <h1 className='view-heading'>Calving Book</h1>
                <hr />
            </div>
            <Grid
                className={classes.grid}
                container
                direction='column'
                alignItems="center"
                spacing={3}
            > 
 
            <CalvingBookTable  closeToCalving={props.closeToCalving} heading={'Close To Calving'} /> 
            <CalvingBookTable style={{ marginTop: 20 }} closeToCalving={props.yetToCalf} heading={'Not Close'} />
            <CalvingBookTable closeToCalving={props.alreadyCalved} heading={'Already Calved'} />
            </Grid>
        </>

    );

}

const mapState = (state) => ({ 
    herd: state.herd,
    yetToCalf: state.yetToCalf,
    alreadyCalved: state.alreadyCalved, 
    closeToCalving: state.closeToCalving });

export default connect(mapState)(withRouter(CalvingBook));