import React, {useEffect} from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min';
import 'admin-lte/dist/css/adminlte.css';
import 'admin-lte/dist/js/adminlte';
import 'bootstrap/dist/js/bootstrap.bundle';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Content from '../Components/Content';

function Dashboard() {
    return (
        <div className="wrapper">
            <Navbar />
            <Sidebar />
            <Content />
            <Footer />
            <aside className="control-sidebar control-sidebar-dark"/>
        </div>
    );
}

export default Dashboard;
