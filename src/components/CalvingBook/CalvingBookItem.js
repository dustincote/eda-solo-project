import React from 'react';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';






// this is each individual item in the table 
const CalvingBookItem = (props) => {
    const row = props.row



    const addCalf = () => {
        console.log(row)
        props.history.push(`/add/calf/${row.animal_id}`)
    }

    const handleCheck = (event) => {
        props.dispatch({ type: 'UPDATE_CLOSE_TO_CALVING', payload: { animal_id: row.animal_id, close_to_calving: !row.close_to_calving } });

    }





    return (


        <TableRow key={row.animal_id}>
            <TableCell style={{ textAlign: 'center' }}>{row.tag_number}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>
                <Button
                    onClick={addCalf}
                    style={{ fontSize: 10 }}
                    size="small"
                    variant="contained"
                    color="default">
                    Add Calf
                </Button>
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>
                <FormControlLabel
                    label="Mark as Close"
                    labelPlacement="top"
                    style={{ textAlign: 'center', fontSize: 5, }}
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

const map = (state) => ({ herd: state.herd, })

export default connect(map)(withRouter(CalvingBookItem));