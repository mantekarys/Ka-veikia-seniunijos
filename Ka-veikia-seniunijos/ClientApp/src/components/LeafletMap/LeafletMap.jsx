import React, { useState } from 'react';
import './_leaflet-map-style.scss';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Switch } from 'pretty-checkbox-react';

export default function LeafletMap({ lat, lng }) {
    const [showEvents, setShowEvents] = useState(true);
    const [showPlaces, setShowPlaces] = useState(true);

    const handleOnEventChange = () => {
        setShowEvents((showEvents) => setShowEvents(!showEvents));
    }

    const handleOnPlacesChange = () => {
        setShowPlaces((showPlaces) => setShowPlaces(!showPlaces));
    }

    return (
        <div className="map__container">
            <div className="map__header">
                <h1 className="header__primary">Interaktyvus žemėlapis</h1>
                <p className="paragraph--large">Žemėlapis, kuriame galite rasti visus seniūnijų renginius ir lankytinas vietas</p>

                <Switch
                    color='primary'
                    shape='fill'
                    style={{ fontSize: '15px' }}
                    onChange={handleOnEventChange}
                    checked={showEvents}
                >
                    <b>Renginiai</b>
                </Switch>
                <Switch
                    color='primary'
                    shape='fill'
                    style={{ fontSize: '15px' }}
                    onChange={handleOnPlacesChange}
                    checked={showPlaces}
                >
                    <b>Lankytinos vietos</b>
                </Switch>
            </div>

            <MapContainer center={[lat, lng]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    );
}