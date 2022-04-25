import React from 'react';
import GridElement from './GridElement';
import PropTypes from 'prop-types';

export default function Grid({ elderships }) {
    return (
        <div className='grid u-margin-top-medium' id='grid'>
            {elderships.map((eldership, key) => {
                return <GridElement text={eldership.name} key={key} />
            })}
        </div>
    );
}

Grid.prototype = {
    elderships: PropTypes.array
}