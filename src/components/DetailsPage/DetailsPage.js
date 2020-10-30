import React, {useEffect, useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
    },
});

function DetailsPage(props) {
    const { animal_id } = useParams();
    const [animal, setAnimal] = useState([]);
    const [dam, setDam] = useState([]);
    const [currentCalves, setCurrentCalves]= useState([]);
    const [animalsCalves, setAnimalsCalves] = useState([]);
    const classes = useStyles();
    const [addNewNote, setAddNewNote]= useState(false);
    const [note, setNote] = useState('');

    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, []);
    useEffect(() => { setAnimal(props.herd.filter(a => a.animal_id === Number(animal_id)))},[props.herd, animal_id]);
    useEffect(() => { animal[0] && setDam(props.herd.filter(a => a.animal_id === Number(animal[0].dam_id)))},[animal]);
    useEffect(() => { setCurrentCalves(props.herd.filter(a => a.calf && !a.archived))},[props.herd, animal_id]);
    useEffect(() => { setAnimalsCalves(currentCalves.filter(a => a.dam_id === animal_id))},[currentCalves]);
    useEffect(() => {props.dispatch({type: 'GET_HERD'})}, []);
    useEffect(() => {props.dispatch({ type: 'GET_NOTES', payload: animal_id })}, [animal_id]);

    const details = (id) => {
        props.history.push(`/details/${id}`)
    }
    const backToHerd = () => {
        props.history.goBack();
    }

    const handleCheck = () => {
        props.dispatch({ 
            type: 'UPDATE_ARCHIVED', payload: { 
                animal_id: animal_id,
                archived: !animal[0].archived,
                date_archived: moment().format('yyyy-MM-DD') 
            } });
    }

    const deleteNote = (id) => {
        props.dispatch({type:'DELETE_NOTE', payload: {id:id, animal_id: animal_id}});
    }

    const submitNote = () => {
        console.log({note: note, animal_id: animal_id})
        props.dispatch({type: 'ADD_NOTE', payload:{note: note, animal_id: animal_id}});
        setAddNewNote(false);
        setNote('');
    }
    const cancelNote = () => {
        setAddNewNote(false);
    }


    return (
        <>
        <div style={{textAlign:'center', marginBottom:40, marginLeft:20, marginRight:20}}>
            <h1>Details for {animal[0] && animal[0].tag_number}</h1>
            <hr/>
        </div>
        <Grid container direction='column' justify='center' alignItems='center'>
        {animal[0] && <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                    Tag number: {animal[0].tag_number}
                </Typography>

                <Typography>
                    Gender: {animal[0].gender}
                </Typography>
                <Typography>
                    Dam Tag Number: {dam[0] ? dam[0].tag_number : 'None'}
                </Typography>
                {(animal[0].gender === 'bull' || animal[0].gender === 'steer' || animal[0].calf ) ? <></> : <><Typography className={classes.pos} color="textPrimary">
                    Calves:
                </Typography>
                <ul>
                    {animalsCalves.map(a => 
                        <li key={a.animal_id}>Tag Number: {a.tag_number} Gender: {a.gender}{'  '}<IconButton style={{ fontSize: 10, color:'blue' }} size="small" variant='contained' onClick={() => details(a.animal_id)}>Details</IconButton></li>)}
                    </ul></>}
                

                <Typography className={classes.pos} color="textPrimary">
                    Notes:<br/> {props.animalNotes ? 
                            props.animalNotes.map(
                                note => 
                                    <span key={note.note_id}>
                                        {note.note}{' '}<IconButton onClick={() => deleteNote(note.note_id)}><DeleteForeverIcon style={{ fontSize: 15, color: '#A61D2C'}}/></IconButton><br/>
                                    </span>) 
                                : 'none'}
                </Typography>
                {animal[0] && <FormControlLabel
                    label="Mark as Sold"
                    labelPlacement="start"
                    style={{ textAlign: 'center', fontSize: 5, }}
                    control={
                         <Checkbox
                            color="primary"
                            checked={animal[0].archived}
                            onChange={handleCheck}
                            name="close_to_calving"
                        />} />}
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>}
                </Grid>
        <div style={{textAlign:'center', marginTop:20}}>
            
            {addNewNote ? <><TextField
                onChange={(event) => setNote(event.target.value)}
                id="outlined-multiline-static"
                label="Notes"
                multiline
                rows={4}
                variant="outlined"
                value={note}
            /><br/>
                <Button style={{ fontSize: 10 }} size="small" variant='contained' onClick={submitNote}>Submit</Button>{'  '}
                <Button style={{ fontSize: 10 }} size="small" variant='contained' onClick={cancelNote}>Cancel</Button></>
                :
                <>
                        <Button variant='contained' style={{ fontSize: 10 }} size="small" onClick={backToHerd}><ArrowBackIcon style={{fontSize:15}} /> Back</Button>{'  '}
                <Button variant='contained' style={{ fontSize: 10 }} size="small" onClick={() => setAddNewNote(true)}>Add New Note</Button>
                </>}
            </div>
                </>
    );
}

const map = (state) => ({
    herd: state.herd,
    animalNotes: state.animalNotes
})

export default connect(map)(withRouter(DetailsPage))