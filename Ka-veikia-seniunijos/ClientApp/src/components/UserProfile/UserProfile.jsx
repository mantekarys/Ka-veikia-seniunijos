import React, { useState, useEffect } from "react";
import Input from "../Form/Input";
import Dropdown from "../Form/Dropdown";
import Button from "../Button/Button";
import "./_user-profile-styling.scss";
import "../Utils/_utilities.scss";
import "../Utils/_typography.scss";
import userProfile from "../../images/user-profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import axios from "axios";
import Error from "../Error/Error";

// Add change photo funcionality
// Add error message

export default function UserProfile({ onUpdate }) {
  const sessionData = JSON.parse(sessionStorage["userData"]);
  // const [id,setId] = useState(sessionData.Id);
  const id = sessionData.Id;
  const [name, setName] = useState(sessionData.FirstName);
  const [surname, setSurname] = useState(sessionData.LastName);
  const [email, setEmail] = useState(sessionData.Email);
  const [eldership, setEldership] = useState(sessionData.Municipality);
  const [elderships, setElderships] = useState([]);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("https://localhost:44330/api/eldership");
        const elderships = result.data.map((eldership) => eldership.Name);
        console.log(result);
        setElderships(elderships);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const hadleIconClick = (e) => {
    e.target.classList.add("user-profile__icon--black");
    e.target
      .closest(".user-profile__input-container")
      .childNodes[0].classList.add("user-profile__input--edit");

    setIsEditEnabled(true);
  };

  const handleOnDropdownChange = (e) => {
    setEldership(e.target.value);
    e.target.classList.add("user-profile__input--edit");
    setIsEditEnabled(true);
  };

  const inputsAreValid = () => {
    if (!name || !surname || !email || !eldership) {
      setErrorMessage("Visi laukai yra būtini");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleOnSubmit = () => {
    if (!inputsAreValid()) return;
    axios
      .put("https://localhost:44330/api/user", {
        Id: id,
        FirstName: name,
        LastName: surname,
        Email: email,
        Municipality: eldership,
      })
      .then((res) => {
        if (res.status === 200) {
          updateSession();
          if (onUpdate) onUpdate();
        }
      })
      .catch((_) => {
        // TODO: implement error msg
      });
  };

  const updateSession = () => {
    sessionStorage["userData"] = JSON.stringify({
      ...sessionData,
      FirstName: name,
      LastName: surname,
      Email: email,
      Municipality: eldership,
      Id: id,
    });
  };

  return (
    <div className="user-profile__container">
      <div className="user-profile__header">
        <h2 className="header__secondary u-text-center u-padding-medium">
          Profilis
        </h2>
      </div>
      <div className="user-profile__card">
        <div className="user-profile__card--left">
          <div className="user-profile__picture-container">
            <img
              src={userProfile}
              alt="user profile picture"
              className="image"
            />
          </div>
        </div>

        <div className="user-profile__card--right">
          <div className="user-profile__info-container">
            <div className="user-profile__input-container">
              <Input
                styling="form__input user-profile__input"
                type="text"
                placeholder={name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={true}
              />
              <span>
                <FontAwesomeIcon
                  icon={faPen}
                  className="user-profile__icon"
                  onClick={hadleIconClick}
                />
              </span>
            </div>

            <div className="user-profile__input-container">
              <Input
                styling="form__input user-profile__input"
                type="text"
                placeholder={surname}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                disabled={true}
              />
              <span>
                <FontAwesomeIcon
                  icon={faPen}
                  className="user-profile__icon"
                  onClick={hadleIconClick}
                />
              </span>
            </div>

            <div className="user-profile__input-container">
              <Input
                styling="form__input user-profile__input"
                type="text"
                placeholder={email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={true}
              />
              <span>
                <FontAwesomeIcon
                  icon={faPen}
                  className="user-profile__icon"
                  onClick={hadleIconClick}
                />
              </span>
            </div>

            <div className="user-profile__input-container">
              <Dropdown
                styling="form__dropdown user-profile__dropdown"
                placeholder={eldership}
                values={elderships}
                onChange={handleOnDropdownChange}
              />
            </div>
          </div>
          {errorMessage && <Error text={errorMessage} />}

          {isEditEnabled && (
            <div className="user-profile__button-wrapper">
              <Button
                text="Išsaugoti"
                styling="btn btn--user-profile"
                type="submit"
                onClick={handleOnSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

UserProfile.prototype = {
  onUpdate: PropTypes.func,
};
