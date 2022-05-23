import React, { useState, useEffect } from "react";
import Input from "../../Form/Input";
import Button from "../../Button/Button";
import Error from "../../Error/Error";
import axios from "axios";
const AdministrativeElder = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [municipality, setMunicipality] = useState();
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleOnSubmit = async () => {
    const valid = await inputsAreValid()
    console.log(valid)
    if (!valid || !isPasswordValid()) return;
    axios
        .post("https://localhost:44330/api/eldership", {
          Name: name,
          Email: email,
          Municipality: municipality,
          PasswordHashed: password,
        })
        .then((res) => {
          if (res.status === 200)
            setErrorMessage("Seniūnija buvo sėkmingai užregistruota");
        })
        .catch((_) => {
          setErrorMessage("Įvyko nenumatyta klaida");
        });
  };
  const inputsAreValid = async () => {
    if (!name || !email || !password || !passwordRepeat) {
      setErrorMessage("Visi laukai yra būtini");
      return false;
    }
    var flag=true
    await axios
      .get("https://localhost:44330/api/eldership/getEldership/" + name)
      .then((res) => {
        console.log(res);
        if (res.data.Name !== null || res !== null) {
          setErrorMessage("Jau yra įvesta tokia seniūnija");
          flag =  false;
        }
      });
    return flag;
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
  return (
    <>
      <h1>Pridėti seniūniją</h1>
      <form className="signup__content">
        <div className="login__input-wrapper">
          <Input
            styling="form__input"
            type="text"
            placeholder="Pavadinimas"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <Input
            styling="form__dropdown form__dropdown--default"
            type="text"
            placeholder="Savivaldybė"
            values={municipality}
            onChange={(e) => setMunicipality(e.target.value)}
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
            text="Registruoti"
            styling="btn btn--login"
            type="submit"
            onClick={handleOnSubmit}
          />
        </div>

        {errorMessage && <Error text={errorMessage} />}
      </form>
    </>
  );
};
export default AdministrativeElder;
