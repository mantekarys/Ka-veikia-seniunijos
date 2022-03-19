import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMap, faArrowRightFromBracket, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import './_navigation-list-style.scss';
import '../Utils/_base.scss';

export default function NavigationList() {
    return (
        <ul className='navigation-list__container'>
            <li className='navigation-list__item'>
                <FontAwesomeIcon className='' icon={faUser} />
                Profilis
             </li>

            <li className='navigation-list__item'>
                <FontAwesomeIcon className='' icon={faEnvelope} />
                Žinutės
             </li>

            <li className='navigation-list__item'>
                <FontAwesomeIcon className='' icon={faMap} />
                Žemėlapis
            </li>

            <li className='navigation-list__item'>
                <FontAwesomeIcon className='' icon={faArrowRightFromBracket} />
                Atsijungti
            </li>
        </ul>
    );
}