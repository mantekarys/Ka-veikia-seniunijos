import React, { useState } from 'react';
import UserHeader from '../../Header/UserHeader/Header';
import UserProfile from '../../UserProfile/UserProfile';
import LoadingSpinner from '../../LoadingSpiner/LoadingSpinner';

function Profile() {
    const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);

    const handleOnUpdate = () => {
        setIsSpinnerVisible(true);
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }

    return (
        <>
            <UserHeader />
            <UserProfile onUpdate={handleOnUpdate} />
            {isSpinnerVisible && <LoadingSpinner />}
        </>
    );
}

export default Profile;