import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch } from "react-redux";
import { getAllPatient } from './actions/patients';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Patient from './components/Dashboard/Patient';
import Profile from './components/Dashboard/Profile';
import PatientDashboard from './Views/Patient/Pages/Dashboard';
import PatientProfile from './Views/Patient/Pages/Profile';
import ClinicDashboard from './Views/Clinic/Pages/Dashboard';
import ClinicDoctor from './Views/Clinic/Pages/Doctors';
import ClinicPatient from './Views/Clinic/Pages/Patients';
import DoctorDashboard from './Views/Doctor/Pages/Dashboard';
import DoctorPatient from './Views/Doctor/Pages/Patients';
import DoctorProfile from './Views/Doctor/Pages/Profile';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPatient());
    }, [dispatch]);

    return (
        <BrowserRouter>
            {/* <Container maxWidth="lg"> */}
            <Switch>
                <Route path="/patient/dashboard" exact component={PatientDashboard}/>
                <Route path="/patient/profile" exact component={PatientProfile}/>
                <Route path="/clinic/dashboard" exact component={ClinicDashboard}/>
                <Route path="/clinic/doctors" exact component={ClinicDoctor}/>
                <Route path="/clinic/patients" exact component={ClinicPatient}/>
                <Route path="/doctor/dashboard" exact component={DoctorDashboard}/>
                <Route path="/doctor/patients" exact component={DoctorPatient}/>
                <Route path="/doctor/profile" exact component={DoctorProfile}/>
                <Route path="/" exact component={Auth}/>
                <Route path="/dashboard" exact component={Dashboard}/>
                <Route path="/patient" exact component={Patient}/>
                <Route path="/profile" exact component={Profile}/>
            </Switch>
            {/* </Container> */}
        </BrowserRouter>
    );
};

export default App;
