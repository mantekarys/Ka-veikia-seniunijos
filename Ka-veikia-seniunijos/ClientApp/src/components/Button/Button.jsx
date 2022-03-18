import React from 'react';
import PropTypes from 'prop-types';
import '../style.css';

export default function Button({ href, styling, text, type, onClick }) {
    const handleOnClick = (e) => {
        if (href) {
            window.location.href = href;
        }

        e.preventDefault();
        if (onClick) onClick();
    }

    return (
        <a
            href={href ? href : ''}
            className={styling}
            type={type}
            onClick={handleOnClick}
        >
            {text}
        </a>
    );
}

Button.propTypes = {
    href: PropTypes.string,
    styling: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func
}