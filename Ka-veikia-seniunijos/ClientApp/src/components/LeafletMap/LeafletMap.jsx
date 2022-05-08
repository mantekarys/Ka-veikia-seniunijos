import React from 'react';
import './_leaflet-map-style.scss';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import { Switch } from 'pretty-checkbox-react';
import PropTypes from 'prop-types';

export default function LeafletMap({ lat, lng, switchState, url, pins }) {
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

            <MapContainer center={[lat, lng]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <>
                {pins.map((pin, index) => {
                    return (
                        <Marker position={[pin.Latitude, pin.Longtitude]} key={index}>
                            <Popup>
                                {pin.Type === 'event' ? 'Renginys' : 'Lankytina vieta'}
                                <br />
                                <b>{pin.Name}</b>
                            </Popup>
                        </Marker>
                    );
                })}
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