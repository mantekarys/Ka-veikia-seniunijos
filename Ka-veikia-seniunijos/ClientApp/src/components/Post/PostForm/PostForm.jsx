import React, { useState } from 'react';
import NewPostHeader from '../NewPostHeader';
import Error from '../../Error/Error';
import TextArea from '../../Form/TextArea';
import Button from '../../Button/Button';
import './_post-form-style.scss';
import '../../Utils/_base.scss';
import '../../Button/_button.scss';
import PropTypes from 'prop-types';

export default function PostForm({ onClose, onBack, onPost }) {
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    const handleOnSubmit = () => {
        if (!text) {
            setError('Įrašo tekstas neagli būti tuščias!');
            return;
        }

        onPost();
    }

    return (
        <form className='post-form__container' >
            <NewPostHeader onClose={onClose} text='Naujas įrašas' />
            <TextArea
                styling='post-form__textarea'
                placeholder='Įrašo tekstas...'
                limit={500}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            {error && <Error text={error} />}

            <div className='post-form__buttons'>
                <Button
                    text='Atgal'
                    styling='btn btn--post-small'
                    onClick={onBack}
                />
                <Button
                    text='Skelbti'
                    styling='btn btn--post-small'
                    onClick={handleOnSubmit}
                />
            </div>
        </form>
    );
}

PostForm.propTypes = {
    onClose: PropTypes.func,
    onBack: PropTypes.func,
    onPost: PropTypes.func,
}