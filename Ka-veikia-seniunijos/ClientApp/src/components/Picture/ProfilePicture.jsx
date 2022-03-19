import React from 'react';
import './_picture-style.scss';
import '../Utils/_base.scss';
import PropTypes from 'prop-types';

export default function ProfilePicute({ source, eldershipName }) {
    return (
        <img src={source} alt={eldershipName} className='picutre--profile' />
    );
}

ProfilePicute.prototype = {
    source: PropTypes.string,
    eldershipName: PropTypes.string
}