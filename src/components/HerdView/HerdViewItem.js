import React from 'react';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';






// This component is each individual row of the herd view component
const HerdViewItem = (props) => {
    const row = props.row

 
    // Takes user to details page for the animal selected
    const details = () => {
        props.history.push(`/details/${row.animal_id}`)
    }// end details

    // updates cow to close to calving
    const handleCheck = (event) => {
        props.dispatch({ type: 'UPDATE_CLOSE_TO_CALVING', payload: {animal_id: row.animal_id, close_to_calving: !row.close_to_calving} });

    }// end handleCheck



    

    return (


        <TableRow  key={row.animal_id}>
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
                        disabled={row.gender === 'bull'}
                        color="primary" 
                        checked={row.close_to_calving} 
                        onChange={handleCheck} 
                        name="close_to_calving" 
                        />} />
                </TableCell>
        </TableRow>

    );

}


export default connect()(withRouter(HerdViewItem));