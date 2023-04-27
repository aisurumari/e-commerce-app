import { useState, useEffect, useRef } from "react";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./registration-form.style.scss";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const RegistrationForm = () => {
  const userRef = useRef();

  const [email, setEmail] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [displayName, setDisplayName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, matchPassword]);

  return (
    <div className="registration-form-container">
      <h1>Register</h1>
      <form>
        <label htmlFor="email">
          Email
          <FontAwesomeIcon
            icon={faCheck}
            className={validName ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validName || !email ? "hide" : "invalid"}
          />
        </label>
        <input
          value={email}
          ref={userRef}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="yourEmail@gmail.com"
          id="email"
          name="email"
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          required
        />
        <p
          id="uidnote"
          className={
            userFocus && email && !validName ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Email is not correct!
        </p>
        <label htmlFor="password">
          Password
          <FontAwesomeIcon
            icon={faCheck}
            className={validPassword ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validPassword || !password ? "hide" : "invalid"}
          />
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
          aria-invalid={validPassword ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          required
        />
        <p
          id="pwdnote"
          className={
            passwordFocus && !validPassword ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Password has to have:
          <br />
          - 8-24 characters
          <br />
          - small and capital letter
          <br />
          - number
          <br />
          - special character
          <br />
          valid special characters:
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>
        <label htmlFor="matchPassword">
          Confirm password
          <FontAwesomeIcon
            icon={faCheck}
            className={validMatch && matchPassword ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validMatch || !matchPassword ? "hide" : "invalid"}
          />
        </label>
        <input
          value={matchPassword}
          onChange={(e) => setMatchPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="matchPassword"
          name="matchPassword"
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          required
        />
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          It has to be the same as the first one!
        </p>
        <label htmlFor="name">Displayed name</label>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          type="text"
          placeholder="John Doe"
          id="name"
          name="name"
          required
        />
        <button
          disabled={!validName || !validPassword || !validMatch ? true : false}
          className="acceptance-button"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
