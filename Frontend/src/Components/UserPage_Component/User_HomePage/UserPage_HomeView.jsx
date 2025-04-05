import React from "react";

class UserPage_HomeView extends React.Component {
    render() {
        return (
            <div className="homedtls d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
                <h1 className="fw-bold text-primary text-center">
                    Welcome to the User Portal
                </h1>
                <p className="text-muted text-center mt-2">
                    Manage your bookings effortlessly and enjoy a seamless experience.
                </p>
            </div>
        );
    }
}

export default UserPage_HomeView;
