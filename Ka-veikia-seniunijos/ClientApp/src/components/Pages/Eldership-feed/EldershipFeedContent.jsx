import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./Context/GlobalState";
import Button from "../../Button/Button";
import Popup from "../../Popup/Popup";
import MessageForm from "../../MessageForm/MessageForm";
import Post from "../../Post/Post";
import PostSelection from "../../Post/PostSelection/PostSelection";
import PostForm from "../../Post/PostForm/PostForm";
import EventForm from "../../Post/EventForm/EventForm";
import SurveyForm from "../../Post/SurveryForm/SurveyForm";
import eldershipPhoto from "../../../images/Vilnius.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMap, faPen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import EventPost from "../../Post/EventPost/EventPost";
import "./_eldership-style.scss";
import "../../Utils/_base.scss";
import PropTypes from "prop-types";
import LoadingSpinner from "../../LoadingSpiner/LoadingSpinner";
import DeleteModal from "../../Modals/Delete/DeleteModal";
import SurveyPost from "../../Post/SurveyPost/SurveyPost";
import { DatePicker } from "antd";
import { Switch } from "pretty-checkbox-react";
import Error from "../../Error/Error";

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
    deletePost,
  } = useContext(GlobalContext);

  const url = new URL(window.location.href);
  const eldershipName = url.searchParams.get("eldership");
  const [posts, setPosts] = useState([]);
  const [isAutohor, setIsAuthor] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState(null);
  const [postToggle, setPostToggle] = useState(true);
  const [eventToggle, setEventToggle] = useState(true);
  const [surveyToggle, setSurveyToggle] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const USER_TYPES = {
    GUEST: "GUEST",
    RESIDENT: "RESIDENT",
    ELDERSHIP: "ELDERSHIP",
    ELDERSHIPS_ACCOUNT: "ELDERSHIPS_ACCOUNT",
  };

  const POST_TYPES = {
    POST: "POST",
    EVENT: "EVENT",
  };

  const getDefaultDateFilter = () => {
    const date = new Date();
    const currYear = date.toISOString().split("T")[0];
    const minusYear = new Date();
    minusYear.setFullYear(minusYear.getFullYear() - 1);
    const minusYearISO = minusYear.toISOString().split("T")[0];
    setDateFilter({
      dateFrom: minusYearISO,
      dateTo: currYear,
    });
  };

  useEffect(() => {
    const userType = getUserType();
    setUserType(userType);
    getDefaultDateFilter();
  }, []);

  useEffect(() => {
    if (dateFilter === null) {
      return;
    }
    setIsContentLoading(true);
    axios
      .all([
        axios.get(
          `https://localhost:44330/api/post/GetDayPosts/${eldershipName}`,
          {
            params: {
              dateFrom: dateFilter.dateFrom,
              dateTo: dateFilter.dateTo,
            },
          }
        ),
        axios.get(`https://localhost:44330/api/event/${eldershipName}`, {
          params: {
            dateFrom: dateFilter.dateFrom,
            dateTo: dateFilter.dateTo,
          },
        }),
        axios.get(`https://localhost:44330/api/survey/${eldershipName}`, {
          params: {
            dateFrom: dateFilter.dateFrom,
            dateTo: dateFilter.dateTo,
          },
        }),
      ])
      .then(
        axios.spread((postsResponse, eventsResponse, surveyResponse) => {
          setIsContentLoading(false);
          if (
            typeof surveyResponse.data !== "string" &&
            typeof postsResponse.data !== "string" &&
            typeof eventsResponse.data !== "string" &&
            surveyToggle &&
            postToggle &&
            eventToggle
          ) {
            setPosts(
              [
                ...postsResponse.data,
                ...eventsResponse.data,
                ...surveyResponse.data,
              ].sort((a, b) => new Date(b.PostDate) - new Date(a.PostDate))
            );
          } else if (
            typeof postsResponse.data !== "string" &&
            typeof eventsResponse.data !== "string" &&
            postToggle &&
            eventToggle
          ) {
            setPosts(
              [...postsResponse.data, ...eventsResponse.data].sort(
                (a, b) => new Date(b.PostDate) - new Date(a.PostDate)
              )
            );
          } else if (
            typeof surveyResponse.data !== "string" &&
            typeof eventsResponse.data !== "string" &&
            surveyToggle &&
            eventToggle
          ) {
            setPosts(
              [...surveyResponse.data, ...eventsResponse.data].sort(
                (a, b) => new Date(b.PostDate) - new Date(a.PostDate)
              )
            );
          } else if (
            typeof surveyResponse.data !== "string" &&
            typeof postsResponse.data !== "string" &&
            surveyToggle &&
            postToggle
          ) {
            setPosts(
              [...surveyResponse.data, ...postsResponse.data].sort(
                (a, b) => new Date(b.PostDate) - new Date(a.PostDate)
              )
            );
          } else if (typeof surveyResponse.data !== "string" && surveyToggle) {
            setPosts(
              surveyResponse.data.sort(
                (a, b) => new Date(b.PostDate) - new Date(a.PostDate)
              )
            );
          } else if (typeof postsResponse.data !== "string" && postToggle) {
            setPosts(
              postsResponse.data.sort(
                (a, b) => new Date(b.PostDate) - new Date(a.PostDate)
              )
            );
          } else if (typeof eventsResponse.data !== "string" && eventToggle) {
            setPosts(
              eventsResponse.data.sort(
                (a, b) => new Date(b.PostDate) - new Date(a.PostDate)
              )
            );
          }
          // To do what if everything is empty
        })
      );
  }, [dateFilter, eventToggle, surveyToggle, postToggle]);

  useEffect(() => {
    if (state.isLoadingSpinnerVisible) {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }, [state.isLoadingSpinnerVisible]);

  const getUserType = () => {
    if (sessionStorage["userData"]) {
      const session = JSON.parse(sessionStorage["userData"]);
      if (session.isEldership) {
        if (session.Name === eldershipName) {
          setIsAuthor(true);
          return USER_TYPES.ELDERSHIPS_ACCOUNT;
        }

        return USER_TYPES.ELDERSHIP;
      }
      return USER_TYPES.RESIDENT;
    }

    return USER_TYPES.GUEST;
  };

  const renderVisibleButton = () => {
    if (state.userType !== USER_TYPES.GUEST) {
      if (state.userType === USER_TYPES.RESIDENT) {
        return (
          <Button
            text={<FontAwesomeIcon icon={faEnvelope} />}
            styling="btn btn--icon"
            onClick={toggleMessageForm}
          />
        );
      } else if (state.userType === USER_TYPES.ELDERSHIPS_ACCOUNT) {
        return (
          <Button
            text={<FontAwesomeIcon icon={faPen} />}
            styling="btn btn--icon"
            onClick={togglePostSelectionForm}
          />
        );
      }
    }
  };

  const renderCurrentPost = (post) => {
    if (post?.Question) {
      return <SurveyPost survey={post} />;
    } else if (post?.Name) {
      return <EventPost event={post} />;
    }

    return <p className="paragraph--post">{post.Text}</p>;
  };

  // setPosts([])
  return (
    <div className="eldership__content">
      {state.isLoadingSpinnerVisible && <LoadingSpinner />}
      <div className="cover-wrapper">
        <img src={require(`../../../images/Vilnius-cover.png`)} alt="cover" />
      </div>

      <div className="header-container">
        <h1 className="header__primary">{eldershipName}</h1>
        <p>
          Data nuo{" "}
          <DatePicker
            format={"YYYY-MM-DD"}
            onChange={(event) => {
              var selectedDate = new Date();
                if(event != null){
                  selectedDate=event._d;
                  setDateFilter((prev) => ({
                    ...prev,
                    dateFrom: event._d.toISOString().split("T")[0],
                  }))
                }
                else{
                  const minusYear = new Date();
                  minusYear.setFullYear(minusYear.getFullYear() - 1);
                  const minusYearISO = minusYear.toISOString().split("T")[0];
                  selectedDate = minusYear;
                  setDateFilter((prev) => ({
                    ...prev,
                    dateFrom: minusYearISO,
                  }))
                }
                if(selectedDate > new Date(dateFilter.dateTo)){
                  setErrorMessage("Nuo data tūrėtų būti mažesnė nei iki data")
                }
                else{
                  setErrorMessage("")
                }

                }
            }
          />
        </p>

        <p>
          Data iki{" "}
          <DatePicker
            ormat={"YYYY-MM-DD"}
            onChange={(event) => {
              var selectedDate = new Date();
              if(event != null){
                selectedDate=event._d;
                setDateFilter((prev) => ({
                  ...prev,
                  dateTo: event._d.toISOString().split("T")[0],
                }))
              }
              else{
                const date = new Date();
                const currYear = date.toISOString().split("T")[0];
                setDateFilter((prev) => ({
                  ...prev,
                  dateTo: currYear,
                }))
              }
              if(selectedDate < new Date(dateFilter.dateFrom)){
                setErrorMessage("Nuo data tūrėtų būti mažesnė nei iki data")
              }
              else{
                setErrorMessage("")
              }
              }
          }
          />
        </p>
        {errorMessage && <Error text={errorMessage} />}
        <div className="map__select">
          <Switch
            color="primary"
            shape="fill"
            style={{ fontSize: "15px" }}
            onChange={(e) => setEventToggle((prev) => !prev)}
            checked={eventToggle}
          >
            <b>Renginiai</b>
          </Switch>
          <Switch
            color="primary"
            shape="fill"
            style={{ fontSize: "15px" }}
            onChange={(e) => setPostToggle((prev) => !prev)}
            checked={postToggle}
          >
            <b>Įrašai</b>
          </Switch>
          <Switch
            color="primary"
            shape="fill"
            style={{ fontSize: "15px" }}
            onChange={(e) => setSurveyToggle((prev) => !prev)}
            checked={surveyToggle}
          >
            <b>Apklausos</b>
          </Switch>
        </div>
        <div className="buttons-wrapper">
          {renderVisibleButton()}
          <Button
            text={<FontAwesomeIcon icon={faMap} />}
            styling="btn btn--icon"
            onClick={() =>
              (window.location.href =
                "http://localhost:3000/map?events=true&places=true&free=true")
            }
          />
        </div>
      </div>

      {state.isMessageFormOpen && (
        <Popup>
          <MessageForm
            onClose={toggleMessageForm}
            eldershipName={eldershipName}
          />
        </Popup>
      )}

      {state.isPostSelectionOpen && (
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
      )}

      {state.isNewPostFromOpen && (
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
      )}

      {state.isNewEventFormOpen && (
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
      )}

      {state.isNewSurveyFormOpen && (
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
      )}

      {state.isDeleteModalOpen && (
        <Popup>
          <DeleteModal
            onClose={toggleDeleteModal}
            onDelete={state.editableEvent ? deleteEvent : deletePost}
          />
        </Popup>
      )}

      <div className="eldership__feed">
        {isContentLoading && <div className="loading-spinner" />}
        {(eventToggle || surveyToggle || postToggle) ? (posts
          .map((post, index) => {
            return (
              <Post
                eldershipName={eldershipName}
                pictureSource={eldershipPhoto}
                content={post.text}
                date={post.PostDate.slice(0, 10)}
                key={index}
                isAutohor={isAutohor}
                id={post.Id}
                postType={
                  post.hasOwnProperty("Name")
                    ? POST_TYPES.EVENT
                    : POST_TYPES.POST
                }
              >
                {renderCurrentPost(post)}
              </Post>
            );
          })):
          <div className='inbox__content-no-results' style={{ paddingTop: "150px", color:"red"}}>
            <span className='inbox-error-message' style={{color:"red"}}>
              Nėra seniūnijos įrašų
            </span>
          </div>
          
        }
      </div>
    </div>
  );
}

EldershipFeedContent.prototype = {
  eldershipName: PropTypes.string.isRequired,
};
