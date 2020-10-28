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
const AlreadyCalvedTable = (props) => {
    const classes = useStyles();
    const [calved, setCalved] = useState([])
    const [rows, setRows] = useState(props.herd)
    useEffect(() => { props.dispatch({ type: 'GET_HERD' }) }, [])
    useEffect(() => { setCalved(props.herd.filter(cow =>  cow.calf && !cow.archived).map(cow => Number(cow.dam_id))) }, [props.herd])
    useEffect(() => { setRows(props.herd.filter(cow => calved.indexOf(cow.animal_id)!= -1)) }, [calved])



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
            {console.log('calved is', calved)}
            


            <h1>{rows.length} Already Calved</h1>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ textAlign: 'center' }}>Tag Number</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>More Details</TableCell>
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

export default connect(map)(withRouter(AlreadyCalvedTable));