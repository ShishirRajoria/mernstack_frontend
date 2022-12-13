import React, { useState, useCallback, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
//import SignIn from "./user/pages/LoginExample";


//import Users from "./user/pages/Users";
//import NewPlace from "./places/pages/NewPlace";
//import UserPlaces from "./places/pages/UserPlaces";
//import UpdatePlace from "./places/pages/UpdatePlace";
//import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/components/context/auth-context";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const Users = React.lazy(() => import("./user/pages/Users"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const Auth = React.lazy(() => import("./user/pages/Auth"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate1, setTokenExpirationDate1] = useState();
  const [userId, setUserId] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
/* **************************** */
     //new Date();
     //...-> returns date in format like 31st may 2020;rem. it also takes arg. if needed
/* **************************** */
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate1(tokenExpirationDate);
    // console.log(tokenExpirationDate);
    // console.log(tokenExpirationDate.toISOString());//returns 
    // console.log(tokenExpirationDate.getTime());//returns the number of milliseconds

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate1(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate1) {
      const remainingTime =
        tokenExpirationDate1.getTime() - new Date().getTime();
        // console.log(remainingTime);
      logoutTimer = setTimeout(logout, remainingTime);
      clearTimeout(logoutTimer);
      //cleartimeout function will clear timer automatically on refresh when remaining time get zero
    }
  }, [token, logout, tokenExpirationDate1]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
       {/* <SignIn/> */}
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
//1) look out image how it is coming in usersItem.
//2)where modal used  1):- ErrorModal

//3)understand  activeHttpRequests from http-hook
//4) LoadingSpinner prop:-asOverlay
