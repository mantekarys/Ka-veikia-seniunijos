import React, {useState} from 'react'
import { Radio } from 'pretty-checkbox-react';
import PropTypes from 'prop-types';
import Input from '../../Form/Input';
import Button from '../../Button/Button';

export default function SurveyPost({survey}) {
    const [activeRadio, setActiveRadio] = useState(4);

    const renderOpenQuestionInput = () => {
        return (
            <Input 
                styling='post__content-question-input'
                type='text'
                placeholder='Atsakymas'
            />
        )
    }

    const renderRadioButtons = (rating) => {
        return (
            <div className='post__content-radio'>
                {[...Array(rating)].map((x, index) => {
                    return(
                        <Radio
                            name="open"
                            color="primary"
                            style={{ fontSize: '15px' }}
                            checked={index === activeRadio}
                            key={index}
                            onChange={() => setActiveRadio(index)}
                        >
                            {x}
                        </Radio>
                    )})}
            </div>
        )
    }
    return (
        <>
            <h3 className='header__tertiary'>Apklausa</h3>
            <p className='post__header-event'><b>{survey.Name}</b></p>
            <div className='post__content-questions'>
                {survey.Question.map((question, index) => {
                    return (
                        <div className='post__content-question' key={index}>
                            <p className='post__content-question-name'>{question.Text}</p>
                            {question.Rating === 0 ? renderOpenQuestionInput() : renderRadioButtons(question.Rating)}
                        </div>
                    )})}
            </div>
            <div className='survey__button'>
                <Button text='Atsakyti' styling='btn btn--post-small'/>
            </div>
        </>
    )
}
