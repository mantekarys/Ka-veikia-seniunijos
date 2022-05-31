import AdministrativeE from './AdministrativeElder'
import React from 'react';
import UserHeader from '../../Header/UserHeader';
import HomeHeader from '../../Header/HomeHeader';
function Administrative() {
    return (
        <>
            { sessionStorage['userData'] ? <UserHeader /> : <HomeHeader />}
            <AdministrativeE />
        </>
    );
}

export default Administrative;