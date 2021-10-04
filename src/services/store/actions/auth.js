import AsyncStorage from "@react-native-async-storage/async-storage";
import ENV from "../../../../env";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_TRYAUTH = "SET_TRYAUTH";
export const RESET_PASSWORD = "RESET_PASSWORD";

let timer;

export const setAuth = () => {
  return { type: SET_TRYAUTH };
};

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${ENV.firebaseApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
      }
    );
    if (!response.ok) {
      //error handle, different types of server responses
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";

      if (errorId === "EMAIL_NOT_FOUND") {
        message = "There is no account linked to provided e-mail!";
      }
      if (errorId === "MISSING_EMAIL") {
        message = "Please provide your email address.";
      }

      throw new Error(message);
    }
    dispatch({ type: RESET_PASSWORD });
  };
};

export const signUp = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ENV.firebaseApiKey}`,
      //`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ENV.firebaseApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      //error handel, different types server response
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";

      if (errorId === "EMAIL_EXISTS") {
        message =
          "This Email is already exist! Please try with another one or Log In!";
      } else if (errorId === "INVALID_EMAIL") {
        message = "Please check your email!";
      } else if (
        errorId === "WEAK_PASSWORD : Password should be at least 6 characters"
      ) {
        message =
          "The password is too weak. Password should be at least 6 characters!";
      } else if (errorId === "OPERATION_NOT_ALLOWED") {
        message =
          "There was a problem with our service. Please try again later!";
      } else if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        message = "The number of attempts exided. Please try again later!";
      } else if (errorId === "USER_DISABLED") {
        message =
          "This account was disabled. Please contact custom service or create a new one!";
      }

      throw new Error(message);
    }

    const responseData = await response.json();
    const respTokenDate = parseInt(responseData.expiresIn, 10) * 1000;

    dispatch(
      authenticate(responseData.localId, responseData.idToken, respTokenDate)
    );

    const currentDate = new Date().getTime();
    const expirationDate = new Date(currentDate + respTokenDate);

    saveDataToStorage(
      responseData.idToken,
      responseData.localId,
      expirationDate
    );
  };
};

export const logIn = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ENV.firebaseApiKey}`,
      //`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ENV.firebaseApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      //error handel, what exactly goes wrong
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";

      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This Email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      } else if (errorId === "USER_DISABLED") {
        message = "This user is disabled! Please call our support team!";
      } else if (errorId === "INVALID_EMAIL") {
        message = "Please enter a valid email address!";
      } else if (errorId === "MISSING_PASSWORD") {
        message = "You likely forgot to enter your password!";
      }
      throw new Error(message);

      //throw new Error('Something went wrong!!!!');
    }

    const responseData = await response.json();
    const respTokenDate = parseInt(responseData.expiresIn, 10) * 1000;

    dispatch(
      authenticate(responseData.localId, responseData.idToken, respTokenDate)
    );

    const currentDate = new Date().getTime();
    const expirationDate = new Date(currentDate + respTokenDate);

    saveDataToStorage(
      responseData.idToken,
      responseData.localId,
      expirationDate
    );
  };
};

export const logOut = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logOut());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
