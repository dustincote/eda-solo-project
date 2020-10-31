import React, { useEffect, useState } from 'react';
import {  useParams, withRouter } from 'react-router';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PastureTable from './PastureTable';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import moment from 'moment';
import swal from 'sweetalert';

const useStyles = makeStyles(() => ({
  input:{
    minWidth: 130,
  },
  table:{
    marginTop: 40,
  },
})) 



const PastureView = (props) => {
  const {pasture_id}= useParams();
  const classes = useStyles();
  const [animal, setAnimal] = useState([]);
  const [tagNumber, setTagNumber] = useState('');
  const [gender, setGender] = useState('cow');
  const [pasture, setPasture]= useState('')
  const [addPasture, setAddPasture] = useState(false);
  const [newPasture, setNewPasture] = useState('');
  const [animalsInPasture, setAnimalsInPasture] = useState([]);
  useEffect(() => {props.dispatch({type: 'GET_HERD'})},[]);
  useEffect(() => {props.dispatch({type:'GET_PASTURES'})},[]);
  useEffect(() => { props.dispatch({ type:'GET_PASTURE_RECORDS'})},[]);
  useEffect(()=> { if(pasture === 0){setAddPasture(true)}else{setAddPasture(false)}}, [pasture]);
  useEffect(()=> { setAnimalsInPasture(props.pastureRecords.filter(cow => cow.pasture_id === pasture.pasture_id)) }, [pasture]);

  
  useEffect(() => {
    if (gender === 'cow') {
      setAnimal(props.herd.filter(cow => !cow.calf && cow.gender != 'bull' && cow.tag_number === tagNumber));
    } else if (gender === 'calf') {
      setAnimal(props.herd.filter(cow => cow.calf && cow.tag_number === tagNumber));
    } else if (gender === 'bull') {
      setAnimal(props.herd.filter(cow => !cow.calf && cow.gender === 'bull' && cow.tag_number === tagNumber));
    }}, [tagNumber, gender]);



  const handleChange = (e) => {
    setPasture(e.target.value);
  }



  const submitPasture = () => {
    props.dispatch({type:'ADD_PASTURE', payload: {pasture_name: newPasture}});
    setAddPasture(false);
    setPasture('');
  }

  const addToPasture = (e) => {
    e.preventDefault();
    let inPasture = props.pastureRecords.map(cow => cow.animal_id);
    console.log(inPasture);
    if(inPasture.indexOf(animal[0].animal_id) === -1){
    props.dispatch({ 
      type:'ADD_TO_PASTURE',
       payload: {
          pasture_id: pasture.pasture_id,
          date_in: moment().format('yyyy-MM-DD'),
          animal_id: animal[0].animal_id,
          tag_number: animal[0].tag_number,
       }})} else {
         let animalToFind = props.pastureRecords.filter(cow => cow.animal_id === animal[0].animal_id);
      swal(`Animal is already in a pasture please remove from ${animalToFind[0].pasture_name} pasture`, { timer: 4000, buttons: false, icon: 'warning' })
       }
    setTagNumber('');
  }



  return(
  
  <Grid container direction='column' spacing={4} alignItems='center' >
    <Grid item xs={12} style={{textAlign: 'center'}}>

      {console.log('animal is', animal)}
        <form onSubmit={addToPasture}>
      {  props.pastures && 
          <>
      <InputLabel >Select Pasture</InputLabel>
      <Select required className={classes.input}  name="pasture" placeholder="Pasture" value={pasture} onChange={handleChange} >
        <MenuItem value={0}>Add a Pasture</MenuItem>
            {props.pastures.map(pasture => <MenuItem key={pasture.pasture_id} value={pasture}>{pasture.pasture_name}</MenuItem>)} 
      </Select></>}
      <br/>

      {addPasture ? 
        <> 
        <Input 
        value={newPasture} 
        onChange={(e) => setNewPasture(e.target.value)}/>
        <br/>
        <Button onClick={submitPasture}>Submit</Button> </>: <></>}
       <br/>
       
        <TextField
          onChange={(e) => setTagNumber(e.target.value)}  
          name="tag_number"
          value={tagNumber}
          required
          label="Tag Number" />
        <RadioGroup style={{ alignItems: 'left' }}
          onChange={(e) => setGender(e.target.value)}
          name="gender"
          value={gender} row >
          <FormControlLabel
            value='cow'
            control={<Radio color="primary" />}
            label='Cow/Heifer' />
          <FormControlLabel 
            value="calf"
            control={<Radio color="primary" />}
            label="Calf" />
            <FormControlLabel 
              value="bull"
              control={<Radio color="primary" />}
              label="Bull" />
        </RadioGroup><br/>
      <Button type='submit'>Add To {pasture.pasture_name} Pasture</Button>
        </form>
      </Grid>
      <Grid style={{textAlign:'center'}} item xs={12}>
        <PastureTable 
        heading={pasture.pasture_name && `Cows/Heifers In ${pasture.pasture_name} Pasture`} 
        className={classes.table}
        animals={props.pastureRecords.filter(cow => !cow.calf && cow.gender != 'bull' && cow.pasture_id === pasture.pasture_id)} 
        />
      </Grid>
      <Grid style={{ textAlign: 'center' }} item xs={12}>
        <PastureTable 
          heading={pasture.pasture_name && `Calves In ${pasture.pasture_name} Pasture `}
          className={classes.table} 
          animals={props.pastureRecords.filter(cow => cow.calf && cow.pasture_id === pasture.pasture_id)} 
          />
      </Grid>
      <Grid style={{ textAlign: 'center' }} item xs={12}>
        <PastureTable 
          heading={pasture.pasture_name && `Bulls In ${pasture.pasture_name} Pasture`} 
          className={classes.table} 
          animals={props.pastureRecords.filter(cow => !cow.calf && cow.gender === 'bull' && cow.pasture_id === pasture.pasture_id)} 
          />
      </Grid>
  </Grid>
  )
  }

const mapState = (state) => ({
  pastures: state.pastures, herd: state.herd, pastureRecords: state.pastureRecords,
})

export default connect(mapState)(withRouter(PastureView));
