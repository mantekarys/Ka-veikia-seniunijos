import React from 'react';
import HomeHeader from '../../Header/HomeHeader/HomeHeader';
import HomeContent from './HomeContent';
import Footer from '../../Footer/Footer';
import UserProfile from '../../UserProfile/UserProfile';
import { GlobalProvider } from "./Context/GlobalState";

function Home() {
    {/**  < GlobalProvider >
            <HomeHeader />
            <HomeContent />
            <Footer />
        </GlobalProvider > **/}
    return (
        <UserProfile />
    );
}

export default Home;

