import React, { useState } from 'react';
import Button from '../../Button/Button';
import LoadingSpiner from '../../LoadingSpiner/LoadingSpinner';
import '../../style.css';

export default function UserHeader() {
    const [isLoaderVisible, setIsLoaderVisible] = useState(false);
    const handleLogOut = () => {
        setIsLoaderVisible(true);

        const timer = setTimeout(() => {
            setIsLoaderVisible(false);
        }, 1500);
    }

    return (
        <header className='header'>
            {isLoaderVisible && <LoadingSpiner />}

            <div className='header__button-wrapper'>
                <Button
                    text='Žempėlapis'
                    styling='btn btn--header'
                />

                <Button
                    text='Profilis'
                    styling='btn btn--header'
                />

                <Button
                    text='Atsijungti'
                    styling='btn btn--header'
                    onClick={handleLogOut}
                />
            </div>
        </header>
    );
}

