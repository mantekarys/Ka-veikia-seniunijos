import React from 'react';
import './_post-style.scss';
import '../Utils/_base.scss';
import '../Utils/_typography.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

export default function Post({ eldershipName, pictureSource, content, date }) {    
    return (
        <div className='post__container'>
            <div className='post__header'>
                <div className='post__header-owner'>
                    <img src={pictureSource} alt={eldershipName} className='post__header-picture' />
                    <h3 className='post__header-name'>{eldershipName}</h3>
                    <p className='post__header-date'>{date}</p>
                </div>

                {JSON.parse(sessionStorage['userData']).isEldership ? <FontAwesomeIcon className='post__header-icon' icon={faEllipsis} /> : ''}
            </div>

            <div className='post__content'>
                <p className='paragraph--post'>{content}</p>
            </div>
        </div>
    );
}   

Post.prototype = {
    eldershipName: PropTypes.string,
    pictureSource: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
}