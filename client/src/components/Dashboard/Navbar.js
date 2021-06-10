import React from 'react';

function Navbar() {
    return (
        <nav className="main-header navbar navbar-expand navbar-gray-dark navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <button type="submit" className="nav-link btn-twitter" data-widget="pushmenu"><i className="fas fa-bars btn-twitter" /></button>
                </li>
                {/*<li className="nav-item d-none d-sm-inline-block">*/}
                {/*    <button type="submit" href="index3.html" className="nav-link">Home</button>*/}
                {/*</li>*/}
                {/*<li className="nav-item d-none d-sm-inline-block">*/}
                {/*    <button type="submit" className="nav-link">Contact</button>*/}
                {/*</li>*/}
            </ul>
            <ul className="navbar-nav ml-auto" >
                    <div className="pull-right">
                        <a href="/" className="btn btn-default btn-twitter">Sign out</a>
                    </div>
            </ul>
            {/*<form className="form-inline ml-3">*/}
            {/*    <div className="input-group input-group-sm">*/}
            {/*        <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />*/}
            {/*        <div className="input-group-append">*/}
            {/*            <button className="btn btn-navbar" type="submit">*/}
            {/*                <i className="fas fa-search" />*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</form>*/}

            {/*<ul className="navbar-nav ml-auto">*/}
            {/*    <li className="nav-item dropdown">*/}
            {/*        <button type="submit" className="nav-link" data-toggle="dropdown">*/}
            {/*            <i className="far fa-comments" />*/}
            {/*            <span className="badge badge-danger navbar-badge">3</span>*/}
            {/*        </button>*/}
            {/*        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">*/}
            {/*            <button type="submit" className="dropdown-item">*/}
            {/*                <div className="media">*/}
            {/*                    <img src="/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />*/}
            {/*                    <div className="media-body">*/}
            {/*                        <h3 className="dropdown-item-title">*/}
            {/*                            Brad Diesel*/}
            {/*                            <span className="float-right text-sm text-danger"><i className="fas fa-star" /></span>*/}
            {/*                        </h3>*/}
            {/*                        <p className="text-sm">Call me whenever you can...</p>*/}
            {/*                        <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </button>*/}
            {/*            <div className="dropdown-divider" />*/}
            {/*            <button type="submit" className="dropdown-item">*/}
            {/*                <div className="media">*/}
            {/*                    <img src="/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />*/}
            {/*                    <div className="media-body">*/}
            {/*                        <h3 className="dropdown-item-title">*/}
            {/*                            John Pierce*/}
            {/*                            <span className="float-right text-sm text-muted"><i className="fas fa-star" /></span>*/}
            {/*                        </h3>*/}
            {/*                        <p className="text-sm">I got your message bro</p>*/}
            {/*                        <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </button>*/}
            {/*            <div className="dropdown-divider" />*/}
            {/*            <button type="submit" className="dropdown-item">*/}
            {/*                <div className="media">*/}
            {/*                    <img src="/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />*/}
            {/*                    <div className="media-body">*/}
            {/*                        <h3 className="dropdown-item-title">*/}
            {/*                            Nora Silvester*/}
            {/*                            <span className="float-right text-sm text-warning"><i className="fas fa-star" /></span>*/}
            {/*                        </h3>*/}
            {/*                        <p className="text-sm">The subject goes here</p>*/}
            {/*                        <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </button>*/}
            {/*            <div className="dropdown-divider" />*/}
            {/*            <button type="submit" className="dropdown-item dropdown-footer">See All Messages</button>*/}
            {/*        </div>*/}
            {/*    </li>*/}
            {/*    <li className="nav-item dropdown">*/}
            {/*        <button type="submit" className="nav-link" data-toggle="dropdown">*/}
            {/*            <i className="far fa-bell" />*/}
            {/*            <span className="badge badge-warning navbar-badge">15</span>*/}
            {/*        </button>*/}
            {/*        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">*/}
            {/*            <span className="dropdown-item dropdown-header">15 Notifications</span>*/}
            {/*            <div className="dropdown-divider" />*/}
            {/*            <button type="submit" className="dropdown-item">*/}
            {/*                <i className="fas fa-envelope mr-2" /> 4 new messages*/}
            {/*                <span className="float-right text-muted text-sm">3 mins</span>*/}
            {/*            </button>*/}
            {/*            <div className="dropdown-divider" />*/}
            {/*            <button type="submit" className="dropdown-item">*/}
            {/*                <i className="fas fa-users mr-2" /> 8 friend requests*/}
            {/*                <span className="float-right text-muted text-sm">12 hours</span>*/}
            {/*            </button>*/}
            {/*            <div className="dropdown-divider" />*/}
            {/*            <button type="submit" className="dropdown-item">*/}
            {/*                <i className="fas fa-file mr-2" /> 3 new reports*/}
            {/*                <span className="float-right text-muted text-sm">2 days</span>*/}
            {/*            </button>*/}
            {/*            <div className="dropdown-divider" />*/}
            {/*            <button type="submit" className="dropdown-item dropdown-footer">See All Notifications</button>*/}
            {/*        </div>*/}
            {/*    </li>*/}
            {/*    <li className="nav-item">*/}
            {/*        <button type="submit" className="nav-link" data-widget="fullscreen">*/}
            {/*            <i className="fas fa-expand-arrows-alt" />*/}
            {/*        </button>*/}
            {/*    </li>*/}
            {/*    <li className="nav-item">*/}
            {/*        <button type="submit" className="nav-link" data-widget="control-sidebar" data-slide="true">*/}
            {/*            <i className="fas fa-th-large" />*/}
            {/*        </button>*/}
            {/*    </li>*/}
            {/* </ul>*/}
        </nav>
    );
}
export default Navbar;
