import React, {useEffect} from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min';
import 'admin-lte/dist/css/adminlte.css';
import 'admin-lte/dist/js/adminlte';
import 'bootstrap/dist/js/bootstrap.bundle';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import 'chart.js/dist/Chart';
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import DoctorList from "../Content/DoctorList";

function Doctors() {
    useEffect(() => {
        document.body.classList.add('hold-transition', 'sidebar-mini', 'layout-fixed');
        return function cleanup() {
            document.body.classList.remove('hold-transition', 'sidebar-mini', 'layout-fixed');
        };
    }, []);
    return (
        <div>
            <Sidebar />
            <Navbar />
            <DoctorList />
            <Footer />
        </div>
    );
}

export default Doctors;
