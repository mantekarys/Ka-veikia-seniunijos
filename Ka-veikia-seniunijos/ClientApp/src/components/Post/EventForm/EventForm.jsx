import React, { useState } from "react";
import NewPostHeader from "../NewPostHeader";
import NewPostButtons from "../NewPostButtons";
import TimeInput from "../../Form/TimeInput/TimeInput";
import { Switch } from "pretty-checkbox-react";
import Error from "../../Error/Error";
import TextArea from "../../Form/TextArea";
import Input from "../../Form/Input";
import axios from "axios";
import "./_event-form-style.scss";
import "../../Utils/_base.scss";
import "../../Button/_button.scss";
import PropTypes from "prop-types";

export default function EventForm({
  onClose,
  onBack,
  eventContent,
  toggleSpinner,
}) {
  const [name, setName] = useState(eventContent?.name ? eventContent.name : "");
  const [place, setPlace] = useState(
    eventContent?.address ? eventContent.address : ""
  );
  const [description, setDescription] = useState(
    eventContent?.description ? eventContent.description : ""
  );
  const [date, setDate] = useState(() => {
    const today = new Date();
    return eventContent?.date
      ? eventContent.date
      : today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
  });
  const [startTime, setStartTime] = useState(
    eventContent?.startTime ? eventContent.startTime : "19:00"
  );
  const [endTime, setEndTime] = useState(
    eventContent?.endTime ? eventContent.endTime : "19:30"
  );
  const [isFree, setIsFree] = useState(
    !eventContent?.price || eventContent?.price === 0 ? true : false
  );
  const [price, setPrice] = useState(
    !eventContent?.price || eventContent?.price === 0 ? "" : eventContent.price
  );
  const coords = {
    lat: eventContent?.lat ? eventContent.lat : null,
    lng: eventContent?.lng ? eventContent.lng : null,
  };
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnSubmit = async () => {
    if (!name || !place) {
      setErrorMessage("Renginio pavadinimas ir vieta yra privalomi!");
      return;
    }

    await fetchCoords();
    eventContent ? updateEvent() : postEvent();
  };

  const fetchCoords = async () => {
    try {
      // const position = await axios.get(`http://api.positionstack.com/v1/forward?access_key=${REACT_APP_POSITION_STACK_API_KEY}&query=${place}`);
      //Temporary fix
      const position = await axios.get(
        `http://api.positionstack.com/v1/forward?access_key=8a2d55dfcb204056ffd8c2706ee83b8f&query=${place}`
      );
      if (!position.data.data.length) {
        setErrorMessage("Netinkama renginio vieta");
        return;
      }
      coords.lat = position.data.data[0].latitude;
      coords.lng = position.data.data[0].longitude;
    } catch (error) {
      console.log(error);
    }
  };

  const updateEvent = () => {
    axios
      .put("https://localhost:44330/api/event", {
        id: eventContent.id,
        Name: name,
        Description: description,
        Price: price ? price : 0,
        Date: date,
        StartTime: startTime,
        EndTime: endTime,
        EldershipFk: eventContent.eldershipId,
        Address: place,
        Latitude: coords.lat,
        Longtitude: coords.lng,
        PostDate: eventContent.postDate,
      })
      .then((_) => toggleSpinner());
  };

  const postEvent = () => {
    axios
      .post("https://localhost:44330/api/Event", {
        Name: name,
        Description: description,
        Price: price ? price : 0,
        Date: date,
        StartTime: startTime,
        EndTime: endTime,
        EldershipFk: JSON.parse(sessionStorage["userData"]).Id,
        Address: place,
        Latitude: coords.lat,
        Longtitude: coords.lng,
      })
      .then((_) => toggleSpinner());
  };

  return (
    <form className="event-form__container">
      <NewPostHeader onClose={onClose} text="Naujas renginys" />
      <div className="event-form__container-content">
        <Input
          styling="event-form__input"
          type="text"
          placeholder="Renginio pavadinimas"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          styling="event-form__input"
          type="text"
          placeholder="Renginio vieta"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />

        <TimeInput
          startTime={startTime}
          endTime={endTime}
          currentDate={date}
          onStartTimeChange={(value) => setStartTime(value)}
          onEndTimeChange={(value) => setEndTime(value)}
          onDateChange={(value) => setDate(value)}
        />

        <TextArea
          styling="event-form__input"
          placeholder="Renginio aprašymas..."
          limit={500}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="event-form__switch">
          <Switch
            color="primary"
            shape="fill"
            style={{ fontSize: "15px" }}
            onClick={() => setIsFree(!isFree)}
            checked={isFree}
          >
            <b className={!isFree ? "paragraph--grey" : ""}>Renginys nemokas</b>
          </Switch>

          {!isFree && (
            <Input
              styling="event-form__input event-form__input--price"
              type="number"
              placeholder="Kaina"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          )}
        </div>
      </div>

      {errorMessage && <Error text={errorMessage} />}

      <NewPostButtons
        onBack={eventContent ? null : onBack}
        onSubmit={handleOnSubmit}
      />
    </form>
  );
}

EventForm.propTypes = {
  onClose: PropTypes.func,
  onBack: PropTypes.func,
  eventContent: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    date: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    eldershipId: PropTypes.number,
    address: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
    postDate: PropTypes.string,
  }),
  toggleSpinner: PropTypes.func,
};
