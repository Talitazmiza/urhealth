import React, {useState} from 'react';
import DoctorTable from './DoctorTabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';


export default function DocTable() {
    const initialDoctorData = {
        fullName: "",
        email: "",
        sip: "",
        category: "",
        practicePlace: "",
        totalPatient: "",
        password: "",
        confirmPassword: "",
        role: "Dokter"
    };

    const [open, setOpen] = React.useState(false);
    const [doctorData, setDoctorData] = useState(initialDoctorData);

    const handleInputChangeDoctor = event => {
        const { name, value } = event.target.value;
        setDoctorData({ ...doctorData, [name]: value });
    };

    const saveDoctorAccount = () => {
        var data = {
            email: doctorData.email,
            fullName: doctorData.fullName,
            sip: doctorData.sip,
            category: doctorData.category,
            practicePlace: doctorData.practicePlace,
            totalPatient: doctorData.totalPatient,
            password: doctorData.password,
            confirmPassword: doctorData.confirmPassword,
            role: doctorData.role
        };
    }

    function onSubmit(e) {
        e.preventDefault()

        console.log(`Doctor successfully created!`);
        console.log(`FName: ${this.state.fullName}`);
        console.log(`email: ${this.state.email}`);
        console.log(`sip: ${this.state.sip}`);
        console.log(`category: ${this.state.category}`);
        console.log(`practicePlace: ${this.state.practicePlace}`);
        console.log(`totalPatient: ${this.state.totalPatient}`);
        this.setState({fullName: '', email: '', sip: '', category: '', practicePlace: '', totalPatient: ''});
    }


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
                            <h1 className="m-0">Doctors</h1>
                        </div>
                        <div className="col-sm-6">
                            <IconButton onClick={handleClickOpen} aria-label="create" className="float-right">
                                <AddBoxIcon />
                            </IconButton>
                            {/*create patient pop up*/}
                            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Add doctor</DialogTitle>
                                <DialogContent onSubmit={onSubmit}>
                                    <DialogContentText>
                                        To add doctor detail, please fill data here.
                                    </DialogContentText>
                                    <TextField
                                        autofocus
                                        margin="dense"
                                        id="fullName"
                                        value={doctorData.fullName}
                                        onChange={handleInputChangeDoctor}
                                        label="Full Name"
                                        type="text"
                                        fullWidth
                                    />
                                    <TextField
                                        autofocus
                                        margin="dense"
                                        id="email"
                                        value={doctorData.email}
                                        onChange={handleInputChangeDoctor}
                                        label="E-mail"
                                        type="text"
                                        fullWidth
                                    />
                                    <TextField
                                        id="sip"
                                        autofocus
                                        margin="dense"
                                        value={doctorData.sip}
                                        onChange={handleInputChangeDoctor}
                                        label="SIP"
                                        type="text"
                                        fullWidth
                                    />
                                    <TextField
                                        id="category"
                                        autofocus
                                        margin="dense"
                                        value={doctorData.category}
                                        onChange={handleInputChangeDoctor}
                                        label="Category"
                                        type="text"
                                        fullWidth
                                    />
                                    <TextField
                                        id="practicePlace"
                                        autofocus
                                        margin="dense"
                                        value={doctorData.practicePlace}
                                        onChange={handleInputChangeDoctor}
                                        label="Practice Place"
                                        type="text"
                                        fullWidth
                                    />
                                    <TextField
                                        autofocus
                                        margin="dense"
                                        id="totalPatient"
                                        value={doctorData.totalPatient}
                                        onChange={handleInputChangeDoctor}
                                        label="Total Patient"
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
                            <DoctorTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
