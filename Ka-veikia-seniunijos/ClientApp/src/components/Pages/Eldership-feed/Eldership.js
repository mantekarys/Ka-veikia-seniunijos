import React from 'react';
import UserHeader from '../../Header/UserHeader/UserHeader';
import EldershipFeedContent from './EldershipFeedContent';
import { GlobalProvider } from "./Context/GlobalState";

function Eldership() {
    return (
        <GlobalProvider>
            <UserHeader />
            <EldershipFeedContent />
        </GlobalProvider > 
    );
}

export default Eldership;