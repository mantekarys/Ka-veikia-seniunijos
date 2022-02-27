import React from 'react';
import HomeHeader from '../../Header/HomeHeader/HomeHeader';
import HomeContent from './HomeContent';
import { GlobalProvider } from "./Context/GlobalState";

function Home() {

    return (
        <GlobalProvider>
            <HomeHeader />
            <HomeContent />
        </GlobalProvider>
    );
}

export default Home;

