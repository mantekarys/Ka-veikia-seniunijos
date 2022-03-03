import React, { useContext } from 'react';
import Button from '../Button/Button';
import { GlobalContext } from '../Pages/Home/Context/GlobalState';
import PropTypes from 'prop-types';
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'


export default function Sidebar({ onClose }) {
    const {
        toggleLoginPopup,
        toggleSignupPopup,
    } = useContext(GlobalContext);

    return (
        <div className='sidebar'>
            <FontAwesomeIcon className='form__icon' icon={faXmark} onClick={onClose} />
            <ul className='sidebar__list'>
                <li className='sidebar__list--item'>
                    <Button
                        text='Prisijungti'
                        styling='btn--sidebar'
                        onClick={toggleLoginPopup}
                    />
                </li>
                <li className='sidebar__list--item'>
                    <Button
                        text='Registruotis'
                        styling='btn--sidebar'
                        onClick={toggleSignupPopup}
                    />
                </li>
                <li className='sidebar__list--item'>
                    <Button
                        text='Apie projektą'
                        styling='btn--sidebar'
                    />
                </li>
            </ul>
        </div>
    );
}

Sidebar.prototype = {
    onClose: PropTypes.func
}