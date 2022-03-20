import React from 'react';
import HomeHeader from '../../Header/HomeHeader/HomeHeader';
import HomeContent from './HomeContent';
import Footer from '../../Footer/Footer';

import { GlobalProvider } from "./Context/GlobalState";

function Home() {

    return (
        < GlobalProvider >
            <HomeHeader />
            <HomeContent />
            <Footer />
        </GlobalProvider > 
    );
}

export default Home;

