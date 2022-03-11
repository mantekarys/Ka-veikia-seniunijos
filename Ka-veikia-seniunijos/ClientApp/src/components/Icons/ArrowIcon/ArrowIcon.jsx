import React from 'react';
import './_arrow-icon-style.scss';
import '../../Utils/_base.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

export default function ArrowIcon({ side, onClick }) {
    const getIconSide = () => {
        return side === 'left' ? faArrowLeft : faArrowRight;
    }

    return (
        <div className={`arrow-icon__container arrow-icon__container--${side}`}>
            <FontAwesomeIcon className='arrow-icon' icon={getIconSide()} onClick={onClick} />
        </div>    
    );
}

ArrowIcon.prototype = {
    side: PropTypes.string.isRequired,
    onClick: PropTypes.func
}