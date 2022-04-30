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
    const {
        state, 
        toggleNewPostForm,
        setEditablePostText,
        toggleNewEventForm,
        setEditableEventContent,
        toggleDeleteModal
     } = useContext(GlobalContext);
    const [isOptionsOpen, setIsOptionOpen] = useState(false);

    const handleOnPostEdit = () => {
        props.postType === 'EVENT' ? getEventData() : getPostData();
    }

    const handleOnPostDelete = () => {
        props.postType === 'EVENT' ? setEditableEventContent({id: props.id}) : setEditablePostText({id: props.id});
        toggleDeleteModal();
    }

    const getPostData = async () => {
        try {
            const postData = await axios.get(`https://localhost:44330/api/post/${props.id}`);
            setEditablePostText({
                text: postData.data.Text,
                id: postData.data.Id,
                postDate: postData.data.PostDate
            });
            toggleNewPostForm();
        } catch (error) {
            console.error(error);
        }
    }

    const getEventData = async () => {
        try {
            const eventData = await axios.get(`https://localhost:44330/api/event/getEvent/${props.id}`);
            setEditableEventContent({
                id: eventData.data.Id,
                name: eventData.data.Name,
                description: eventData.data.Description,
                price: eventData.data.Price,
                date: eventData.data.Date,
                startTime: eventData.data.StartTime,
                endTime: eventData.data.EndTime,
                eldershipId: eventData.data.EldershipFk,
                address: eventData.data.Address,
                lat: eventData.data.Latitude,
                lng: eventData.data.Longtitude,
                postDate: eventData.data.PostDate
            });
            toggleNewEventForm();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if(state.isNewPostFromOpen || state.isNewEventFormOpen || state.isDeleteModalOpen) setIsOptionOpen(false)
    }, [state.isNewPostFromOpen, state.isNewEventFormOpen, state.isDeleteModalOpen])

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