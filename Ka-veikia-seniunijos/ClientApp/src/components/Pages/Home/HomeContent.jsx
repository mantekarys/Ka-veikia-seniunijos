import React, { useContext } from 'react';
import Grid from '../../Grid/Grid';
import Sidebar from '../../Sidebar/Sidebar'
import Slider from '../../Slider/Slider';
import { GlobalContext } from '../../Pages/Home/Context/GlobalState';

export default function HomeContent() {
    const { state, toggleSidebar } = useContext(GlobalContext);
    const areas = ['Vilnius', 'Kaunas', 'Klaipėda'];
    
    return (
        <div className='home__content'>
            {state.isSidebarOpen && <Sidebar onClose={toggleSidebar} />}

            <Slider styling = 'home__slider-section'/>

            <h1 className='header__secondary u-text-center'>Pasirinkite seniūniją</h1>
            <hr className='hr' />

            <Grid areas={areas}/>
        </div>
    );
}