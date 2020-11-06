import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  card:{
    width: 320,
    margin: 10,
  },
  heading:{
    fontSize: 24,
  }, 
  container: {
    margin: 10,
    maxHeight: 300,
    width: 'auto',

    textAlign: 'center',
  },
  notes:{
    marginLeft: 10,
  width: 320,
    alignItems:'center'
  },
  table:{
    minWidth: 300
  },
  grid:{marginBottom: 15}
})




const UserPage = (props) => {
  useEffect(() => {props.dispatch({type: 'GET_ALL_NOTES'})},[])
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, []);

  //set up array of only heifer calves to display how many heifer calves we have
  useEffect(() => {setHeiferCalves(props.herd.filter(cow => cow.calf && !cow.archived && cow.gender === 'heifer'))},[props.herd]);

  //set up array of only steer, or bull calves to display how many we have
  useEffect(() => {setBullCalves(props.herd.filter(cow => cow.calf && !cow.archived && cow.gender != 'heifer'))},[props.herd]);


  useEffect(() => {props.dispatch({ type: 'GET_HERD' })},[])

  //set up an array of only cows and heifers so we can figure out percentage done calving
  useEffect(()=> {setTotalCows(props.herd.filter(cow => !cow.calf && !cow.archived && cow.gender != 'bull'))},[props.herd]);
  const [totalCows, setTotalCows] = useState([]);
  const [heiferCalves, setHeiferCalves] = useState([]);
  const [bullCalves, setBullCalves] = useState([]);
  const classes = useStyles();
  
    return (
     <>

        <div style={{ textAlign: 'center', marginBottom: 40, marginLeft: 20, marginRight: 20 }}>         
          <img src='herdsman.png' id='welcome-img'/>
          {/* <hr/> */}
        </div>
        <Grid container alignItems='start' justify='space-evenly'  >
          <Grid item xs={12} md={6} className={classes.grid}>
            <Grid container direction='column' alignItems='center'>
          <Card variant='elevation' className={classes.card} style={{textAlign:'center', marginRight: 5}}>
                <Typography className={classes.heading}>
                Calving Dashboard<br/>
            </Typography><hr style={{marginLeft: 15, marginRight: 15}}/>

              <Typography>
              {((props.alreadyCalved.length / totalCows.length)*100).toFixed(2)+'%'} Done Calving<br/>
              </Typography>

                <Typography>
                {props.closeToCalving.length} Close To Calving<br/>
                </Typography>

                  <Typography>
                {props.yetToCalf.length} Not Close To Calving<br/>
                  </Typography>

                    <Typography>
                {props.alreadyCalved.length} Already Calved
              </Typography>
            <TableContainer className={classes.container}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow key='calf-header'>
                    <TableCell align='center'>Total Calves</TableCell>
                    <TableCell align="center">Bull/Steer</TableCell>
                    <TableCell align="center">Heifer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key='calf-data'>
                      <TableCell align='center' scope="row">{heiferCalves.length + bullCalves.length}</TableCell>
                      <TableCell align="center">{bullCalves.length}</TableCell>
                      <TableCell align="center">{heiferCalves.length}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
           </Card>
            </Grid>
          </Grid>

              {props.notes[0] && 
                <Grid  item xs={12} sm={6} className={classes.grid}>
            <Grid container direction='column' alignItems='center'>

                <Paper className={classes.notes}>
              <Typography style={{ textAlign: 'center' }} className={classes.heading}>Recent Notes</Typography><hr style={{ marginLeft: 15, marginRight: 15 }}/>
                  <TableContainer  className={classes.container} >
                    <Table stickyHeader className={classes.table}>
                      <TableHead>
                        <TableRow key='note-table'>
                          <TableCell align='center'>Tag Number</TableCell>
                          <TableCell align="center">Note</TableCell>
                          <TableCell align="center">Details</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.notes.map(note => 
                        <TableRow key={note.note_id} >
                          <TableCell align='center' scope="row">{note.tag_number}</TableCell>
                          <TableCell style={{fontSize:12}} align="center">{note.note}</TableCell>
                          <TableCell align="center">
                            <Button
                              variant='contained' 
                              color='primary' 
                              style={{fontSize:10}} 
                              size='small'
                              onClick={() => props.history.push(`/details/${note.animal_id}`)}
                              >Go to Animal</Button></TableCell>
                        </TableRow>)}
                      </TableBody>
                    </Table>
                  </TableContainer>
              </Paper>
              </Grid>
                </Grid>
            }


        </Grid>
         </>
        
     
    );

}

const map = (state) => ({
  closeToCalving: state.closeToCalving,
  yetToCalf: state.yetToCalf,
  alreadyCalved: state.alreadyCalved,
  herd: state.herd,
  notes: state.allNotes,
})
// this allows us to use <App /> in index.js
export default connect(map)(UserPage);
