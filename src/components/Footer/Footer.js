import React ,{ useEffect, useState } from 'react';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';
import './Footer.css';
import Grid from '@material-ui/core/Grid';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = (props) => {
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);


    useEffect(() => {navigator.geolocation.getCurrentPosition(function (position) { setLocation(position.coords) })}, [])
    useEffect(() => {location != null && props.dispatch({type:'GET_WEATHER', payload:{latitude: location.latitude, longitude: location.longitude}})}, [location])



return(


        <footer>
            <Grid container style={{padding: 0}} >
       {props.weather.weather && <img src={`https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`} />}
       current weather for {props.weather.weather && props.weather.name}<br/>
            
            
            &copy; Herdsman
            </Grid>
        </footer>


)
};

const mapState = (state) => ({weather: state.weather})

export default connect(mapState)(Footer);
