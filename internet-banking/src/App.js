import React from 'react';
import PropsTypes from 'prop-types';
import {Route} from "react-router-dom";
import HomePage from "./views/HomePage";
import UserPage from "./views/UserPage";
import AdminPage from "./views/AdminPage";
import UserRoute from "./component/routes/UserRoute";
import AdminRoute from "./component/routes/AdminRoute";

const App = ({location}) => (
    <div>
        <Route location={location} path="/" exact component={HomePage}/>
        <UserRoute location={location} path="/user" exact component={UserPage}/>
        <AdminRoute location={location} path="/admin" exact component={AdminPage}/>
    </div>
);

App.propsTypes = {
    location: PropsTypes.shape({
        pathname: PropsTypes.string.isRequired
    }).isRequired
};

export default App;
