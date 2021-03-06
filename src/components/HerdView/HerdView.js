import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router'
import { FormLabel } from '@material-ui/core';
import HerdViewItem from './HerdViewItem';


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
    container: {
        margin: 10,
        maxHeight: 440,
        width: 'auto',
        textAlign:'center',
    },
    root: { width: 'auto' },
    grid: { marginBottom: 25, textAlign:'center' },
}));



//this component will bring in the entire herd and display it 
//in table form
const HerdView = (props) => {
    const classes = useStyles();
    useEffect(() => { props.dispatch({ type: 'GET_HERD' }) }, []);
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, []);


    //set up state for the filter function of the component
    const [filterHerd, setFilterHerd] = useState(false);

    //set up a function that will filter the herd based on the filter set up
    //we will not show calves in this component and we will not show archived animals in 
    //this component
    const rows = () => {
        if (filterHerd) {
            return props.herd.filter(cow => cow.gender === filterHerd && !cow.calf && !cow.archived)
        } else if (props.herd[0]){ return props.herd.filter(cow => !cow.calf && !cow.archived) }
        else{return props.herd}
    }



    //takes you to the CowForm
    const addAnimal = () => {
        props.history.push('/add/cow');
    }


    return (

            <>
            {/* {console.log(rows())}
            {console.log(props)} */}
            <div style={{textAlign:'center', marginBottom:40, marginLeft:20, marginRight:20}}>                
                <h1 className='view-heading'>Herd View</h1>
                {/* <hr/> */}
            </div>
            <Grid
                className={classes.grid}
                container
                direction='row'
                alignItems="center"
                justify='center'
                spacing={0}
            >  
            <Grid xs={10} sm={8} md={6} lg={4} item>
                <Paper className={classes.root}>
                <FormLabel>Select Filter</FormLabel><br/>
                <Select style={{width: 'auto'}} value={filterHerd} onChange={(e) => setFilterHerd(e.target.value)}>
                    <MenuItem value={false}>All</MenuItem>
                    <MenuItem value="cow">Cows</MenuItem>
                    <MenuItem value="heifer">Heifers</MenuItem>
                    <MenuItem value="bull">Bulls</MenuItem>
                </Select>
                <h1>{rows().length} Animals</h1>
                
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead >
                                <TableRow >
                                    <TableCell style={{ textAlign: 'center' }}>Tag Number</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>More Details</TableCell>
                                    <TableCell style={{textAlign:'center'}}>Close to Calving</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody  >
                                {rows() != undefined && rows().map((row, index) => (<HerdViewItem key={row.animal_id} row={row} index={index} />))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <Button style={{ marginTop: 20,}} 
                        variant="contained"
                        color="primary"
                        onClick={addAnimal}
                        >Add New Animal To Herd</Button>
                </Grid>
            </Grid><br /><br />
            </>

    );

}

const map = (state) => ({ herd: state.herd, })

export default connect(map)(withRouter(HerdView));