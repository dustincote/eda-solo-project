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
import PastureTableItem from './PastureTableItem';

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
    root: { width: 'auto' },
    grid: { marginBottom: 25 },
}));




const PastureTable = (props) => {
    const classes = useStyles();
    const [rows, setRows] = useState(props.animals)
    useEffect(() => { setRows(props.animals) }, [props.animals])








    return (

        <>


           {props.heading && <><h5>{rows.length} {props.heading}</h5>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ textAlign: 'center' }}>Tag Number</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>Details</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>Remove From Pasture</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows != undefined && rows.map(row => (<PastureTableItem key={row.animal_id} row={row} />))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper></>}


        </>

    );

}

const map = (state) => ({ herd: state.herd, pastureRecords: state.pastureRecords })

export default connect(map)(withRouter(PastureTable));