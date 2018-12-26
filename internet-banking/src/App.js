import React from 'react';
import PropsTypes from 'prop-types';
import {Route} from "react-router-dom";
import HomePage from "./views/HomePage";
import UserPage from "./views/UserPage";
import UserRoute from "./component/routes/UserRoute";

const App = ({location}) => (
    <div>
        <Route location={location} path="/" exact component={HomePage}/>
        <UserRoute location={location} path="/user" exact component={UserPage}/>
    </div>
);

App.propsTypes = {
    location: PropsTypes.shape({
        pathname: PropsTypes.string.isRequired
    }).isRequired
};

export default App;
