import React from 'react';
import UserHeader from '../../Header/UserHeader/UserHeader';
import EldershipFeedContent from './EldershipFeedContent';
import Footer from '../../Footer/Footer';
import { GlobalProvider } from "./Context/GlobalState";

function Eldership() {
    return (
        <GlobalProvider>
            <UserHeader />
            <EldershipFeedContent />
            <Footer />
        </GlobalProvider > 
    );
}

export default Eldership;