import React, { useState, useLayoutEffect } from "react";
import Button from "../../Button/Button";
import NewPostHeader from "../NewPostHeader";
import { Radio } from "pretty-checkbox-react";
import PropTypes from "prop-types";
import "../../Button/_button.scss";
import "./_post-selection-style.scss";
import "../../Utils/_base.scss";

export default function PostSelection({
  onClose,
  onPostSelect,
  onNewEventSelect,
  onNewSurveySelect,
}) {
  const [checked, setChecked] = useState({
    post: true,
    event: false,
    survey: false,
  });
  const [radioSize, setRadioSize] = useState("25px");

  const handleOnRadioChange = (e) => {
    setChecked({
      post: e.target.name === "post",
      event: e.target.name === "event",
      survey: e.target.name === "survey",
    });
  };

  const handleOnNext = () => {
    if (checked.post) onPostSelect();
    else if (checked.event) onNewEventSelect();
    else onNewSurveySelect();
  };

  useLayoutEffect(() => {
    const updateSize = () => {
      window.innerWidth <= 900 ? setRadioSize("20px") : setRadioSize("25px");
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="post-selection__container">
      <NewPostHeader onClose={onClose} text="Pasirinkite įrašo tipą" />

      <div className="post-selection__options">
        <div className="post-selection__options-radio">
          <Radio
            name="post"
            color="primary"
            style={{ fontSize: radioSize }}
            checked={checked.post}
            onChange={handleOnRadioChange}
          >
            Paprastas įrašas
          </Radio>
        </div>

        <div className="post-selection__options-radio">
          <Radio
            name="event"
            color="primary"
            style={{ fontSize: radioSize }}
            checked={checked.event}
            onChange={handleOnRadioChange}
          >
            Naujas renginys
          </Radio>
        </div>

        <div className="post-selection__options-radio">
          <Radio
            name="survey"
            color="primary"
            style={{ fontSize: radioSize }}
            checked={checked.survey}
            onChange={handleOnRadioChange}
          >
            Nauja apklausa
          </Radio>
        </div>
      </div>

      <div className="post-selection__buttons">
        <Button
          text="Uždaryti"
          onClick={onClose}
          styling="btn btn--post-small"
        />

        <Button
          text="Toliau"
          styling="btn btn--post-small"
          onClick={handleOnNext}
        />
      </div>
    </div>
  );
}

PostSelection.propTypes = {
  onClose: PropTypes.func,
  onPostSelect: PropTypes.func,
  onNewEventSelect: PropTypes.func,
  onNewSurveySelect: PropTypes.func,
};
