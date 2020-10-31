import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import moment from 'moment';






//this is the component that will display all of the movies
//we will dispatch to get movies and genres on loading of the component
const PastureTableItem = (props) => {
    const row = props.row





    const details = () => {
        props.history.push(`/details/${row.animal_id}`)
    }

    const remove = () => {
        props.dispatch({ 
            type:'REMOVE_FROM_PASTURE', 
            payload:{
                pasture_record_id: row.pasture_record_id,
                date_out: moment().format('yyyy-MM-DD')}});
    }





    return (


        <TableRow key={row.animal_id}>
            <TableCell style={{ textAlign: 'center' }}>{row.tag_number}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>
                <Button
                    onClick={details}
                    style={{ fontSize: 10 }}
                    size="small"
                    variant="contained"
                    color="default">
                    Details
                </Button>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
                <Button
                    onClick={remove}
                    style={{ fontSize: 10 }}
                    size="small"
                    variant="contained"
                    color="default">
                    Remove
                </Button>
            </TableCell>

        </TableRow>

    );

}


export default connect()(withRouter(PastureTableItem));
