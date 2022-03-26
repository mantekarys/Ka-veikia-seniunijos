import React from 'react';
import HomeHeader from '../../Header/HomeHeader';
import UserHeader from '../../Header/UserHeader';
import HomeContent from './HomeContent';
import Footer from '../../Footer/Footer';

function Home() {

    return (
        <>
            { sessionStorage['userData'] ? <UserHeader /> : <HomeHeader /> }
            <HomeContent />
            <Footer />
        </> 
    );
}

export default Home;

