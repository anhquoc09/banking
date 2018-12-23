import React from 'react';
import {Route} from "react-router-dom";
import HomePage from "./views/HomePage";
import UserPage from "./views/UserPage";


const App = () => (
    <div>
        <Route path="/" exact component={HomePage}/>
        <Route path="/user" exact component={UserPage}/>
    </div>
);

export default App;
