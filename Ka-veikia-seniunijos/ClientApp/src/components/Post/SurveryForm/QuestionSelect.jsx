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
  });

  const [question, setQuestion] = useState({
      Text: '',
      Rating: 0,
      Number: 0
  })

  const [isOptionsOpen, setIsOptionsOpne] = useState(false);
  const [isError, setIsError] = useState(false);

    const handleOnRadioChange = (e) => {
        setChecked({
            open: e.target.name === 'open',
            rating: e.target.name === 'rating',
        });

        if(e.target.name === 'rating') {
            setQuestion({
                ...question,
                Rating: 5
            })
        }
    }

    const handleOnAdd = () => {
        if(!question.Text) {
            setIsError(true);
            setTimeout(() => setIsError(false), 400)
            return;
        }

        onAdd(checked.open ? {...question, Rating: 0} : question);
        setQuestion({
            Text: '',
            rating: 5
        })
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
                </div>

                <Input
                    styling={`survey-form__input survey-form__input--question ${isError ? 'survey-form__input--shake' : ''}`}
                    type='text'
                    placeholder='Klausimas'
                    value={question.Text}
                    onChange={(e) => setQuestion({
                        ...question,
                        Text: e.target.value,
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
                                Rating: value
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