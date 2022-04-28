import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Grid from '../../Grid/Grid';
import Slider from '../../Slider/Slider';

export default function HomeContent() {
    const [elderships, setElderships] = useState([]);

    useEffect(() => {
        const fetchElderships = async () => {
            const eldershipData = await axios.get('https://localhost:44330/api/eldership/');
            console.log(eldershipData)
            setElderships(eldershipData.data);
        }

        fetchElderships();
    }, []);
    
    return (
        <div className='home__content'>

            <Slider styling = 'home__slider-section'/>

            <h1 className='header__secondary u-text-center'>Pasirinkite seniūniją</h1>
            <hr className='hr' />

            <Grid elderships={elderships}/>
        </div>
    );
}