import React from 'react';
import HomeHeader from '../../Header/HomeHeader';
import UserHeader from '../../Header/UserHeader';
import EldershipFeedContent from './EldershipFeedContent';
import Footer from '../../Footer/Footer';
import FeedSidebar from '../../Sidebar/FeedSidebar/FeedSidebar';
import { GlobalProvider } from "./Context/GlobalState";

function Eldership() {
    return (
        <GlobalProvider>
            { sessionStorage['userData'] ? <UserHeader /> : <HomeHeader />}
            <div className='eldership-feed'>
                <FeedSidebar />
               <EldershipFeedContent />
            </div>
            <Footer />
        </GlobalProvider > 
    );
}

export default Eldership;