import React ,{ useEffect, useState } from 'react';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';
import './Footer.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
    root: {
        marginBottom: 2,
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
        backgroundColor:'blue',
        color:'white',

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
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = (props) => {
    const classes= useStyles();
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);


    useEffect(() => {navigator.geolocation.getCurrentPosition(function (position) { setLocation(position.coords) })}, [])
    useEffect(() => {location != null && props.dispatch({type:'GET_WEATHER', payload:{latitude: location.latitude, longitude: location.longitude}})}, [location])



return(


<footer className={classes.root}>
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
            <Grid item style={{alignSelf:'flex-end'}}>
                    &copy; Herdsman
            </Grid>
    </Grid>
</footer>


)
};

const mapState = (state) => ({weather: state.weather})

export default connect(mapState)(Footer);
