import React from 'react';
import PropsTypes from 'prop-types';
import {Route} from "react-router-dom";
import HomePage from "./views/HomePage";
import UserPage from "./views/UserPage";
import AdminPage from "./views/AdminPage";
import UserRoute from "./component/routes/UserRoute";
import HomePageUser from "./component/user/HomePageUser";
import ShowAccountBankPageUser from "./component/user/ShowAccountBankPageUser";
import MoveMoneyPageUser from "./component/user/MoveMoneyPageUser";
import AdminRoute from "./component/routes/AdminRoute";
import HomePageAdmin from "./component/admin/HomePageAdmin";
import AddUserPageAdmin from "./component/admin/AddUserPageAdmin";
import AddAccountPageAdmin from "./component/admin/AddAccountPageAdmin";
import AddMoneyPageAdmin from "./component/admin/AddMoneyPageAdmin";

const App = ({location}) => (
    <div>
        <Route location={location} path="/" exact component={HomePage}/>
        <UserRoute location={location} path="/user" exact component={UserPage}/>
        <UserRoute location={location} path="/user/home" exact component={HomePageUser}/>
        <UserRoute location={location} path="/user/showaccount" exact component={ShowAccountBankPageUser}/>
        <UserRoute location={location} path="/user/movemoney" exact component={MoveMoneyPageUser}/>

        <AdminRoute location={location} path="/admin" exact component={AdminPage}/>
        <AdminRoute location={location} path="/admin/home" exact component={HomePageAdmin}/>
        <AdminRoute location={location} path="/admin/adduser" exact component={AddUserPageAdmin}/>
        <AdminRoute location={location} path="/admin/addaccount" exact component={AddAccountPageAdmin}/>
        <AdminRoute location={location} path="/admin/addmoney" exact component={AddMoneyPageAdmin}/>
    </div>
);

App.propsTypes = {
    location: PropsTypes.shape({
        pathname: PropsTypes.string.isRequired
    }).isRequired
};

export default App;
