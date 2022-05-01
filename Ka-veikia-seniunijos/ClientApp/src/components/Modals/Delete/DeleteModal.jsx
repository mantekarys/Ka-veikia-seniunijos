import React from 'react'
import Button from '../../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import '../_modals-style.scss';

export default function DeleteModal({onClose, onDelete}) {
  return (
    <div className='modal__container modal--delete' id='delete-modal'>
        <FontAwesomeIcon className='form__icon' icon={faXmark} onClick={onClose}/>
        <h3 className='header__tertiary modal__container-header'>Ar tikrai norite pašalinti įrašą?</h3>

        <div className='modal__container-buttons'>
            <Button text='Atšaukti' styling='btn btn--icon' onClick={onClose}/>
            <Button text='Ištrinti' styling='btn btn--icon' onClick={onDelete}/>
        </div>
    </div>
  )
}

DeleteModal.propTypes = {
    onClose: PropTypes.func,
    onDelete: PropTypes.func
}
