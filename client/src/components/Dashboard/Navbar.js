import React from 'react';

function Navbar() {
    return (
        <nav className="main-header navbar navbar-expand navbar-gray-dark navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <button type="submit" className="nav-link btn-twitter" data-widget="pushmenu"><i className="fas fa-bars btn-twitter" /></button>
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
