import React from 'react'
import PropTypes from 'prop-types';
import DefaultPicture from '../../../images/user-profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome, faUser, faMap, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import './_feed-sidebar.scss';

export default function FeedSidebar() {
    const {FirstName, LastName, Name, isEldership} = JSON.parse(sessionStorage['userData']);

    return (
        <div className='feed-sidebar'>
            <div className='name-wrapper'>
                <img 
                    src={isEldership ? require(`../../../images/${Name}.png`) : DefaultPicture}
                    alt='Profile'
                    className='name-wrapper__image'
                />
                <span className='name-wrapper__name'>
                    {isEldership ? Name : `${FirstName} ${LastName}`}
                </span>
            </div>

            <div className='options'>
                <ul className='options__list'>
                    <li className='options__list-item' onClick={() => window.location.href = '/home'}>
                        <a className='options__list-item-link'>
                            <FontAwesomeIcon icon={faHome}/>
                            Namai
                        </a>
                    </li>
                    <li className='options__list-item' onClick={() => window.location.href = isEldership ? `/mailbox?name=${Name}` : `/mailbox?name=${FirstName}.${LastName}`}>
                        <a className='options__list-item-link'>
                            <FontAwesomeIcon icon={faEnvelope}/>
                            Žinutės
                        </a>
                    </li>
                    <li className={`options__list-item ${!isEldership && 'options__list-item--active'}`} onClick={() => window.location.reload()}>
                        <a className='options__list-item-link'>
                            <FontAwesomeIcon icon={faNewspaper}/>
                            Seniūnija
                        </a>
                    </li>
                    <li className='options__list-item' onClick={() => window.location.href = '/map?events=true&places=true&free=true'}>
                        <a className='options__list-item-link'>
                            <FontAwesomeIcon icon={faMap}/>
                            Renginiai
                        </a>
                    </li>
                    <li 
                        className={`options__list-item ${isEldership && 'options__list-item--active'}`}
                        onClick={() => window.location.href = isEldership ? `/eldership?eldership=${Name}` : `/profile?name=${FirstName}.${LastName}`}
                    >
                        <a className='options__list-item-link'>
                            <FontAwesomeIcon icon={faUser}/>
                            Profilis
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

FeedSidebar.propTypes = {

}

