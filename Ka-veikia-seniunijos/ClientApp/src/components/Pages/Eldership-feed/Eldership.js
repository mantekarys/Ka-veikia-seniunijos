import React from 'react';
import HomeHeader from '../../Header/HomeHeader';
import UserHeader from '../../Header/UserHeader';
import EldershipFeedContent from './EldershipFeedContent';
import Footer from '../../Footer/Footer';
import { GlobalProvider } from "./Context/GlobalState";



function Eldership() {
    return (
        <GlobalProvider>
            { sessionStorage['userData'] ? <UserHeader /> : <HomeHeader />}
            <EldershipFeedContent />
            <Footer />
        </GlobalProvider > 
    );
}

export default Eldership;