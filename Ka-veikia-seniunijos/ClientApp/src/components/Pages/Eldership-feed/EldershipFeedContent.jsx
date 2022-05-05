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
import LoadingSpinner from '../../LoadingSpiner/LoadingSpinner';
import DeleteModal from '../../Modals/Delete/DeleteModal';
import SurveyPost from '../../Post/SurveyPost/SurveyPost';
export default function EldershipFeedContent() {
    const {
        state,
        toggleMessageForm,
        togglePostSelectionForm,
        toggleNewPostForm,
        toggleNewEventForm,
        toggleNewSurveyForm,
        setUserType,
        resetEditableContent,
        toggleLoadingSpinner,
        toggleDeleteModal,
        deleteEvent,
        deletePost
    } = useContext(GlobalContext);

    const url = new URL(window.location.href);
    const eldershipName = url.searchParams.get("eldership");
    const [posts, setPosts] = useState([]);
    const [isAutohor, setIsAuthor] = useState(false);
    const [isContentLoading, setIsContentLoading] = useState(false);

    const USER_TYPES = {
        GUEST: 'GUEST',
        RESIDENT: 'RESIDENT',
        ELDERSHIP: 'ELDERSHIP',
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
        setIsContentLoading(true);
        axios.all([axios.get(`https://localhost:44330/api/post/GetDayPosts/${eldershipName}`),
                   axios.get(`https://localhost:44330/api/event/${eldershipName}`),
                    axios.get(`https://localhost:44330/api/survey/${eldershipName}`)])
             .then(axios.spread((postsResponse, eventsResponse, surveyResponse) => {
                 setIsContentLoading(false);
                setPosts([...postsResponse.data, ...eventsResponse.data, ...surveyResponse.data].sort((a, b) => new Date(b.PostDate) - new Date(a.PostDate)));
             }))
    }, []);

    useEffect(() => {
        if(state.isLoadingSpinnerVisible) {
            setTimeout(() => {
                window.location.reload();
            }, 1500)
        }
    }, [state.isLoadingSpinnerVisible])

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

    const renderCurrentPost = (post) => {
        if(post?.Question) {
            return (
                <SurveyPost survey={post}/>
            );
        } else if (post?.Name) {
            return (
                <EventPost event={post} />
            );
        }

        return (
            <p className='paragraph--post'>{post.Text}</p>
        );
    }
    
    return (
        <div className='eldership__content'>
            {isContentLoading && <div className='loading-spinner' /> }
            {state.isLoadingSpinnerVisible && <LoadingSpinner />}
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
                    <MessageForm onClose={toggleMessageForm} eldershipName={eldershipName}/>
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
                        toggleSpinner={() => {
                            toggleNewPostForm();
                            toggleLoadingSpinner();
                        }}
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
                        toggleSpinner={() => {
                            toggleNewEventForm();
                            toggleLoadingSpinner();
                        }}
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
                        toggleSpinner={() => {
                            toggleNewSurveyForm();
                            toggleLoadingSpinner();
                        }}
                    />
                </Popup>
            }

            {state.isDeleteModalOpen && 
                <Popup>
                    <DeleteModal 
                        onClose={toggleDeleteModal}
                        onDelete={state.editableEvent ? deleteEvent : deletePost}
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
                            {renderCurrentPost(post)}
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