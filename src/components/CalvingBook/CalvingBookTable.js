import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router'
import { FormLabel } from '@material-ui/core';
import CalvingBookItem from './CalvingBookItem';


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
const CloseToCalvingTable = (props) => {
    const classes = useStyles();
    const [rows, setRows]=useState(props.closeToCalving)
    // useEffect(() => { props.dispatch({ type: 'GET_HERD' }) }, [])
    useEffect(()=> {setRows(props.closeToCalving)},[props.closeToCalving])

    //set up state for the filter function of the component
    const [filterHerd, setFilterHerd] = useState(false);

    //set up a function that will filter the herd based on the filter set up
    //we will not show calves in this component and we will not show archived animals in 
    //this component
    // const rows = () => {
    //     if (filterHerd) {
    //         return props.herd.filter(cow => cow.gender === filterHerd && !cow.calf && !cow.archived)
    //     } else if (props.herd[0]) { return props.herd.filter(cow => !cow.calf && !cow.archived) }
    //     else { return props.herd }
    // }

    //takes you the the CalfForm
    const addCalf = (cow) => {
        console.log(cow)
        props.history.push(`/add/calf/${cow.animal_id}`)
    }

    //takes you to the CowForm
    const addAnimal = () => {
        props.history.push('/add/cow');
    }


    return (

        <>
            {/* {console.log(rows())}
            {console.log(props)} */}


        <h5>{rows.length} {props.heading}</h5>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ textAlign: 'center' }}>Tag Number</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>Add Calf</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>Close to Calving</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows != undefined && rows.map(row => (<CalvingBookItem key={row.animal_id} row={row} />))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>


        </>

    );

}

const map = (state) => ({ herd: state.herd, })

export default connect(map)(withRouter(CloseToCalvingTable));