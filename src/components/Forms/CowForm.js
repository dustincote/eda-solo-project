import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import { FormControl, FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import swal from 'sweetalert';







// this component is the form to add a new cow
const CowForm = (props) => {
    useEffect(()=>{window.scrollTo({top:0,behavior:'smooth'})},[]);
    useEffect(() => {props.dispatch({type:'GET_HERD'})},[]);
    const [newCow, setCow] = useState({
        tag_number: '',
        gender: 'cow',
        birth_date: '',
        sire_id: '',
        disposition: '',
        close_to_calving: false,
        calf: false,
    });

    //generate array of all current adult animal tag numbers so we can check to see 
    //if there is an animal with that tag number that already exists
    useEffect(() => { if(newCow.tag_number != ''){setTagNumbers(props.herd.filter(cow=> !cow.calf).map(cow => cow.tag_number))} }, [newCow.tag_number, props.herd]);

    //local state
    const [note, setNote] = useState('');
    const [tagNumbers, setTagNumbers] = useState([]);

    //change handler for new cow
    const handleChange = (event) => {
        setCow({
            ...newCow,
            [event.target.name]: event.target.value,
        });
        console.log(newCow);
    };

    //change handler for checkbox
    const handleCheck = (event) => {
        setCow({
            ...newCow,
            [event.target.name]: event.target.checked
        });
        console.log(newCow)
    };

    //handle change for note
    const noteChange = (event) => {
        setNote(event.target.value)
        console.log(note)
    };

    const submit = (e) => {
        //check to make sure the tag number entered does not already exist in the 
        //adult herd
        if(tagNumbers.indexOf(newCow.tag_number) === -1){
        props.dispatch({ type: 'ADD_COW', payload: { newCow: newCow, note: note } });
        e.preventDefault()
        console.log('submit form for new cow')
        setCow({
            tag_number: '',
            gender: 'cow',
            birth_date: '',
            sire_id: '',
            disposition: '',
            close_to_calving: false,
            user_id: 1,
            calf: false,
        });
        setNote('');
            props.history.push('/herd')
        } else { e.preventDefault(); swal(`Animal with Tag number ${newCow.tag_number} already exists
        if trying to add a calf please do so in the calving book tab`, {  timer:4000, buttons: false, icon: 'warning' })}
    };//end submit


    const goBack = () => {
        props.history.goBack()
    };

    return (
    <>

        <Grid
            container
            justify="center"
            spacing={0}

        >
                <Grid item xs={12} sm={6} md={4} >
                <Paper>
                    <Grid container justify="center">

                        <Grid item xs={8}  >
                            <form onSubmit={submit}>

                                <TextField fullWidth value={newCow.tag_number} onChange={handleChange} name="tag_number" required label="Tag Number" /><br /><br />
                                <FormControl style={{ textAlign: 'left' }}>
                                    <FormLabel style={{ textAlign: 'left' }}>Type:</FormLabel>
                                    <RadioGroup style={{ alignItems: 'left' }} onChange={handleChange} name="gender" value={newCow.gender} row >
                                        <FormControlLabel value="cow" control={<Radio color="primary" />} label="Cow" />
                                        <FormControlLabel value="heifer" control={<Radio color="primary" />} label="Heifer" />
                                        <FormControlLabel value="bull" control={<Radio color="primary" />} label="Bull" />
                                    </RadioGroup>
                                </FormControl>
                                <br />
                                <TextField
                                    fullWidth
                                    InputLabelProps={{ shrink: true, }}
                                    value={newCow.birth_date}
                                    label="Birth Date:"
                                    onChange={handleChange}
                                    name="birth_date"
                                    type="date" /><br />
                                <TextField fullWidth value={newCow.sire_id} onChange={handleChange} name="sire_id" label="Sire" /><br /><br />
                                <FormControl fullWidth >
                                    <InputLabel id="disposition">Disposition:</InputLabel>
                                    <Select fullWidth name="disposition" placeholder="disposition" value={newCow.disposition} onChange={handleChange}>
                                        <MenuItem value={1}>1: Docile</MenuItem>
                                        <MenuItem value={2}>2: Restless</MenuItem>
                                        <MenuItem value={3}>3: Nervous</MenuItem>
                                        <MenuItem value={4}>4: Flighty</MenuItem>
                                        <MenuItem value={5}>5: Aggressive</MenuItem>
                                        <MenuItem value={6}>6: Very Aggressive</MenuItem>
                                    </Select>
                                </FormControl><br />
                                <FormControlLabel disabled={newCow.gender === 'bull'} label="Close To Calving" control={<Checkbox color="primary" checked={newCow.close_to_calving} onChange={handleCheck} name="close_to_calving" />} /> <br />
                                <TextField
                                    onChange={noteChange}
                                    fullWidth
                                    id="outlined-multiline-static"
                                    label="Notes"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    value={note}
                                /><br /><br />
                                <Grid item style={{ textAlign: 'center', marginBottom: 15 }}>
                                    <Button type="submit" color="primary" variant="contained">Submit</Button>{'  '}
                                    <Button color="primary" variant="contained" onClick={goBack}>Cancel</Button>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Paper>

            </Grid>
        </Grid>
    </>

    );

}

const map = (state) => ({ herd: state.herd})

export default connect(map)(CowForm);