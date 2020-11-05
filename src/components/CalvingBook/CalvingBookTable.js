import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withRouter } from 'react-router'
import CalvingBookItem from './CalvingBookItem';
import Typography from '@material-ui/core/Typography';


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
        margin: 10,
        maxHeight: 440,
        width: 'auto',
        textAlign: 'center',
    },
    root: { width: 500, textAlign:'center' },
    grid: { marginBottom: 25 },
    heading:{marginTop: 75, fontSize:18, marginBottom:10}
}));



// This is the table component for the close to calving page
const CloseToCalvingTable = (props) => {
    const classes = useStyles();
    const [rows, setRows]=useState(props.closeToCalving)
    useEffect(()=> {setRows(props.closeToCalving)},[props.closeToCalving])




    return (

        <>
            {/* {console.log(rows())}
            {console.log(props)} */}
            <Typography className={classes.heading}>{rows.length} {props.heading}</Typography> 
            <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow >
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