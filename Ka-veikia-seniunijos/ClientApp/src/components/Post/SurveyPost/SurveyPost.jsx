import React from 'react';
import Button from '../../Button/Button';
import SurveyQuestion from './SurveyQuestion';

export default function SurveyPost({survey}) {
    return (
        <>
            <h3 className='header__tertiary'>Apklausa</h3>
            <p className='post__header-event'><b>{survey.Name}</b></p>
            <div className='post__content-questions'>
                {survey.Question.map((question, index) => {
                    return (
                        <div className='post__content-question' key={index}>
                            <p className='post__content-question-name'>{question.Text}</p>
                            <SurveyQuestion rating={question.Rating}/>
                        </div>
                    )})}
            </div>
            <div className='survey__button'>
                <Button text='Atsakyti' styling='btn btn--post-small'/>
            </div>
        </>
    )
}
