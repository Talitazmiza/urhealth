// post
import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllPatient } from '../../../api'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const columns = [
    {
        id: 'firstName',
        label: 'First name',
        align: 'center',
        minWidth: 150

    },
    {
        id: 'lastName',
        label: 'Last name',
        align: 'center',
        minWidth: 100
    },
    {
        id: 'bloodtype',
        label: 'Blood type',
        minWidth: 150,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'height',
        label: 'Height(cm)',
        minWidth: 150,
        type: 'number',
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'weight',
        label: 'Weight(kg)',
        minWidth: 150,
        type: 'number',
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'user_data',
        label: 'E-mail',
        minWidth: 150,
        type: 'email',
        align: 'center',
    },
    {
        id: 'actions',
        label: 'Actions',
        minWidth: 150,
        align: 'center',
    },
];

// createData dan rows kok gak bisa dihapus
function createData(firstname, lastname, bloodtype, height, weight, email, actions) {
    return { firstname, lastname, bloodtype, height, weight, email, actions };
}

const rows = [
    createData('Diana', 'Fitri', 'A', 160),
];


export default function PatientTable({ currentId, setCurrentId }) {
    const patients = useSelector((state) => state.patients);  // patients mengacu di reducers/indexjs
    const classes = useStyles();
    // console.log(patients);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [currency, setCurrency] = React.useState('O');

    const [patientData, setPatientData] = useState({
        firstName: '', lastName: '', bloodtype: '', height: '', weight: '', email: '', password: '', confirmPassword: '', role: 'Pasien'
    });

    const patient = useSelector((state) => currentId ? state.patients.find((p) => p._id === currentId) : null ); // to find spesific patient


    // populate the values of the add form
    useEffect(() => {
        if(patient) setPatientData(patient); //setpatirnt populate with patient
    }, [patient]);


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

        // dispatch(createPatient(dataPatient))
        // dispatch(signupcreate(data))

        if(currentId) {
            dispatch(updatePatient(currentId, dataPatient))
        } else {
            actions.dispatchChaining(data, dataPatient);
        }
        clear();
    };


    const handleChange = (event) => {
        setCurrency(event.target.value);
    } ;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const clear = () => {
        setCurrentId(null);
        setPatientData({ firstName: '', lastName: '', bloodtype: '', height: '', weight: '', email: '', password: '', confirmPassword: '', role: 'Pasien' });
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const retrievePatient = () => {
        getAllPatient()
            .then(response => {
                setPatient(response.data.result);
            })
            .catch(e => {
                console.log(e);
            });
    }
    useEffect(() => {
        retrievePatient();
    }, []);

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patient.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        if (column.id != 'actions') {
                                            let value = row[column.id];
                                            if (column.id == 'user_data') {
                                                value = row[column.id]['email'];
                                            }
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value == 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        } else  {
                                            return  (
                                                <TableCell key={column.id} align={column.align}>
                                                    <div>
                                                        <IconButton onClick={handleClickOpen} aria-label="delete" className={classes.margin}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        {/*edit patient pop up*/}
                                                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                                            <DialogTitle id="form-dialog-title">Edit patient</DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText>
                                                                    To edit patient detail, please do some changes data here.
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
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={handleClose} variant="outlined" color="secondary">
                                                                    Cancel
                                                                </Button>
                                                                <Button onClick={handleClose} variant="outlined" color="primary">
                                                                    Update
                                                                </Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                        <IconButton aria-label="delete" className={classes.margin}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </div>
                                                </TableCell>
                                            );
                                        }
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[2, 5, 10]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
