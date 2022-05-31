import React, { useState, useLayoutEffect } from "react";
import BarIcon from "../../Icons/BarIcon/BarIcon";
import NavigationList from "../../NavigationList/NavigationList";
import Sidebar from "../../Sidebar/Sidebar";
import UserPicture from "../../../images/user-profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faUser,
  faMap,
  faArrowRightFromBracket,
  faEnvelope,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [isNavListVisible, setIsNavListVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { FirstName, LastName, isEldership, Name, Id } = JSON.parse(
    sessionStorage["userData"]
  );

  useLayoutEffect(() => {
    const updateSize = () => {
      window.innerWidth <= 600 ? setIsMobile(true) : setIsMobile(false);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleOnProfileClick = () => {
    window.location.href = isEldership
      ? `http://localhost:3000/eldership?eldership=${Name}`
      : `http://localhost:3000/profile?name=${FirstName}.${LastName}`;
  };

  const handleOnMessageClick = () => {
    window.location.href = isEldership
      ? `http://localhost:3000/mailbox?name=${Name}`
      : `http://localhost:3000/mailbox?name=${FirstName}.${LastName}`;
  };

  const handleOnMapClick = () => {
    window.location.href =
      "http://localhost:3000/map?events=true&places=true&free=true";
  };
  const handleOnEldershipEditClick = () => {
    window.location.href = "http://localhost:3000/admin/eldership";
  };

  const handleOnLogoutClick = () => {
    sessionStorage.removeItem("userData");
    window.location.href = "http://localhost:3000/";
  };

  const getNavigationListContent = () => {
    if (Id === 1) {
      return [
        {
          text: "Profilis",
          icon: faUser,
          onClick: handleOnProfileClick,
        },
        {
          text: "Seniūnijos",
          icon: faWrench,
          onClick: handleOnEldershipEditClick,
        },
        {
          text: "Žinutės",
          icon: faEnvelope,
          onClick: handleOnMessageClick,
        },
        {
          text: "Žemėlapis",
          icon: faMap,
          onClick: handleOnMapClick,
        },
        {
          text: "Atsijungti",
          icon: faArrowRightFromBracket,
          onClick: handleOnLogoutClick,
        },
      ];
    } else {
      return [
        {
          text: "Profilis",
          icon: faUser,
          onClick: handleOnProfileClick,
        },
        {
          text: "Žinutės",
          icon: faEnvelope,
          onClick: handleOnMessageClick,
        },
        {
          text: "Žemėlapis",
          icon: faMap,
          onClick: handleOnMapClick,
        },
        {
          text: "Atsijungti",
          icon: faArrowRightFromBracket,
          onClick: handleOnLogoutClick,
        },
      ];
    }
  };

  return (
    <header className="header__user">
      {isMobile && !isSidebarOpen && (
        <BarIcon
          wrapperStyling="header__icon-wrapper"
          onClick={() => setIsSidebarOpen(true)}
        />
      )}
      {isSidebarOpen && (
        <Sidebar
          onClose={() => setIsSidebarOpen(false)}
          content={getNavigationListContent()}
        />
      )}
      {!isMobile && (
        <div className="header__user-info">
          <div className="header__user-info-wrapper">
            <FontAwesomeIcon
              className="header__user-icon"
              icon={faCaretDown}
              onClick={() => setIsNavListVisible(!isNavListVisible)}
            />
            <h4 className="header__user-name">
              {isEldership ? Name : FirstName}
            </h4>

            {isNavListVisible && (
              <NavigationList
                content={getNavigationListContent()}
                side="left"
              />
            )}
          </div>

          <img
            src={
              isEldership ? require(`../../../images/${Name}.png`) : UserPicture
            }
            alt="Vartotojo nuotrauka"
            className="header__user-picture"
          />
        </div>
      )}
    </header>
  );
}
