import React from 'react';
import '../style.css';

export default function Popup({ children }) {
    return (
        <div className='popup'>
            {children}
        </div>

    );
}