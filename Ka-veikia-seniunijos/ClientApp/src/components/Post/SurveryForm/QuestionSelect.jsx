import React, {useState} from 'react';
import Input from '../../Form/Input';
import Button from '../../Button/Button';
import { Radio } from 'pretty-checkbox-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Slider } from 'antd'; 
import PropTypes from 'prop-types';
import './_survey-form-style.scss';

export default function QuestionSelect({onAdd}) {
  const [checked, setChecked] = useState({
    open: true,
    rating: false,
    closed: false
  });

  const [question, setQuestion] = useState({
      questionName: '',
      scale: 0,
      answers: []
  })
  
  const [isOptionsOpen, setIsOptionsOpne] = useState(false);
  const [isError, setIsError] = useState(false);

    const handleOnRadioChange = (e) => {
        setChecked({
            open: e.target.name === 'open',
            rating: e.target.name === 'rating',
            closed: e.target.name === 'closed',
        });
    }

    const handleOnAdd = () => {
        if(!question.questionName) {
            setIsError(true);
            setTimeout(() => setIsError(false), 400)
            return;
        }

        onAdd(question)
    }

  return (
    <div className='question-select'>
        <p className='question-select__text'>
            Pridėti klausimą 
            <FontAwesomeIcon className='question-select__icon' icon={isOptionsOpen ? faMinus : faPlus} onClick={() => setIsOptionsOpne(!isOptionsOpen)}/>
        </p>

        {isOptionsOpen && 
            <>
                <div className='question-select__options'>
                    <Radio
                        name="open"
                        color="primary"
                        style={{ fontSize: '15px' }}
                        checked={checked.open}
                        onChange={handleOnRadioChange}
                    >
                        Atviras klausimas
                    </Radio>

                    <Radio
                        name="rating"
                        color="primary"
                        style={{ fontSize: '15px' }}
                        checked={checked.rating}
                        onChange={handleOnRadioChange}
                    >
                        Vertinimo klausimas
                    </Radio>

                    <Radio
                        name="closed"
                        color="primary"
                        style={{ fontSize: '15px' }}
                        checked={checked.closed}
                        onChange={handleOnRadioChange}
                    >
                        Uždaras klausiams
                    </Radio>
                </div>

                <Input
                    styling={`survey-form__input survey-form__input--question ${isError ? 'survey-form__input--shake' : ''}`}
                    type='text'
                    placeholder='Klausimas'
                    value={question.questionName}
                    onChange={(e) => setQuestion({
                        ...question,
                        'questionName': e.target.value
                    })}
                />

               {checked.rating &&
                    <div className='question-select__slider'>
                        <p className='question-select__text'>Vertinimo skalė</p>
                        <Slider 
                            defaultValue={5}
                            max={10}
                            min={1}
                            marks={{
                                1: '1',
                                10: '10'
                            }}
                            onChange={(value) => setQuestion({
                                ...question,
                                'scale': value
                            })}
                        />
                    </div>
               } 

                <Button
                    text='Pridėti'
                    styling='btn btn--post-question'
                    onClick={handleOnAdd}
                />
            </>
        }

    </div>
  )
}


QuestionSelect.propTypes = {
    onAdd: PropTypes.func
}