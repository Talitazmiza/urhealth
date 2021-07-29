import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Sidebar from '../Components/Sidebar';
import DoctorProfile from "../Content/DoctorProfile";

function Profile() {
    return (
        <div className="wrapper">
            <Navbar />
            <Sidebar />
            <DoctorProfile />
            <Footer />
            <aside className="control-sidebar control-sidebar-dark"/>
        </div>
    )
}

export default Profile;
