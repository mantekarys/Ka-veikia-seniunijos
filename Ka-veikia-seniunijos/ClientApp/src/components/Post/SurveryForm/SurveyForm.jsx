import React, {useState} from 'react'
import NewPostHeader from '../NewPostHeader';
import QuestionSelect from './QuestionSelect';
import Error from '../../Error/Error';
import Input from '../../Form/Input';
import NewPostButtons from '../NewPostButtons';
import PropTypes from 'prop-types';
import './_survey-form-style.scss';


export default function SurveyForm({onClose, onBack, onPost}) {
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

        onPost();
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
                        </>
                    )}
                </div>
                <QuestionSelect onAdd={(newQuestion) => setQuestions({
                    'questions': [...questions.questions, newQuestion]
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
    onPost: PropTypes.func
}
