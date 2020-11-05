import React ,{ useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Footer.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
    root: {
        
        paddingBottom: 0,
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
    card:{
        minWidth: 150,
        backgroundColor:'#0384fc',
        color:'white',
        height: 100,
        padding: 0,
        marginBottom: 5,

    },
    weather:{
        fontSize: 10,
    },
    weatherHeading:{
        fontSize: 12,
    },
    media:{
        height: 50,
        width: '33%',
        marginLeft: '33%',
    }
});

//footer houses the weather widget and the copyright statement
const Footer = (props) => {
    const classes= useStyles();
    const [location, setLocation] = useState(null);

    // when component mounts pull the location from the browser
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) { setLocation(position.coords) },
        function error(msg) { console.log('error getting geolocation:', msg) },
            { maximumAge: 10000, timeout: 50000, enableHighAccuracy: true })}, []);

    // dispatch to get weather from the server side axios call, will run when weather is updated as long as location is not null
    useEffect(() => {location != null && props.dispatch({type:'GET_WEATHER', payload:{latitude: location.latitude, longitude: location.longitude}})}, [location])



return(


<footer className={classes.root}>
    <hr/>
    <Grid container className={classes.root} justify='space-between' >
        <Grid item xs={2}>
            {props.weather.weather &&
            <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                            image={`https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`}
                            title="Weather"
                            />
                <Typography className={classes.weatherHeading}>
                    {props.weather.weather && props.weather.name}<br />
                </Typography>
                <Typography className={classes.weather}>
                    {props.weather.main.temp.toFixed(0)}&#8457;<br />
                    {props.weather.weather[0].description}
                </Typography>
            </Card>}
        </Grid>
            <Grid item style={{alignSelf:'flex-end', color:'white'}}>
                &copy; Herdsman
            </Grid>
    </Grid>
</footer>


)
};

const mapState = (state) => ({weather: state.weather})

export default connect(mapState)(Footer);
