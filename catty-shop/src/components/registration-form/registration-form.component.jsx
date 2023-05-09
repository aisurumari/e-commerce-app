import { useState, useEffect, useRef } from "react";

import {
  faCheck,
  faTimes,
  faInfoCircle,
  faUser,
  faLock,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./registration-form.style.scss";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

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
  const [termsCheckbox, setTermsCheckbox] = useState(false);
  const [newsletterCheckbox, setNewsletterCheckbox] = useState(false);

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

  const resetFormFields = () => {
    setEmail("");
    setPassword("");
    setMatchPassword("");
    setDisplayName("");
    setTermsCheckbox(false);
    setNewsletterCheckbox(false);
  };

  const handleTermsChange = (event) => {
    setTermsCheckbox(event.target.checked);
  };

  const handleNewsletterChange = (event) => {
    setNewsletterCheckbox(event.target.checked);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password,
        displayName,
        newsletterCheckbox
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  return (
    <div>
      <div className="form_wrapper">
        <div className="form_container">
          <div className="title_container">
            <h1>Register</h1>
          </div>
          <div className="row clearfix">
            <div className="">
              <form onSubmit={handleSubmit}>
                <div className="input_field">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validName ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validName || !email ? "hide" : "invalid"}
                  />
                  <span>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <input
                    value={email}
                    ref={userRef}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="email@gmail.com"
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
                      userFocus && email && !validName
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Email is not correct!
                  </p>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPassword ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPassword || !password ? "hide" : "invalid"}
                  />
                </div>
                <div className="input_field">
                  <span>
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    required
                  />
                </div>
                <p
                  id="pwdnote"
                  className={
                    passwordFocus && !validPassword
                      ? "instructions"
                      : "offscreen"
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
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPassword ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPassword ? "hide" : "invalid"}
                />

                <div className="input_field">
                  <span>
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    value={matchPassword}
                    onChange={(e) => setMatchPassword(e.target.value)}
                    type="password"
                    placeholder="Confirm password"
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
                    className={
                      matchFocus && !validMatch ? "instructions" : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    It has to be the same as the first one!
                  </p>
                </div>
                <div className="input_field">
                  <span>
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    type="text"
                    placeholder="Displayed name"
                    id="name"
                    name="name"
                    required
                  />
                </div>
                <div className="input_field checkbox_option">
                  <input
                    type="checkbox"
                    id="termsCheckbox"
                    onChange={handleTermsChange}
                    checked={termsCheckbox}
                  />
                  <label htmlFor="termsCheckbox">
                    I agree with terms and conditions
                  </label>
                </div>
                <div className="input_field checkbox_option">
                  <input
                    type="checkbox"
                    id="newsletterCheckbox"
                    checked={newsletterCheckbox}
                    onChange={handleNewsletterChange}
                  />
                  <label htmlFor="newsletterCheckbox">
                    I want to receive the newsletter
                  </label>
                </div>

                <button
                  disabled={
                    !validName ||
                    !validPassword ||
                    !validMatch ||
                    !termsCheckbox
                      ? true
                      : false
                  }
                  className="acceptance-button"
                  type="submit"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <p className="credit"> Sign in if you already have an account</p>
    </div>
  );
};

export default RegistrationForm;
