import React from 'react';
//import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';


export default function Map() {
    const MapEvents = () => {
        useMapEvents({
          click(e) {
            // setState your coords here
            // coords exist in "e.latlng.lat" and "e.latlng.lng"
            console.log(e.latlng.lat);
            console.log(e.latlng.lng);
          },
        });
        return false;
    }
    return (
        <div class="pad">
            {/* <MapContainer center={[51.505, -0.09]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapEvents />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <Marker position={[54.90189637528277,23.96126590688861]}>
            <Popup>
                Here lives sadness
            </Popup>
            </Marker>
            </MapContainer> */}
        </div>
    );
}