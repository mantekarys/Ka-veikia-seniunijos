import React from 'react';
import GridElement from './GridElement';
import PropTypes from 'prop-types';

export default function Grid({ areas }) {
    return (
        <div className='grid u-margin-top-medium'>
            {areas.map((text, key) => {
                return <GridElement text={text} key={key} />
            })}
        </div>
    );
}

Grid.prototype = {
    areas: PropTypes.array
}