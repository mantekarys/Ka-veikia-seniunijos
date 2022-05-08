import React from 'react';
import { TimePicker, DatePicker } from 'antd';
import moment from 'moment';
import './_time-input-style.scss';
import PropTypes from 'prop-types';

export default function TimeInput({
    startTime,
    endTime,
    currentDate,
    onStartTimeChange,
    onEndTimeChange,
    onDateChange
    }) {

    const timeInputStyle = {
        padding: "10px",
        fontSize: "20px",
        width: "200px",
        border: "2px solid #c7c7cd"
    }

    const FORMATS = {
        DATE: 'YYYY-MM-DD',
        TIME: 'HH:mm'
    }


    const parseDate = (date) => {
        const newDate = moment(date, FORMATS.DATE).toDate();
        return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
    }

    return (
        <div className='time__container'>
            <div className='time__container-input'>
                <label className='time__container-label'>Renginio pradžia</label>

                <TimePicker
                    defaultValue={moment(startTime, FORMATS.TIME)}
                    format={FORMATS.TIME}
                    showNow={false}
                    onChange={(value) => onStartTimeChange(moment(value).format(FORMATS.TIME))}
                    style={timeInputStyle}
                />
            </div>

            <div className='time__container-input'>
                <label className='time__container-label'>Renginio pabaiga</label>

                <TimePicker
                    defaultValue={moment(endTime, FORMATS.TIME)}
                    format={FORMATS.TIME}
                    showNow={false}
                    onChange={(value) => onEndTimeChange(moment(value).format(FORMATS.TIME))}
                    style={timeInputStyle}
                />
            </div>

            <div className='time__container-input'>
                <label className='time__container-label'>Renginio data</label>

                <DatePicker
                    defaultValue={moment(currentDate, FORMATS.DATE)}
                    format={FORMATS.DATE}
                    style={timeInputStyle}
                    onChange={(date) => onDateChange(parseDate(date))}
                    disabledDate={(current) => current && current < moment(currentDate, FORMATS.DATE)}
                />
            </div>
        </div>
   );
}

TimeInput.prototype = {
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    currentDate: PropTypes.string,
    onStartTimeChange: PropTypes.func,
    onEndTimeChange: PropTypes.func,
    onDateChange: PropTypes.func
}