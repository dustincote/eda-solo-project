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
        maxHeight: 440,
        width: 400,
    },
    root: { width: 400 },
    grid: { marginBottom: 25 },
}));



//this is the component that will display all of the movies
//we will dispatch to get movies and genres on loading of the component
const HerdView = (props) => {
    const classes = useStyles();
    useEffect(() => { props.dispatch({ type: 'GET_HERD' }) }, [])
    //use this to retrieve the current lat and long for a person

    const [filterHerd, setFilterHerd] = useState(false);
    const rows = () => {
        if (filterHerd) {
            return props.herd.filter(cow => cow.gender === filterHerd )
        } else if (props.herd[0]){ return props.herd.filter(cow => !cow.calf) }
        else{return props.herd}
    }
    const addCalf = (cow) => {
        console.log(cow)
        props.history.push(`/add/calf/${cow.animal_id}`)
    }
    const addAnimal = () => {
        props.history.push('/add/cow');
    }


    return (

        <div className={classes.grid}>
            {/* {console.log(rows())}
            {console.log(props)} */}
            <Grid
                className={classes.grid}
                container
                direction='column'
                alignItems="center"
                spacing={2}
            >   <FormLabel>Select Filter</FormLabel>
                <Select style={{width: 'auto'}} value={filterHerd} onChange={(e) => setFilterHerd(e.target.value)}>
                    <MenuItem value={false}>All</MenuItem>
                    <MenuItem value="cow">Cows</MenuItem>
                    <MenuItem value="heifer">Heifers</MenuItem>
                </Select>
                <h1>{rows().length} Cows</h1>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tag Number</TableCell>
                                    <TableCell>Disposition</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Add Calf</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows() != undefined && rows().map(row => (
                                    <TableRow key={row.animal_id}>
                                        <TableCell>{row.tag_number}</TableCell>
                                        <TableCell>{row.disposition}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell><Button onClick={() => addCalf(row)} style={{ fontSize: 10 }} size="small" variant="contained" color="default">Add Calf</Button></TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <Button style={{backgroundColor: 'maroon', marginTop: 20, color:'white'}} 
                        variant="outlined"
                        onClick={addAnimal}
                        >Add New Animal To Herd</Button>
            </Grid><br /><br />
            
        </div>

    );

}

const map = (state) => ({ herd: state.herd.herd, })

export default connect(map)(withRouter(HerdView));