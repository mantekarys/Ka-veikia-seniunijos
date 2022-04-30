import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './Context/GlobalState';
import Button from '../../Button/Button';
import Popup from '../../Popup/Popup';
import MessageForm from '../../MessageForm/MessageForm';
import Post from '../../Post/Post';
import PostSelection from '../../Post/PostSelection/PostSelection';
import PostForm from '../../Post/PostForm/PostForm';
import EventForm from '../../Post/EventForm/EventForm';
import SurveyForm from '../../Post/SurveryForm/SurveyForm';
import eldershipPhoto from '../../../images/Vilnius.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMap, faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import EventPost from '../../Post/EventPost/EventPost';
import './_eldership-style.scss';
import '../../Utils/_base.scss';
import PropTypes from 'prop-types';
export default function EldershipFeedContent() {
    const {
        state,
        toggleMessageForm,
        togglePostSelectionForm,
        toggleNewPostForm,
        toggleNewEventForm,
        toggleNewSurveyForm,
        setUserType,
        resetEditableContent
    } = useContext(GlobalContext);

    const url = new URL(window.location.href);
    const eldershipName = url.searchParams.get("eldership");
    const [posts, setPosts] = useState([]);
    const [isAutohor, setIsAuthor] = useState(false);

    const USER_TYPES = {
        GUEST: 'GUEST',
        RESIDENT: 'RESIDENT',
        ELDERSHIP: 'EDLSERSHIP',
        ELDERSHIPS_ACCOUNT: 'ELDERSHIPS_ACCOUNT'
    }

    const POST_TYPES = {
        POST: 'POST',
        EVENT: 'EVENT'
    }

    useEffect(() => {
        const userType = getUserType();
        setUserType(userType);
    }, []);

    useEffect(() => {
        resetEditableContent();
    }, [])

    useEffect(() => {
        const fetchPosts = async () => {
            const postsData = await axios.get(`https://localhost:44330/api/post/GetDayPosts/${eldershipName}`);
            setPosts(() => [...posts, ...postsData.data]);
        }

        fetchPosts();

        axios.all([axios.get(`https://localhost:44330/api/post/GetDayPosts/${eldershipName}`),
                   axios.get(`https://localhost:44330/api/event/${eldershipName}`)])
             .then(axios.spread((postsResponse, eventsResponse) => {
                setPosts([...postsResponse.data, ...eventsResponse.data]);
             }))
    }, []);

    const getUserType = () => {
        if (sessionStorage['userData']) {
            const session = JSON.parse(sessionStorage['userData']);
            if(session.isEldership) {
                if(session.Name === eldershipName) {
                    setIsAuthor(true);
                    return USER_TYPES.ELDERSHIPS_ACCOUNT;
                }

               return USER_TYPES.ELDERSHIP;
            }
            return  USER_TYPES.RESIDENT;
        }

        return USER_TYPES.GUEST;
    }

    const renderVisibleButton = () => {
        if(state.userType !== USER_TYPES.GUEST) {
            if(state.userType === USER_TYPES.RESIDENT) {
                return (
                    <Button
                        text={<FontAwesomeIcon icon={faEnvelope} />}
                        styling='btn btn--icon'
                        onClick={toggleMessageForm}
                    />
                );
            } else if(state.userType === USER_TYPES.ELDERSHIPS_ACCOUNT) {
                return (
                    <Button
                        text={<FontAwesomeIcon icon={faPen} />}
                        styling='btn btn--icon'
                        onClick={togglePostSelectionForm}
                    />
                );
            }
        }
    }
    
    return (
        <div className='eldership__content'>
            <div className='eldership__photo-container'>
                <img
                    src={eldershipPhoto}
                    alt={'Vilnius'}
                    className='eldership__photo' />
            </div>

            <div className='eldership__header--content'>
                <h1 className='header__primary eldership__header'>{eldershipName}</h1>

                <div className='eldership__header--buttons'>
                    {renderVisibleButton()}
                    <Button
                        text={<FontAwesomeIcon icon={faMap} />}
                        styling='btn btn--icon'
                        onClick={() => window.location.href = 'http://localhost:3000/map?events=true&places=true&free=true'}
                    />
                </div>
            </div>

            {state.isMessageFormOpen &&
                <Popup>
                    <MessageForm onClose={toggleMessageForm}/>
                </Popup>
            }

            {state.isPostSelectionOpen &&
                <Popup>
                    <PostSelection
                        onClose={togglePostSelectionForm}
                        onPostSelect={() => {
                            togglePostSelectionForm();
                            toggleNewPostForm();
                        }}
                        onNewEventSelect={() => {
                            togglePostSelectionForm();
                            toggleNewEventForm();
                        }}
                        onNewSurveySelect={() => {
                            togglePostSelectionForm();
                            toggleNewSurveyForm();
                        }}
                        />
                </Popup>
            }

            {state.isNewPostFromOpen &&
                <Popup>
                    <PostForm
                        onClose={() => {
                            resetEditableContent();
                            toggleNewPostForm();
                        }}
                        onBack={() => {
                            toggleNewPostForm();
                            togglePostSelectionForm();
                        }}
                        postContent={state.editablePost}
                    />
                </Popup>
            }

            {state.isNewEventFormOpen &&
                <Popup>
                    <EventForm
                    onClose={() => {
                        resetEditableContent();
                        toggleNewEventForm();
                    }}
                    onBack={() => {
                        toggleNewEventForm();
                        togglePostSelectionForm();
                    }}
                    eventContent={state.editableEvent}
                    />
                </Popup>
            }

            {state.isNewSurveyFormOpen &&
                <Popup>
                    <SurveyForm 
                        onClose={toggleNewSurveyForm}
                        onBack={() => {
                            toggleNewSurveyForm();
                            togglePostSelectionForm();
                        }}
                        onPost={() => window.location.reload()}
                    />
                </Popup>
            }

            <div className='eldership__feed'>
                {posts.map((post, index) => {
                    return (
                        <Post
                            eldershipName={eldershipName}
                            pictureSource={eldershipPhoto}
                            content={post.text}
                            date={post.PostDate.slice(0, post.PostDate.indexOf('T'))}
                            key={index}
                            isAutohor={isAutohor}
                            id={post.Id}
                            postType={post.hasOwnProperty('Name') ? POST_TYPES.EVENT : POST_TYPES.POST}
                        >
                            {post.hasOwnProperty('Name') ? 
                                <EventPost event={post} /> :
                                <p className='paragraph--post'>{post.Text}</p>
                            }
                        </Post>
                    );
                })}
            </div>
        </div>
    );
}

EldershipFeedContent.prototype = {
    eldershipName: PropTypes.string.isRequired
}