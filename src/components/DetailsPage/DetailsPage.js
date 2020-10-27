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
        fontSize: 14,
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
    const bull = <span className={classes.bullet}>•</span>;

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
        props.history.push('/herd')
    }

    const handleCheck = () => {
        props.dispatch({ 
            type: 'UPDATE_ARCHIVED', payload: { 
                animal_id: animal_id,
                archived: !animal[0].archived,
                date_archived: moment().format('yyyy-MM-DD') 
            } });

    }

    return (
        
        <Card className={classes.root}>
            {console.log(animal)}
            {console.log(dam)}
            {console.log(typeof animal_id)}
            {console.log('current calves', currentCalves)}
            {console.log('this animals calves', animalsCalves)}
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Tag number: {animal[0] != undefined && animal[0].tag_number}
                </Typography>
                <Typography>
                    Dam Tag Number: {dam[0] ? dam[0].tag_number: 'None' }
                </Typography>
                <Typography>
                    Gender: {animal[0] ? animal[0].gender : 'None'}
                </Typography>
                <Typography>
                    Dam Tag Number: {dam[0] ? dam[0].tag_number : 'None'}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Calves:
                </Typography>
                <ul>
                    {animalsCalves.map(a => 
                    <li key={a.animal_id}>Tag Number: {a.tag_number} Gender: {a.gender}<Button onClick={() => details(a.animal_id)}>Details</Button></li>)}
                    </ul>
                <Typography className={classes.pos} color="textSecondary">
                    Notes: {props.animalNotes ? 
                            props.animalNotes.map(
                                note => 
                                    <span key={note.note_id}>
                                        {note.note}<br/>
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
                <Button size="small" onClick={backToHerd}>Back to Herd</Button>
            </CardActions>
        </Card>
    );
}

const map = (state) => ({
    herd: state.herd,
    animalNotes: state.animalNotes
})

export default connect(map)(withRouter(DetailsPage))