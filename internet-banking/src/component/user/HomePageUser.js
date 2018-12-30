import React from 'react';
import NavbarUser from './navbarUser';

class HomePageUser extends React.Component {
    render() {
        return (
            <div className="ui container">
                <NavbarUser/>
                <h1>Home Page User</h1>
            </div>

        )
    }
}

export default HomePageUser;