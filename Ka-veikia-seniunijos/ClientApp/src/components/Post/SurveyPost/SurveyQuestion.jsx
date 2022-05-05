import React, { useState } from 'react'
import { Radio } from 'pretty-checkbox-react';
import Input from '../../Form/Input';
import PropTypes from 'prop-types';

export default function SurveyQuestion({rating}) {
    const [activeRadio, setActiveRadio] = useState(null);

    const renderOpenQuestionInput = () => {
        return (
            <Input 
                styling='post__content-question-input'
                type='text'
                placeholder='Atsakymas'
            />
        )
    }

    const renderRadioButtons = () => {
        return (
            <div className='post__content-radio'>
                {[...Array(rating)].map((x, index) => {
                    return(
                        <Radio
                            name="open"
                            color="primary"
                            style={{ fontSize: '15px' }}
                            checked={true}
                            key={index}
                            onChange={() =>  setActiveRadio(index)}
                        >
                            {x}
                        </Radio>
                    )})}
            </div>
        )
    }
    return (
        <>
            {rating === 0 ? renderOpenQuestionInput() : renderRadioButtons()}
        </>
    )
}

SurveyQuestion.propTypes = {
    rating: PropTypes.number
}