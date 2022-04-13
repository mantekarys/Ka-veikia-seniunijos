import React, { useState, useEffect } from 'react';
import HomeHeader from '../../Header/HomeHeader';
import UserHeader from '../../Header/UserHeader';
import LeafletMap from '../../LeafletMap/LeafletMap';
import Footer from '../../Footer/Footer';

function Map() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((positon) => {
            setLatitude(positon.coords.latitude);
            setLongitude(positon.coords.longitude);

        }, (err) => {
            setLatitude(54.687157);
            setLongitude(25.279652);
        });
    }

    return (
        <>
            {sessionStorage['userData'] ? <UserHeader /> : <HomeHeader />}
            {latitude && longitude && <LeafletMap lat={latitude} lng={longitude} />}
        </>
    );
}

export default Map;