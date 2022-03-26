import React from 'react';
import Header from './UserHeader/Header';
import { GlobalProvider } from "./Context/HeaderState";

function UserHeader() {
    return (
        <GlobalProvider>
            <Header />
        </GlobalProvider >
    );
}

export default UserHeader;