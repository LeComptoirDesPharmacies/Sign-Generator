import React from 'react';
import SetupPage from "../pages/SetupPage/SetupPage";
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import S3CredentialsPage from "../pages/S3CredentialsPage/S3CredentialsPage"
import CreateSignPage from "../pages/CreateSignPage/CreateSignPage"
import MainMenuPage from "../pages/MainMenuPage/MainMenuPage"
import DisplayFirstPage from "../pages/DisplayFirstPage/DisplayFirstPage"
import SettingsPage from "../pages/SettingsPage/SettingsPage"
import NavTabs from "../components/navTabs/navTabs"
import Helmet from 'react-helmet'
import "./routes.scss"

/**
 * Routing
 */
const Routing = () => {
  return (
  <Router>
      <Helmet>
        <body className="root"></body>
      </Helmet>
      <Switch>
        <Route path="/SetupPage" component={SetupPage} />
        <Route path="/S3Credentials" component={S3CredentialsPage} />
        <Route path="/MainMenuPage" component={MainMenuPage} />
        <Route path="/CreateSign" component={NavTabs} />
        <Route path="/UploadBanner" component={NavTabs} />
        <Route path="/SettingsPage" component={NavTabs} />
        <DisplayFirstPage/>
      </Switch>
  </Router>
);
}

export default Routing;