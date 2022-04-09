import React, {useState} from 'react'
import NewPostHeader from '../NewPostHeader';
import QuestionSelect from './QuestionSelect';
import Error from '../../Error/Error';
import Button from '../../Button/Button';
import Input from '../../Form/Input';
import { Radio } from 'pretty-checkbox-react';
import PropTypes from 'prop-types';
import './_survey-form-style.scss';


export default function SurveyForm({onClose}) {
    const [name, setName] = useState('');
    const [questions, setQuestions] = useState({'questions':[]});
    
    const renderRadioButtons = (scale) => {
        const radioButtons = [];
        for(let i = 0; i < scale; i++) {
            radioButtons.push( 
                <Radio name="rating" color="primary" style={{ fontSize: '10px' }} key={i}>
                    {i + 1}
                </Radio>
            )
        }

        return radioButtons;
    }

    return (
        <div className='survey-form__container'>
            <NewPostHeader onClose={onClose} text='Nauja apklausa' />
            <form action="post" className='survey-form__content'>
                <Input
                    styling='survey-form__input'
                    type='text'
                    placeholder='Apklausos pavadinimas'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <div className='survey-form__questions'>
                    {questions.questions.map((question, index) => 
                        <>
                            <p key={index} className='survey-form__question'>{`${index + 1}. ${question.questionName}`}</p>
                            <div className='survey-form__question-rating' key={index + 100}>
                                {renderRadioButtons()}
                            </div>
                        </>
                    )}
                </div>
                <QuestionSelect onAdd={(newQuestion) => setQuestions({
                    'questions': [...questions.questions, newQuestion]
                })}/>
            </form>
        </div>
    )
}

SurveyForm.propTypes = {
    onClose: PropTypes.func
}
