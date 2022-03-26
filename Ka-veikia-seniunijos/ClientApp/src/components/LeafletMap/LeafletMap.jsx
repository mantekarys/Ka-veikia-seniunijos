import React from 'react';
import './_leaflet-map-style.scss';
import { MapContainer, TileLayer } from 'react-leaflet';


export default function LeafletMap({ lat, lng }) {
    return (
        <div className="map__container">
            <MapContainer center={[lat, lng]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    );
}