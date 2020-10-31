import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import { FormControl, FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useParams } from 'react-router';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';


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



//this component is the calf form to add a new calf
//we use parameters on the url to determine which cow
//we are trying to add a calf for
const CalfForm = (props) => {
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, []);

    //pull parameters off of url
    const { dam_id } = useParams();

    const classes = useStyles();
    const [newCalf, setCalf] = useState({
        dam_id: dam_id,
        tag_number: '',
        gender: 'heifer',
        birth_date: moment().format('yyyy-MM-DD'),
        sire_id: '',
        status: '',
        calving_ease: '',
        castrated: false,
        calf: true,
        birthweight: '',
    })
    const [calfNote, setCalfNote] = useState('');
    const [dam, setDam] = useState(null);
    const [cowNote, setCowNote] = useState('');
    //change handler for most inputs on form
    const handleChange = (event) => {
        setCalf({
            ...newCalf,
            [event.target.name]: event.target.value,
        });
        console.log(newCalf);
    }


    //handle checkbox for castrated, when a bull is castrated
    //we will set the gender to steer, if the checkbox is unchecked
    //set the gender back to bull
    const handleCheck = (event) => {
       if(event.target.checked === true){ setCalf({
            ...newCalf,
            [event.target.name]: event.target.checked,
            gender: 'steer'
        });}else{
           setCalf({
               ...newCalf,
               [event.target.name]: event.target.checked,
               gender: 'bull'
           });
        }

        console.log(newCalf)
    }



    //handle change for calf note
    const noteChange = (event) => {
        setCalfNote(event.target.value)
        console.log(calfNote)
    }

    const cowNoteChange = (event) => {
        setCowNote(event.target.value)
    }

    //submit calf form to saga, prevent page reloading
    //reset the form, reset the note, push user to home page
    const submit = (e) => {
        props.dispatch({ type: 'ADD_CALF', payload: { newCalf: newCalf, note: calfNote } });
        e.preventDefault()
        console.log('submit form for new cow')
        setCalf({
            tag_number: '',
            gender: 'heifer',
            birth_date: moment().format('yyyy-MM-DD'),
            sire_id: '',
            status: '',
            calving_ease: '',
            castrated: false,
            calf: true,
            birthweight: '',
        });

        setCalfNote('');
        if(cowNote != ''){
            props.dispatch({type:'ADD_NOTE', payload:{note: cowNote, animal_id: dam_id}});
        }
        props.dispatch({type: 'UPDATE_CLOSE_TO_CALVING', payload:{close_to_calving: false, animal_id: dam_id}})
        props.history.push('/home')
    }
    useEffect(() => { setDam(props.herd.filter(cow => cow.animal_id === Number(dam_id)))},[props.herd])
    useEffect(() => { props.dispatch({type:'GET_HERD'})}, [])

    const goBack = () => {
        props.history.goBack()
    }



    return (
        <>
            {/* {console.log('calf form props:',props)}
            {dam != null && dam[0] && console.log('dam is:',dam[0])} */}
            <Grid
                container
                justify="center"
                spacing={0}

            >
                <Grid item xs={12} sm={6} md={4} style={{ marginTop: 25 }} >
                    <Paper>
                        <Grid container justify="center">

                            <Grid item xs={8}  style={{textAlign:'center'}} >
                                <Typography style={{marginTop: 15}} variant="subtitle1">
                                    Enter Calf Information for Cow# {dam != null && dam[0] && dam[0].tag_number}
                                </Typography>
                                <form onSubmit={submit}>

                                    <TextField fullWidth value={newCalf.tag_number}
                                                onChange={handleChange} 
                                                name="tag_number" 
                                                required 
                                                label="Tag Number" /><br /><br />
                                    <FormControl style={{ textAlign: 'left' }}>
                                        <FormLabel style={{ textAlign: 'left' }}>Gender:</FormLabel>
                                        <RadioGroup style={{ alignItems: 'left' }} 
                                                onChange={handleChange} 
                                                name="gender" 
                                                value={newCalf.gender} row >
                                            <FormControlLabel 
                                                value={newCalf.castrated ? 'steer' : 'bull'} 
                                                control={<Radio color="primary" />} 
                                                label={newCalf.castrated ? 'Steer': 'Bull'} />
                                            <FormControlLabel value="heifer" 
                                                control={<Radio color="primary" />} 
                                                label="Heifer" />
                                        </RadioGroup>
                                    </FormControl>
                                    <br />
                                    <FormControlLabel label="Castrated" 
                                    control={<Checkbox disabled={newCalf.gender === 'heifer'} 
                                    color="primary" checked={newCalf.castrated} 
                                    onChange={handleCheck} name="castrated" />}/><br />

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
                                        <InputLabel id="disposition">Calving Ease</InputLabel>
                                        <Select fullWidth name="calving_ease" placeholder="Calving Ease" value={newCalf.calving_ease} onChange={handleChange}>
                                            <MenuItem value={0}></MenuItem>
                                            <MenuItem value={1}>1: No assistance</MenuItem>
                                            <MenuItem value={2}>2: Some assistance</MenuItem>
                                            <MenuItem value={3}>3: Mechanical assistance</MenuItem>
                                            <MenuItem value={4}>4: Caesarean section</MenuItem>
                                            <MenuItem value={5}>5: Abnormal presentation</MenuItem>
                                        </Select>
                                    </FormControl><br /><br/>
                                    <FormControl fullWidth >
                                        <InputLabel id="disposition">Status</InputLabel>
                                        <Select required fullWidth name="status" placeholder="Status" value={newCalf.status} onChange={handleChange}>
                                            <MenuItem value=''></MenuItem>
                                            <MenuItem value='alive'>Alive</MenuItem>
                                            <MenuItem value='stillborn'>Stillborn</MenuItem>
                                            <MenuItem value='c'>Died before 2 weeks of age</MenuItem>
                                            <MenuItem value='d'>Died after 2 weeks of age</MenuItem>
                                        </Select>
                                    </FormControl><br /><br />
                                    <TextField fullWidth type='number' value={newCalf.birthweight} onChange={handleChange} name="birthweight"  label="Birthweight" /><br /><br />
                                    <InputLabel style={{textAlign: 'left'}}>Calf Note</InputLabel>
                                    <TextField
                                        onChange={noteChange}
                                        fullWidth
                                        id="outlined-multiline-static"
                                        label="Calf Notes"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        value={calfNote}
                                    /><br /><br />
                                    <InputLabel style={{ textAlign: 'left' }}>Cow Note</InputLabel>
                                    <TextField
                                        onChange={cowNoteChange}
                                        fullWidth
                                        id="outlined-multiline-static"
                                        label="Cow Notes"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        value={cowNote}
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

const map = (state) => ({ herd: state.herd, })

export default connect(map)(withRouter(CalfForm));