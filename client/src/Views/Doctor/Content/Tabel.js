import React, {useState} from 'react';
import PatientTabel from './PatientTabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function Tabel() {
    const initialPatientData = {
        firstname: "",
        lastname: "",
        bloodtype: "",
        height: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Pasien"
    };

    const [open, setOpen] = React.useState(false);
    const [patientData, setPatientData] = useState(initialPatientData);

    const handleInputChangePatient = event => {
        const { name, value } = event.target.value;
        setPatientData({ ...patientData, [name]: value });
    };

    const savePatientAccount = () => {
        var data = {
            email: patientData.email,
            firstname: patientData.firstname,
            lastname: patientData.lastname,
            password: patientData.password,
            confirmPassword: patientData.confirmPassword,
            role: patientData.role
        };
    }

    function onSubmit(e) {
        e.preventDefault()

        console.log(`Patient successfully created!`);
        console.log(`FName: ${this.state.firstname}`);
        console.log(`LName: ${this.state.lastname}`);
        console.log(`BloodType: ${this.state.bloodtype}`);
        console.log(`Height: ${this.state.height}`);

        this.setState({firstname: '', lastname: '', bloodtype: '', height: ''});
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
                                <DialogContent onSubmit={onSubmit}>
                                    <DialogContentText>
                                        To add patient detail, please fill data here.
                                    </DialogContentText>
                                    <TextField
                                        autofocus
                                        margin="dense"
                                        id="firstname"
                                        value={patientData.firstname}
                                        onChange={handleInputChangePatient}
                                        label="First Name"
                                        type="text"
                                        fullWidth
                                    />
                                    <TextField
                                        autofocus
                                        margin="dense"
                                        id="lastname"
                                        value={patientData.lastname}
                                        onChange={handleInputChangePatient}
                                        label="Last Name"
                                        type="text"
                                        fullWidth
                                    />
                                    <TextField
                                        id="bloodtype"
                                        autofocus
                                        margin="dense"
                                        value={patientData.bloodtype}
                                        onChange={handleInputChangePatient}
                                        label="Blood Type"
                                        type="text"
                                        fullWidth
                                    />
                                    <TextField
                                        autofocus
                                        margin="dense"
                                        id="height"
                                        value={patientData.height}
                                        onChange={handleInputChangePatient}
                                        label="Height"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        type="number"
                                        fullWidth
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} variant="outlined" color="secondary">
                                        Cancel
                                    </Button>
                                    <Button variant="outlined" color="primary" type="submit">
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
