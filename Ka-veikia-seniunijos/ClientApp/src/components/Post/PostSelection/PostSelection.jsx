import React, { useState } from 'react';
import Button from '../../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Radio } from 'pretty-checkbox-react';
import PropTypes from 'prop-types';
import '../../Button/_button.scss';
import './_post-selection-style.scss';
import '../../Utils/_base.scss';

export default function PostSelection({ onClose }) {
    const [checked, setChecked] = useState({
        post: true,
        event: false,
        survey: false
    });

    const handleOnRadioChange = (e) => {
        setChecked({
            post: e.target.name === 'post',
            event: e.target.name === 'event',
            survey: e.target.name === 'survey',
        });
    }

    return (
        <div className='post-selection__container'>
            <FontAwesomeIcon className='form__icon' icon={faXmark} onClick={onClose} />
            <h2 className='header__secondary u-text-center u-margin-top-medium'>
                Pasirinkite įrašo tipą
            </h2>

            <div className='post-selection__options'>
                <div className='post-selection__options-radio'>
                    <Radio
                        name="post"
                        color="primary"
                        style={{ fontSize: '25px' }}
                        checked={checked.post}
                        onChange={handleOnRadioChange}
                    >
                        Paprastas įrašas
                </Radio>
                </div>

                <div className='post-selection__options-radio'>
                    <Radio
                        name="event"
                        color="primary"
                        style={{ fontSize: '25px' }}
                        checked={checked.event}
                        onChange={handleOnRadioChange}
                    >
                        Nauajas renginys
                </Radio>
                </div>

                <div className='post-selection__options-radio'>
                    <Radio
                        name="survey"
                        color="primary"
                        style={{ fontSize: '25px' }}
                        checked={checked.survey}
                        onChange={handleOnRadioChange}
                    >
                        Nauja apklausa
                </Radio>
                </div>
            </div>

            <div className='post-selection__buttons'>
                <Button
                    text='Uždaryti'
                    onClick={onClose}
                    styling='btn btn--post'
                />

                <Button
                    text='Toliau'
                    styling='btn btn--post'
                />
            </div>
        </div>
    );
}

PostSelection.propTypes = {
    onClose: PropTypes.func
}