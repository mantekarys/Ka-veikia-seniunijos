import React, {useContext, useState, useEffect} from 'react';
import NavigationList from '../NavigationList/NavigationList';
import { GlobalContext } from '../Pages/Eldership-feed/Context/GlobalState';
import './_post-style.scss';
import '../Utils/_base.scss';
import '../Utils/_typography.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

export default function Post(props) {
    const { state, toggleNewPostForm, setEditablePostText } = useContext(GlobalContext);
    const [isOptionsOpen, setIsOptionOpen] = useState(false);

    const handleOnPostEdit = () => {
        axios.get(`https://localhost:44330/api/post/${props.id}`)
        .then(res => {
            setEditablePostText({
                text: res.data.Text,
                id: res.data.Id
            });
            toggleNewPostForm();
        });
    }

    const handleOnPostDelete = () =>{

    }

    useEffect(() => {
        if(state.isNewPostFromOpen) setIsOptionOpen(false)
    }, [state.isNewPostFromOpen])

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