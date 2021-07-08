import React from 'react';
import FaceIcon from '@material-ui/icons/Face';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ViewListIcon from '@material-ui/icons/ViewList';

function Sidebar() {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="" className="brand-link">
                <span className="brand-text font-weight-light">Welcome Doctor</span>
            </a>

            <div className="sidebar">
                <nav className="mt-2 ">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item">
                            <a href="/doctor/dashboard" className="nav-link">
                                <DashboardIcon />
                                <p>  Dashboard</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/doctor/patients" className="nav-link">
                                <ViewListIcon />
                                <p>  Patients</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/doctor/profile" className="nav-link">
                                <FaceIcon />
                                <p>  Profile</p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
