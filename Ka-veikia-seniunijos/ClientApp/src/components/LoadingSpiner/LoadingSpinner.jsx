import React from 'react';
import './_loading-spiner-style.scss';
import Popup from '../Popup/Popup';


export default function LoadingSpinner() {
    return (
        <Popup>
            <div className='loading-spinner' />
        </Popup>
    );
}