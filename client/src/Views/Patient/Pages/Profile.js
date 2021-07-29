import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Sidebar from '../Components/Sidebar';
import PatientProfile from "../Content/PatientProfile";

function Profile() {
    return (
        <div className="wrapper">
            <Navbar />
            <Sidebar />
            <PatientProfile />
            <Footer />
            <aside className="control-sidebar control-sidebar-dark"/>
    </div>
    )
}

export default Profile;
