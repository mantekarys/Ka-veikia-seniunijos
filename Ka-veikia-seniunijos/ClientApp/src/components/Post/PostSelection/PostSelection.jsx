import React, { useState } from 'react';
import Button from '../../Button/Button';
import NewPostHeader from '../NewPostHeader';
import { Radio } from 'pretty-checkbox-react';
import PropTypes from 'prop-types';
import '../../Button/_button.scss';
import './_post-selection-style.scss';
import '../../Utils/_base.scss';

export default function PostSelection({ onClose, onPostSelect, onNewEventSelect }) {
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

    const handleOnNext = () => {
        if (checked.post) onPostSelect();
        else if (checked.event) onNewEventSelect();
    }

    return (
        <div className='post-selection__container'>
            <NewPostHeader onClose={onClose} text='Pasirinkite įrašo tipą'/>

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
                    onClick={handleOnNext}
                />
            </div>
        </div>
    );
}

PostSelection.propTypes = {
    onClose: PropTypes.func,
    onPostSelect: PropTypes.func,
}