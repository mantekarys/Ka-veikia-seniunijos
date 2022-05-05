import React, {useState} from 'react'
import NewPostHeader from '../NewPostHeader';
import QuestionSelect from './QuestionSelect';
import Error from '../../Error/Error';
import Input from '../../Form/Input';
import NewPostButtons from '../NewPostButtons';
import PropTypes from 'prop-types';
import './_survey-form-style.scss';
import axios from 'axios';


export default function SurveyForm({onClose, onBack, toggleSpinner}) {
    const [name, setName] = useState('');
    const [questions, setQuestions] = useState({'questions':[]});
    const [errorMessage, setErrorMessage] = useState('');

    const onFormSubmit = () => {
        if(!name) {
            setErrorMessage('Apklausa turi turėti pavadinimą');
            return;
        }

        if(questions.questions.length == 0) {
            setErrorMessage('Apklausa turi turėti bent vieną klausimą');
            return;
        }

        postSurvey();
    }

    const postSurvey = () => {
        axios.post('https://localhost:44330/api/survey', {
            name,
            EldershipFk: JSON.parse(sessionStorage['userData']).Id,
            PostDate: getTodaysDate(),
            Question: [...questions.questions]
        })
        .then(_ => toggleSpinner());
    }

    const getTodaysDate = () => {
        const today = new Date();
        return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
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
                            <p key={index} className='survey-form__question'>{`${index + 1}. ${question.Text}`}</p>
                        </>
                    )}
                </div>
                <QuestionSelect onAdd={(newQuestion) => setQuestions({
                    'questions': [...questions.questions, {
                        ...newQuestion,
                        Number: questions.questions.length + 1
                    }]
                })}/>

                {errorMessage && <Error text={errorMessage} />}
                <NewPostButtons onBack={onBack} onSubmit={onFormSubmit} />
            </form>
        </div>
    )
}

SurveyForm.propTypes = {
    onClose: PropTypes.func,
    onBack: PropTypes.func,
    toggleSpinner: PropTypes.func
}
