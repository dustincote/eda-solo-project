import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Header from '../Header/Header';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import { FormControl, FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';
import { useParams } from 'react-router';
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
    root: {
        flexGrow: 1,
    },
}));



//this is the component that will display all of the movies
//we will dispatch to get movies and genres on loading of the component
const CalfForm = (props) => {
    const { dam_id } = useParams();
    const classes = useStyles();
    const [newCalf, setCalf] = useState({
        tag_number: '',
        gender: 'cow',
        birth_date: '1/1/1990',
        sire_id: '',
        disposition: 0,
        close_to_calving: false,
        user_id: 1,
        calf: false,
    })
    const [calfNote, setCalfNote] = useState('')
    const [dam, setDam] = useState(null);
    const handleChange = (event) => {
        setCalf({
            ...newCalf,
            [event.target.name]: event.target.value,
        });
        console.log(newCalf);
    }
    const handleCheck = (event) => {
        setCalf({
            ...newCalf,
            [event.target.name]: event.target.checked
        });
        console.log(newCalf)
    }

    const noteChange = (event) => {
        setCalfNote(event.target.value)
        console.log(calfNote)
    }
    const submit = (e) => {
        // props.dispatch({ type: 'ADD_COW', payload: { newCalf: newCalf, note: calfNote } });
        e.preventDefault()
        console.log('submit form for new cow')
        setCalf({
            tag_number: '',
            gender: 'cow',
            birth_date: '1/1/1990',
            sire_id: '',
            disposition: 0,
            close_to_calving: false,
            user_id: 1,
            calf: false,
        });
        setCalfNote('');
    }
    useEffect(() => { setDam(props.herd.filter(cow => cow.animal_id === Number(dam_id))) }, [])

    return (
        <>
            {console.log(props)}
            {console.log(dam)}
            <Header />
            <Grid
                container
                justify="center"
                spacing={0}

            >
                <Grid item xs={4} style={{ marginTop: 25 }} >
                    <Paper>
                        <Grid container justify="center">

                            <Grid item xs={8}  >
                                <form onSubmit={submit}>

                                    <TextField fullWidth value={newCalf.tag_number} onChange={handleChange} name="tag_number" required label="Tag Number" /><br /><br />
                                    <FormControl style={{ textAlign: 'left' }}>
                                        <FormLabel style={{ textAlign: 'left' }}>Type:</FormLabel>
                                        <RadioGroup style={{ alignItems: 'left' }} onChange={handleChange} name="gender" value={newCalf.gender} row >
                                            <FormControlLabel value="cow" control={<Radio color="primary" />} label="Cow" />
                                            <FormControlLabel value="heifer" control={<Radio color="primary" />} label="Heifer" />
                                        </RadioGroup>
                                    </FormControl>
                                    <br />
                                    <TextField
                                        fullWidth
                                        InputLabelProps={{ shrink: true, }}
                                        value={newCalf.birth_date}
                                        label="Birth Date:"
                                        onChange={handleChange}
                                        name="birth_date"
                                        type="date" /><br />
                                    <TextField fullWidth value={newCalf.sire_id} onChange={handleChange} name="sire_id" label="Sire" /><br /><br />
                                    <FormControl fullWidth >
                                        <InputLabel id="disposition">Disposition:</InputLabel>
                                        <Select fullWidth name="disposition" placeholder="disposition" value={newCalf.disposition} onChange={handleChange}>
                                            <MenuItem value={0}>Select a Score</MenuItem>
                                            <MenuItem value={1}>1: Docile</MenuItem>
                                            <MenuItem value={2}>2: Restless</MenuItem>
                                            <MenuItem value={3}>3: Nervous</MenuItem>
                                            <MenuItem value={4}>4: Flighty</MenuItem>
                                            <MenuItem value={5}>5: Aggressive</MenuItem>
                                            <MenuItem value={6}>6: Very Aggressive</MenuItem>
                                        </Select>
                                    </FormControl><br />
                                    <FormControlLabel label="Close To Calving" control={<Checkbox color="primary" checked={newCalf.close_to_calving} onChange={handleCheck} name="close_to_calving" />} /><br />
                                    <TextField
                                        onChange={noteChange}
                                        fullWidth
                                        id="outlined-multiline-static"
                                        label="Notes"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        value={calfNote}
                                    /><br /><br />
                                    <Grid item style={{ textAlign: 'center', marginBottom: 15 }}>
                                        <Button type="submit" color="primary" variant="contained">Submit</Button>
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

const map = (state) => ({ herd: state.herd.herd, })

export default connect(map)(CalfForm);