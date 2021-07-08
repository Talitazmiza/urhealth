import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Sidebar from '../Components/Sidebar';
import ProfileSetting from "../Components/ProfileSetting";

function Setting() {
    return (
        <div className="wrapper">
            <Navbar />
            <Sidebar />
            <ProfileSetting />
            <Footer />
            <aside className="control-sidebar control-sidebar-dark"/>
        </div>
    )
}

export default Setting;
