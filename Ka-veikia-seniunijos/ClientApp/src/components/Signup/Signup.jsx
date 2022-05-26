import React, { useState, useEffect } from "react";
import Popup from "../Popup/Popup";
import Input from "../Form/Input";
import Dropdown from "../Form/Dropdown";
import Button from "../Button/Button";
import FormFooter from "../Form/Footer/FormFooter";
import Error from "../Error/Error";
import PropTypes from "prop-types";
import "../style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Signup({ onClose, onSignupRedirect }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [elderships, setElderships] = useState([]);
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("https://localhost:44330/api/eldership");
        const elderships = result.data.map((eldership) => eldership.Name);
        setElderships(elderships);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleOnChange = (e) => {
    e.target.classList.remove("form__dropdown--default");
    setArea(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!inputsAreValid() || !isPasswordValid()) return;

    axios
      .post("https://localhost:44330/api/user ", {
        FirstName: name,
        LastName: surname,
        Email: email,
        Municipality: area,
        PasswordHashed: password,
      })
      .then((res) => {
        if (res.status === 200)
          setErrorMessage("Vartotojas buvo sėkmingai užregistruotas");
      })
      .catch((_) => {
        setErrorMessage("Įvyko nenumatyta klaida");
      });
  };

  const inputsAreValid = () => {
    if (!name || !surname || !email || !area || !password || !passwordRepeat) {
      setErrorMessage("Visi laukai yra būtini");
      return false;
    }
    return true;
  };

  const isPasswordValid = () => {
    if (password !== passwordRepeat) {
      setErrorMessage("Slaptažodžiai turi sutapti");
      return false;
    }

    if (password.length <= 8) {
      setErrorMessage("Slaptažodžio ilgis turi būti nemažiau nei 8");
      return false;
    }

    return true;
  };

  const divStyle = {
    overflow:"auto"
}
  return (
    <Popup>
      <div className="login__container login__container--signup signup_div"  style={divStyle}>
        <FontAwesomeIcon
          className="form__icon"
          icon={faXmark}
          onClick={onClose}
        />
        <h2 className="header__secondary u-text-center">Registracija</h2>

        <form className="signup__content">
          <div className="login__input-wrapper">
            <Input
              styling="form__input"
              type="text"
              placeholder="Vardas"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="login__input-wrapper">
            <Input
              styling="form__input"
              type="text"
              placeholder="Pavardė"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>

          <div className="login__input-wrapper">
            <Input
              styling="form__input"
              type="email"
              placeholder="El. paštas"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login__input-wrapper">
            <Dropdown
              styling="form__dropdown form__dropdown--default"
              placeholder="Seniūnija"
              values={elderships}
              onChange={handleOnChange}
            />
          </div>

          <div className="login__input-wrapper">
            <Input
              styling="form__input"
              type="password"
              placeholder="Slaptažodis"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login__input-wrapper">
            <Input
              styling="form__input"
              type="password"
              placeholder="Pakartokite slaptažodį"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
            />
          </div>

          <div className="login__button-wrapper">
            <Button
              text="Registruotis"
              styling="btn btn--login"
              type="submit"
              onClick={handleOnSubmit}
            />
          </div>

          {errorMessage && <Error text={errorMessage} />}
        </form>
        <br/>
        <FormFooter className="align-self-end"
          paragraphText="Turite paskyrą?"
          textButtonMessage="Prisijungti"
          onClick={onSignupRedirect}
        />


      </div>
    </Popup>
  );
}

Signup.prototype = {
  onClose: PropTypes.func,
  onSignupRedirect: PropTypes.func,
};
