// form
import React, { useState } from 'react';
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
import { createPatient, updatePatient, deletePatient } from '../../../actions/patients';


export default function PatTable() {
    const patients = useSelector((state) => state.patients);
    // console.log(patients);

    const [open, setOpen] = React.useState(false);
    const [patientData, setPatientData] = useState({
        firstname: '', lastname: '', bloodtype: '', height: '', email: '', password: '', confirmPassword: '', role: 'Pasien'
    });

    const dispatch = useDispatch();

    // const handleInputChangePatient = event => {
    //     const { name, value } = event.target.value;
    //     setPatientData({ ...patientData, [name]: value });
    // };

    // const savePatientAccount = () => {
    //     var data = {
    //         email: patientData.email,
    //         firstname: patientData.firstname,
    //         lastname: patientData.lastname,
    //         password: patientData.password,
    //         confirmPassword: patientData.confirmPassword,
    //         role: patientData.role
    //     };
    // }

    function handleSubmit(e) {
        e.preventDefault();

        dispatch(createPatient(patientData));

        // console.log(`Patient successfully created!`);
        // console.log(`FName: ${this.state.firstname}`);
        // console.log(`LName: ${this.state.lastname}`);
        // console.log(`BloodType: ${this.state.bloodtype}`);
        // console.log(`Height: ${this.state.height}`);
        //
        // this.setState({firstname: '', lastname: '', bloodtype: '', height: ''});
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
                                    {/*<TextField*/}
                                    {/*    autoFocus*/}
                                    {/*    margin="dense"*/}
                                    {/*    id="email"*/}
                                    {/*    label="Email"*/}
                                    {/*    type="text"*/}
                                    {/*    fullWidth*/}
                                    {/*    value={patientData.email} onChange={(e) => setPatientData({...patientData, email: e.target.value })}*/}
                                    {/*/>*/}
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="firstname"
                                        label="First Name"
                                        type="text"
                                        fullWidth
                                        value={patientData.firstname} onChange={(e) => setPatientData({...patientData, firstname: e.target.value })}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="lastname"
                                        label="Last Name"
                                        type="text"
                                        fullWidth
                                        value={patientData.lastname} onChange={(e) => setPatientData({...patientData, lastname: e.target.value })}
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
