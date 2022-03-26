import React from 'react';
import Header from './HomeHeader/Header';
import { GlobalProvider } from "./Context/HeaderState";

function HomeHeader() {
    return (
        <GlobalProvider>
            <Header />
        </GlobalProvider > 
    );
}

export default HomeHeader;