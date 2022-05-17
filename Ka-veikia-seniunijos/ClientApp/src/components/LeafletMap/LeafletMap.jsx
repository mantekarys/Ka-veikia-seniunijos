import React from 'react';
import './_leaflet-map-style.scss';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import { Switch } from 'pretty-checkbox-react';
import PropTypes from 'prop-types';


import MarkerClusterGroup from 'react-leaflet-markercluster';

import {PinInfo} from './PinInfo';
import {useState, useEffect } from 'react';
import "./styles.scss";

export default function LeafletMap({ lat, lng, switchState, url, pins }) {

    const [infoShow, setInfoShow] = useState(false);
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    return (
        <div className="map__container">
            <div className="map__header">
                <h1 className="header__primary">Interaktyvus žemėlapis</h1>
                <p className="paragraph--large">Žemėlapis, kuriame galite rasti visus seniūnijų renginius ir lankytinas vietas</p>
            </div>
            <div className='map__select'>
                <Switch
                    color='primary'
                    shape='fill'
                    style={{ fontSize: '15px' }}
                    onChange={() => {
                        url.searchParams.set('events', !switchState.events);
                        window.location.href = url;
                    }}
                    checked={switchState.events}
                >
                    <b>Renginiai</b>
                </Switch>
                <Switch
                    color='primary'
                    shape='fill'
                    style={{ fontSize: '15px' }}
                    onChange={() => {
                        url.searchParams.set('places', !switchState.places);
                        window.location.href = url;
                    }}
                    checked={switchState.places}
                >
                    <b>Lankytinos vietos</b>
                </Switch>
                <Switch
                    color='primary'
                    shape='fill'
                    style={{ fontSize: '15px' }}
                    onChange={() => {
                        url.searchParams.set('free', !switchState.free);
                        window.location.href = url;
                    }}
                    checked={switchState.free}
                >
                    <b>Nemokami renginiai</b>
                </Switch>
            </div>
            <PinInfo show={infoShow}
                    onHide={()=>setInfoShow(false)}
                    description={description}
                    type={type}
                    name={name}/>
            <MapContainer center={[lat, lng]} zoom={8}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <>
                
                <MarkerClusterGroup>
                    {pins.map((pin, index) => {
                        return (
                            <Marker marker-options-id= {pin}  position={[pin.Latitude, pin.Longtitude]} key={index} 
                            eventHandlers={{ click: (e)=>{var z=e.target.options["marker-options-id"];
                            console.log(z);setDescription(z.Description);setType(z.Type === 'event' ? 'Renginys' : 'Lankytina vieta');
                            setName(z.Name);setInfoShow(true)}}}>
                                <Popup>
                                    {pin.Type === 'event' ? 'Renginys' : 'Lankytina vieta'}
                                    <br />
                                    <b>{pin.Name}</b>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MarkerClusterGroup>
                </>
            </MapContainer>
        </div>
    );
}

LeafletMap.propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    switchState: PropTypes.shape({
        events: PropTypes.bool,
        places: PropTypes.bool,
        free: PropTypes.bool
    }),
    url: PropTypes.object,
    pins: PropTypes.array
}