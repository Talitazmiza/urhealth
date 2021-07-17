// form
import React, {useEffect, useState} from 'react';
import PatientTabel from './PatientTabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useDispatch, useSelector } from "react-redux";
import { signupcreate } from '../../../../src/actions/auth';
import { createPatient, updatePatient, deletePatient } from '../../../actions/patients';


export default function PatTable() {
    const dataAkun = useSelector((state) => state);
    // console.log(patients);

    const [open, setOpen] = React.useState(false);
    const [patientData, setPatientData] = useState({
        firstName: '', lastName: '', bloodtype: '', height: '', weight: '', email: '', password: '', confirmPassword: '', role: 'Pasien'
    });

    const dispatch = useDispatch();

    // const handleInputChangePatient = event => {
    //     const { name, value } = event.target.value;
    //     setPatientData({ ...patientData, [name]: value });
    // };

    const savePatientAccount = () => {

    }




    function handleSubmit(e) {
        e.preventDefault();

        var data = {
            email: patientData.email,
            firstName: patientData.firstName,
            lastName: patientData.lastName,
            password: patientData.password,
            confirmPassword: patientData.confirmPassword,
            role: patientData.role
        };

        var dataPatient = {
            firstName: patientData.firstName,
            lastName: patientData.lastName,
            height: patientData.height,
            weight: patientData.weight,
            bloodtype: patientData.bloodtype,
            email: patientData.email
        };


        // dispatch(signupcreate(data))
        // dispatch(createPatient(dataPatient))


        dispatch(signupcreate(dataPatient));
        console.log(dataPatient);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Patients</h1>
                        </div>
                        <div className="col-sm-6">
                            <IconButton onClick={handleClickOpen} aria-label="create" className="float-right">
                                <AddBoxIcon />
                            </IconButton>
                            {/*create patient pop up*/}
                            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Add patient</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        To add patient detail, please fill data here.
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="email"
                                        label="Email"
                                        type="text"
                                        fullWidth
                                        value={patientData.email} onChange={(e) => setPatientData({...patientData, email: e.target.value })}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="firstname"
                                        label="First Name"
                                        type="text"
                                        fullWidth
                                        value={patientData.firstName} onChange={(e) => setPatientData({...patientData, firstName: e.target.value })}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="lastname"
                                        label="Last Name"
                                        type="text"
                                        fullWidth
                                        value={patientData.lastName} onChange={(e) => setPatientData({...patientData, lastName: e.target.value })}
                                    />
                                    <TextField
                                        id="bloodtype"
                                        autoFocus
                                        margin="dense"
                                        label="Blood Type"
                                        type="text"
                                        fullWidth
                                        value={patientData.bloodtype} onChange={(e) => setPatientData({...patientData, bloodtype: e.target.value })}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="height"
                                        label="Height"
                                        type="number"
                                        fullWidth
                                        value={patientData.height} onChange={(e) => setPatientData({...patientData, height: e.target.value })}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="weight"
                                        label="Weight"
                                        type="number"
                                        fullWidth
                                        value={patientData.weight} onChange={(e) => setPatientData({...patientData, weight: e.target.value })}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="password"
                                        label="Password"
                                        type="text"
                                        fullWidth
                                        value={patientData.password} onChange={(e) => setPatientData({...patientData, password: e.target.value })}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="confirmPassword"
                                        label="confirmPassword"
                                        type="text"
                                        fullWidth
                                        value={patientData.confirmPassword} onChange={(e) => setPatientData({...patientData, confirmPassword: e.target.value })}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} variant="outlined" color="secondary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSubmit} variant="outlined" color="primary" type="submit" fullWidth>
                                        Add
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <PatientTabel />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
