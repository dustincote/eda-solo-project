import React, { useEffect, useState } from 'react';
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


const useStyles = makeStyles(() => ({
  input:{
    minWidth: 130,
  },
  table:{
    marginTop: 40,
  },
})) 



const PastureView = (props) => {
  const classes = useStyles();
  const [gender, setGender] = useState('cow');
  const [pasture, setPasture]= useState('')
  const [addPasture, setAddPasture] = useState(false);
  const [newPasture, setNewPasture] = useState('');
  useEffect(() => {props.dispatch({type:'GET_PASTURES'})},[])
  useEffect(() => { props.dispatch({ type:'GET_PASTURE_RECORDS'})},[])
  useEffect(()=> { if(pasture === 0){setAddPasture(true)}else{setAddPasture(false)}}, [pasture]);

  const handleChange = (e) => {
    setPasture(e.target.value);
  }



  const submitPasture = () => {
    props.dispatch({type:'ADD_PASTURE', payload: {pasture_name: newPasture}});
    setAddPasture(false);
    setPasture('');
  }



  return(
  
  <Grid container direction='column' spacing={4} alignItems='center' >
    <Grid item xs={12} style={{textAlign: 'center'}}>

      {console.log('pasture is', pasture)}
      {  props.pastures && 
      <>
      <InputLabel >Select Pasture</InputLabel>
      <Select className={classes.input}  name="pasture" placeholder="Pasture" value={pasture} onChange={handleChange} >
        <MenuItem value={0}>Add a Pasture</MenuItem>
            {props.pastures.map(pasture => <MenuItem key={pasture.pasture_id} value={pasture.pasture_name}>{pasture.pasture_name}</MenuItem>)}
      </Select></>}<br/>
      {addPasture ? <> <Input value={newPasture} onChange={(e) => setNewPasture(e.target.value)}/><br/><Button onClick={submitPasture}>Submit</Button> </>: <></>}
       <br/>
       <form>
        <TextField  
          name="tag_number"
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
          <FormControlLabel value="calf"
            control={<Radio color="primary" />}
            label="Calf" />
            <FormControlLabel value="bull"
              control={<Radio color="primary" />}
              label="Bull" />
        </RadioGroup>
        </form>
      </Grid>
      <Grid item xs={12}>
        <PastureTable 
        heading={`Cows/Heifers In ${pasture} Pasture`} 
        className={classes.table} />
      </Grid>
      <Grid item xs={12}>
        <PastureTable heading={`Calves In ${pasture} Pasture `} className={classes.table} />
      </Grid>
      <Grid item xs={12}>
        <PastureTable heading={`Bulls In ${pasture} Pasture`} className={classes.table} />
      </Grid>
  </Grid>
  )
  }

const mapState = (state) => ({
  pastures: state.pastures
})

export default connect(mapState)(PastureView);
