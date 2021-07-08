import React from 'react';
import FaceIcon from '@material-ui/icons/Face';

function Sidebar() {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="" className="brand-link">
                <span className="brand-text font-weight-light">Welcome Clinic</span>
            </a>

            <div className="sidebar">
                <nav className="mt-2 ">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item">
                            <a href="/clinic/dashboard" className="nav-link">
                                <FaceIcon />
                                <p>  Dashboard</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/clinic/doctors" className="nav-link">
                                <i className="nav-icon fas fa-chart-pie"/>
                                <p>Doctors</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/clinic/patients" className="nav-link">
                                <i className="nav-icon fa fa-book"/>
                                <p>Patients</p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
