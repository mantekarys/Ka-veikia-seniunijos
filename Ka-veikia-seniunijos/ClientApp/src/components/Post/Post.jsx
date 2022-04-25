import React from 'react';
import './_post-style.scss';
import '../Utils/_base.scss';
import '../Utils/_typography.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

export default function Post(props) {    
    return (
        <div className='post__container'>
            <div className='post__header'>
                <div className='post__header-owner'>
                    <img src={props.pictureSource} alt={props.eldershipName} className='post__header-picture' />
                    <h3 className='post__header-name'>{props.eldershipName}</h3>
                    <p className='post__header-date'>{props.date}</p>
                </div>

                {sessionStorage['userData']?.isEldership ? <FontAwesomeIcon className='post__header-icon' icon={faEllipsis} /> : ''}
            </div>

            <div className='post__content'>
                {props.children}
            </div>
        </div>
    );
}   