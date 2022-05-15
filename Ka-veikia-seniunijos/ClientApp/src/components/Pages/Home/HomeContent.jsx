import axios from 'axios';
import React, {useState, useEffect, useRef, useContext} from 'react';
import Grid from '../../Grid/Grid';
import useOnScreen from '../../Hooks/useOnScreen';
import Login from '../../Login/Login';
import Signup from '../../Signup/Signup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function HomeContent() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [elderships, setElderships] = useState([]);
    const firstSlideRef = useRef();
    const secondSlideRef = useRef();
    const thirdSlideRef = useRef();

    const isFirstVisible = useOnScreen(firstSlideRef);
    const isSecondVisible = useOnScreen(secondSlideRef);
    const isThirdVisible = useOnScreen(thirdSlideRef);


    useEffect(() => {
        const fetchElderships = async () => {
            const eldershipData = await axios.get('https://localhost:44330/api/eldership/');
            setElderships(eldershipData.data);
        }

        fetchElderships();
    }, []);
    
    return (
        <div className='home__content'>
            {isLoginOpen &&
                <Login
                    onClose={() => setIsLoginOpen(false)}
                    onLoginRedirect={() => {
                        setIsLoginOpen(false);
                        setIsSignupOpen(true);
                    }}
                />
            }
            {isSignupOpen &&
                <Signup
                    onClose={() => setIsSignupOpen(false)}
                    onSignupRedirect={() => {
                        setIsLoginOpen(true);
                        setIsSignupOpen(false);
                    }}
                />
            }
            <div className={`cover-container cover-container--1 ${!isFirstVisible && 'cover-container--hidden'}`} ref={firstSlideRef}>
                <div className='highlighted highlighted--left'>
                    <h1 className='highlighted__text'>Susipažink su <br />Lietuvos seniūnijomis</h1>
                </div>
                <div className='cover-buttons cover-buttons--left'>
                    <a className='cover-buttons__link' href='#elderships'>
                        Seniūnijos
                        <FontAwesomeIcon icon={faChevronDown} />
                    </a>
                    <a className='cover-buttons__link' onClick={() => setIsLoginOpen(true)}>
                        Prisijunk
                        <FontAwesomeIcon icon={faChevronRight} />
                    </a>
                </div>
            </div>

            <div className={`cover-container cover-container--2 ${!isSecondVisible && 'cover-container--hidden'}`} ref={secondSlideRef}>
                <div className='highlighted highlighted--right'>
                    <h1 className='highlighted__text'>Sužinok apie <br />renginius seniūnijose</h1>
                </div>
                <div className='cover-buttons cover-buttons--right'>
                    <a className='cover-buttons__link' href='/map?events=true&places=true&free=true'>
                        Renginiai
                        <FontAwesomeIcon icon={faChevronRight} />
                    </a>
                </div>
            </div>

            <div className={`cover-container cover-container--3 ${!isThirdVisible && 'cover-container--hidden'}`} ref={thirdSlideRef}>
                <div className='highlighted highlighted--left'>
                    <h1 className='highlighted__text'>Aplankyk <br />lankytinas vietas</h1>
                </div>
                <div className='cover-buttons cover-buttons--left'>
                    <a className='cover-buttons__link' href='/map?events=true&places=true&free=true'>
                        Lankytinos vietos
                        <FontAwesomeIcon icon={faChevronRight} />
                    </a>
                </div>
            </div>

            <div className='elderships' id='elderships'>
                <h1 className='header__secondary u-text-center'>Pasirinkite seniūniją</h1>
                <hr className='hr' />

                <Grid elderships={elderships}/>
            </div>
        </div>
    );
}