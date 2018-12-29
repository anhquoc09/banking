import React from 'react';
import PropsTypes from 'prop-types';
import {Route} from "react-router-dom";
import HomePage from "./views/HomePage";
import UserPage from "./views/UserPage";
import AdminPage from "./views/AdminPage";
import UserRoute from "./component/routes/UserRoute";
import AdminRoute from "./component/routes/AdminRoute";
import HomePageAdminRoute from "./component/admin/route/HomePageAdminRoute";
import HomePageAdmin from "./component/admin/HomePageAdmin";
import AddUserPageAdmin from "./component/admin/AddUserPageAdmin";
import AddUserRoute from "./component/admin/route/AddUserRoute";
import AddAccountRoute from "./component/admin/route/AddAccountRoute";
import AddAccountPageAdmin from "./component/admin/AddAccountPageAdmin";
import AddMoneyRoute from "./component/admin/route/AddMoneyRoute";
import AddMoneyPageAdmin from "./component/admin/AddMoneyPageAdmin";

const App = ({location}) => (
    <div>
        <Route location={location} path="/" exact component={HomePage}/>
        <UserRoute location={location} path="/user" exact component={UserPage}/>
        <AdminRoute location={location} path="/admin" exact component={AdminPage}/>
        <HomePageAdminRoute location={location} path="/admin/home" exact component={HomePageAdmin}/>
        <AddUserRoute location={location} path="/admin/adduser" exact component={AddUserPageAdmin}/>
        <AddAccountRoute location={location} path="/admin/addaccount" exact component={AddAccountPageAdmin}/>
        <AddMoneyRoute location={location} path="/admin/addmoney" exact component={AddMoneyPageAdmin}/>
    </div>
);

App.propsTypes = {
    location: PropsTypes.shape({
        pathname: PropsTypes.string.isRequired
    }).isRequired
};

export default App;
