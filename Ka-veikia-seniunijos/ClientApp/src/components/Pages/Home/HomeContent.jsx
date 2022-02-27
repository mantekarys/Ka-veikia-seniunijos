import React from 'react';
import Grid from '../../Grid/Grid';

export default function HomeContent() {
    const areas = ['Vilnius', 'Kaunas', 'Klaipėda'];

    return (
        <div className='home__content'>
            <h1 className='header__secondary u-text-center'>Pasirinkite seniūniją</h1>
            <hr className='hr' />

            <Grid areas={areas }/>
        </div>
    );
}