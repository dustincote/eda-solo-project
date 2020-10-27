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
    const [cow, setCow] = useState({close_to_calving: row.close_to_calving})

 

    const addCalf = (cow) => {
        console.log(cow)
        props.history.push(`/add/calf/${cow.animal_id}`)
    }
    const addAnimal = () => {
        props.history.push('/add/cow');
    }
    const handleCheck = (event) => {
        props.dispatch({ type: 'UPDATE_CLOSE_TO_CALVING', payload: {animal_id: row.animal_id, close_to_calving: !cow.close_to_calving} });

    }
    const dispatchCloseToCalving = () => {

    }


    

    return (


        <TableRow key={row.animal_id}>
            <TableCell style={{ textAlign: 'center' }}>{row.tag_number}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>
                <Button  
                    onClick={() => addCalf(row)} 
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
                    style={{textAlign: 'center', fontSize: 5,}} 
                    control={
                        <Checkbox 
                        color="primary" 
                        checked={cow.close_to_calving} 
                        onChange={handleCheck} 
                        name="close_to_calving" 
                        />} />
                </TableCell>
        </TableRow>

    );

}

const map = (state) => ({ herd: state.herd.herd, })

export default connect(map)(withRouter(HerdViewItem));