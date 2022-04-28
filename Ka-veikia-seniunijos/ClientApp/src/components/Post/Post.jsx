import React, {useState} from 'react';
import NavigationList from '../NavigationList/NavigationList';
import './_post-style.scss';
import '../Utils/_base.scss';
import '../Utils/_typography.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Post(props) {
    const [isOptionsOpen, setIsOptionOpen] = useState(false);
    const handleOnPostEdit = () => {

    }

    const handleOnPostDelete = () =>{

    }

    const navigationListContent = [
        {
            text: 'Redaguoti',
            icon: faPen,
            onClick: handleOnPostEdit
        },
        {
            text: 'Ištrinti',
            icon: faTrash,
            onClick: handleOnPostDelete
        }
    ]    

    return (
        <div className='post__container'>
            <div className='post__header'>
                <div className='post__header-owner'>
                    <img src={props.pictureSource} alt={props.eldershipName} className='post__header-picture' />
                    <h3 className='post__header-name'>{props.eldershipName}</h3>
                    <p className='post__header-date'>{props.date}</p>
                </div>

                {props.isAutohor ? 
                    <FontAwesomeIcon 
                        className={`post__header-icon ${isOptionsOpen ? 'post__header-icon--active' : ''}`}
                        icon={faEllipsis}
                        onClick={() => setIsOptionOpen(!isOptionsOpen)} /> : 
                    ''
                }
                
                {isOptionsOpen && <NavigationList content={navigationListContent} side='right'/>}
            </div>

            <div className='post__content'>
                {props.children}
            </div>
        </div>
    );
}   