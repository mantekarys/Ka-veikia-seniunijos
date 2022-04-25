import React, { useState, useEffect } from 'react';
import HomeHeader from '../../Header/HomeHeader';
import UserHeader from '../../Header/UserHeader';
import LeafletMap from '../../LeafletMap/LeafletMap';
import axios from 'axios';

function Map() {
    const url = new URL(window.location.href);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [pins, setPins] = useState([]);
    const [switchState, setSwitchState] = useState({
        events: url.searchParams.get('events') === 'true',
        places: url.searchParams.get('places') === 'true',
        free: url.searchParams.get('free') === 'true',
    })

    useEffect(() => {
        const fetchPins = async() => {
            try {
                const pinsData = await axios.get(`https://localhost:44330/api/map/pins?events=${switchState.events}&places=${switchState.places}&free=${switchState.free}`);
                setPins(pinsData.data);
            } catch(err) {
                console.log(err)
            }
        } 

        fetchPins();
    }, [])

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((positon) => {
                setLatitude(positon.coords.latitude);
                setLongitude(positon.coords.longitude);
    
            }, (err) => {
                setLatitude(54.687157);
                setLongitude(25.279652);
            });
        }
    }, [])


    return (
        <>
            {sessionStorage['userData'] ? <UserHeader /> : <HomeHeader />}
            {latitude && longitude && <LeafletMap lat={latitude} lng={longitude} switchState={switchState} url={url} pins={pins}/>}
        </>
    );
}

export default Map;