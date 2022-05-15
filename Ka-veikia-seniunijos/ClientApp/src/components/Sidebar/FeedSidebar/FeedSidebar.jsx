import React, { useEffect } from 'react'
import DefaultPicture from '../../../images/user-profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome, faUser, faMap, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import './_feed-sidebar.scss';

export default function FeedSidebar() {
    let FirstName = null;
    let LastName = null;
    let Name = null;
    let isEldership = null;
    const isAnonymous = localStorage.getItem('UserData') === null;

    useEffect(() => {
        if(localStorage.getItem('UserData')) {
            FirstName = JSON.parse(sessionStorage['UserData']).FirstName;
            LastName = JSON.parse(sessionStorage['UserData']).LastName;
            Name = JSON.parse(sessionStorage['UserData']).Name;
            isEldership = JSON.parse(sessionStorage['UserData']).isEldership;
        }
    }, [])

    return (
        <div className='feed-sidebar'>
            {!isAnonymous &&
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
            }   

            <div className={`options ${isEldership === null && 'options--anonymous'}`}>
                <ul className='options__list'>
                    <li className='options__list-item' onClick={() => window.location.href = '/home'}>
                        <a className='options__list-item-link'>
                            <FontAwesomeIcon icon={faHome}/>
                            Namai
                        </a>
                    </li>
                    {!isAnonymous && 
                        <li className='options__list-item' onClick={() => window.location.href = isEldership ? `/mailbox?name=${Name}` : `/mailbox?name=${FirstName}.${LastName}`}>
                            <a className='options__list-item-link'>
                                <FontAwesomeIcon icon={faEnvelope}/>
                                Žinutės
                            </a>
                        </li>
                    }

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
                    {!isAnonymous && 
                        <li 
                        className={`options__list-item ${isEldership && 'options__list-item--active'}`}
                        onClick={() => window.location.href = isEldership ? `/eldership?eldership=${Name}` : `/profile?name=${FirstName}.${LastName}`}
                        >  
                            <a className='options__list-item-link'>
                                <FontAwesomeIcon icon={faUser}/>
                                Profilis
                            </a>
                        </li>
                    }
                </ul>
            </div>
        </div>
    )
}

FeedSidebar.propTypes = {

}

