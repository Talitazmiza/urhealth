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
import Sidebar from './Sidebar';
import Footer from './Footer';
import Content from './Content';
import Navbar from './Navbar';

function Dashboard() {
    useEffect(() => {
        document.body.classList.add('hold-transition', 'sidebar-mini', 'layout-fixed');

        return function cleanup() {
            document.body.classList.remove('hold-transition', 'sidebar-mini', 'layout-fixed');
        };
    }, []);
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

