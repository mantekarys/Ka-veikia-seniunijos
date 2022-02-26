import React from 'react';
import '../style.css';

export default function Error({ text }) {
    return (
        <p className="error__message">{text}</p>
    );
}