import React from 'react';
import HomeHeader from '../../Header/HomeHeader/HomeHeader';
import { GlobalProvider } from "./Context/GlobalState";

function Home() {

    return (
        <GlobalProvider>
            <HomeHeader />
        </GlobalProvider>
    );
}

export default Home;

