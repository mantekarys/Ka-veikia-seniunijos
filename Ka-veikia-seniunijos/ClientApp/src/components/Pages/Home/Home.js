import React from 'react';
import HomeHeader from '../../Header/HomeHeader';
import UserHeader from '../../Header/UserHeader';
import HomeContent from './HomeContent';
import Footer from '../../Footer/Footer';
import { GlobalProvider } from "../../Header/Context/HeaderState";

function Home() {

    return (
        <GlobalProvider>
            { sessionStorage['userData'] ? <UserHeader /> : <HomeHeader /> }
            <HomeContent />
            <Footer />
        </GlobalProvider>
    );
}

export default Home;

