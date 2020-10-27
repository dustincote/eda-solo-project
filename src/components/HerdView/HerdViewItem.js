import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';






//this is the component that will display all of the movies
//we will dispatch to get movies and genres on loading of the component
const HerdViewItem = (props) => {
    const row = props.row

 

    const addCalf = (row) => {
        console.log(row)
        props.history.push(`/add/calf/${row.animal_id}`)
    }

    const details = () => {
        props.history.push(`/details/${row.animal_id}`)
    }

    const handleCheck = (event) => {
        props.dispatch({ type: 'UPDATE_CLOSE_TO_CALVING', payload: {animal_id: row.animal_id, close_to_calving: !row.close_to_calving} });

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
                More Details
                </Button>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
                <FormControlLabel 
                    label="Mark as Close"
                    labelPlacement="top"
                    style={{textAlign: 'center', fontSize: 5,}} 
                    control={
                        <Checkbox 
                        color="primary" 
                        checked={row.close_to_calving} 
                        onChange={handleCheck} 
                        name="close_to_calving" 
                        />} />
                </TableCell>
        </TableRow>

    );

}

const map = (state) => ({ herd: state.herd, })

export default connect(map)(withRouter(HerdViewItem));