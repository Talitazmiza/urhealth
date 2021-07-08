import React from 'react';

function Navbar() {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto" >
                <div className="pull-right">
                    <a href="/" className="btn btn-default btn-twitter">Sign out</a>
                </div>
            </ul>
        </nav>
    );
}
export default Navbar;
