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

const useStyles = makeStyles({
  card:{
    minWidth: 300,
  },
  heading:{
    fontSize: 24,
  },
})




const UserPage = (props) => {
  useEffect(() => {props.dispatch({type: 'GET_ALL_NOTES'})},[])
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, []);
  useEffect(() => {setHeiferCalves(props.herd.filter(cow => cow.calf && !cow.archived && cow.gender === 'heifer'))},[props.herd]);
  useEffect(() => {setBullCalves(props.herd.filter(cow => cow.calf && !cow.archived && cow.gender != 'heifer'))},[props.herd]);
  useEffect(() => {props.dispatch({ type: 'GET_HERD' })},[])
  useEffect(()=> {setTotalCows(props.herd.filter(cow => !cow.calf && !cow.archived && cow.gender != 'bull'))},[props.herd]);
  const [totalCows, setTotalCows] = useState([]);
  const [heiferCalves, setHeiferCalves] = useState([]);
  const [bullCalves, setBullCalves] = useState([]);
  const classes = useStyles();
  
    return (
     <>
      {console.log(heiferCalves)}
      {console.log(bullCalves)}
        <div style={{ textAlign: 'center', marginBottom: 40, marginLeft: 20, marginRight: 20 }}>         
          <h1>Welcome To Herdsman</h1>
          <hr/>
        </div>
        <Grid container direction='column' alignItems='center' justify='center'   >
          <Grid item xs={6}>
            <Paper>
          <Card variant='elevation' className={classes.card} style={{textAlign:'center'}}>
                <Typography className={classes.heading}>
                Calving Dashboard<br/>
            </Typography>

              <Typography>
              {((props.alreadyCalved.length / totalCows.length)*100).toFixed(2)+'%'} Done Calving<br/>
              </Typography>

                <Typography>
                {props.closeToCalving.length} Close To Calving<br/>
                </Typography>

                  <Typography>
                {props.yetToCalf.length} Yet To Calf<br/>
                  </Typography>

                    <Typography>
                {props.alreadyCalved.length} Already Calved
              </Typography>
            <TableContainer >
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>Total Calves</TableCell>
                    <TableCell align="center">Bull/Steer</TableCell>
                    <TableCell align="center">Heifer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow >
                      <TableCell align='center' scope="row">{heiferCalves.length + bullCalves.length}</TableCell>
                      <TableCell align="center">{bullCalves.length}</TableCell>
                      <TableCell align="center">{heiferCalves.length}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
           </Card>
            </Paper>
            <Grid style={{marginTop:40,}} item>
              {props.notes[0] && <Card><Grid container justify='center'>
                <Grid item xs={10} style={{textAlign:'center'}}>
                <Typography className={classes.heading}>Recent Notes</Typography>
                </Grid>
                <Grid item xs={10} style={{ textAlign: 'left' }}>
                {props.notes.map(note => <Typography>{note.note}</Typography>)}
                </Grid>
              </Grid>
              </Card>}
            </Grid>
          </Grid>

            {/* <CalvingBookTable closeToCalving={props.closeToCalving} heading={'Close To Calving'} />

            <CalvingBookTable closeToCalving={props.yetToCalf} heading={'Not Close'} /> */}

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
