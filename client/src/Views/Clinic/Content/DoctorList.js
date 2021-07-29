// form
import React, {useEffect, useState} from 'react';
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
import { signupcreate, signup } from '../../../../src/actions/auth';
import { createDoctor, updateDoctor, deleteDoctor, getAllDoctor } from '../../../actions/doctors';
import { createStore, applyMiddleware, bindActionCreators } from 'redux'
import authReducer from "../../../reducers/auth";
import thunk from 'redux-thunk';
import { AUTHCREATE, CREATE_PASIEN } from "../../../constants/actionTypes";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";

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
        id: 'fullName',
        label: 'Full Name',
        align: 'center',
        minWidth: 150

    },
    {
        id: 'user_data',
        label: 'E-mail',
        minWidth: 150,
        type: 'email',
        align: 'center',
    },
    {
        id: 'sip',
        label: 'SIP',
        align: 'center',
        minWidth: 100
    },
    {
        id: 'category',
        label: 'Category',
        minWidth: 150,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'practicePlace',
        label: 'Practice Place',
        minWidth: 150,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'totalPatient',
        label: 'Total Patient',
        minWidth: 150,
        type: 'text',
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'actions',
        label: 'Actions',
        minWidth: 150,
        align: 'center',
    },
];
export default function DoctorList() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [editMode, setEditMode] = React.useState(false);
    const [currentId, setCurrentId] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const dispatchChaining =  (data, dataDoctor) => async (dispatch) => {
        await Promise.all([
            dispatch(signupcreate(data)),
            // <-- async dispatch chaining in action
        ]);
        return dispatch(createDoctor(dataDoctor));
    };
    const dispatchChainingDelete =  (id) => async (dispatch) => {
        await Promise.all([
            dispatch(deleteDoctor(id)),
            // <-- async dispatch chaining in action
        ]);
        return dispatch(getAllDoctor());
    };

    const store = createStore(authReducer, {}, applyMiddleware(thunk));
    const actions = bindActionCreators({dispatchChaining, dispatchChainingDelete}, store.dispatch);

    const [open, setOpen] = React.useState(false);
    const [doctorData, setDoctorData] = useState( { email: '', fullName: '', sip: '', category: '', practicePlace: '', totalPatient: '', password: '', confirmPassword: '', role: 'Dokter'  });

    const [submitted, setSubmitted] = useState(false);

    const doctors = useSelector((state) => state.doctors);  // doctors mengacu di reducers/indexjs
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllDoctor());
    }, []);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleInputChangeDoctor = event => {
        const { name, value } = event.target.value;
        setDoctorData({ ...doctorData, [name]: value });
    };

    const saveDoctor = () => {
        const { fullName, sip, category, practicePlace, totalPatient, email, password, confirmPassword } = doctorData;

        dispatch(createDoctor(fullName, sip, category, practicePlace, totalPatient, email, password, confirmPassword))
            .then(data => {
                setDoctorData({
                    id: data.id,
                    email: data.email,
                    fullName: data.fullName,
                    sip: data.sip,
                    category: data.category,
                    practicePlace: data.practicePlace,
                    totalPatient: data.totalPatient,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                });
                setSubmitted(true);
                actions.dispatchChaining(data, dataDoctor);
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newDoctor = () => {
        setEditMode(false);
        clear();
        setOpen(true);
        // setDoctorData();
        setSubmitted(false);
    };
    const editDoctor = (data) => {
        setOpen(true);
        setEditMode(true);
        setDoctorData({
            fullName: data.fullName,
            sip: data.sip,
            category: data.category,
            practicePlace: data.practicePlace,
            totalPatient: data.totalPatient,
        });
        setCurrentId(data._id);
        setSubmitted(false);
    };
    const handleDeleteDoctor = (id) => {
        dispatch(deleteDoctor(id));
    };
    const handleUpdateDoctor = () => {
        dispatch(updateDoctor(currentId, doctorData));
        handleClose();
    };

    function handleSubmit(e) {
        e.preventDefault();

        var data = {
            email: doctorData.email,
            fullName: doctorData.fullName,
            password: doctorData.password,
            confirmPassword: doctorData.confirmPassword,
            role: doctorData.role
        };

        var dataDoctor = {
            email: doctorData.email,
            fullName: doctorData.fullName,
            sip: doctorData.sip,
            category: doctorData.category,
            practicePlace: doctorData.practicePlace,
            totalPatient: doctorData.totalPatient
        };

        actions.dispatchChaining(data, dataDoctor);
        clear();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const clear = () => {
        setDoctorData({ email: '', fullName: '', sip: '', category: '', practicePlace: '', totalPatient: '', password: '', confirmPassword: '', role: 'Dokter' });
    }

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Doctors</h1>
                        </div>
                        <div className="col-sm-6">
                            <IconButton onClick={newDoctor} aria-label="create" className="float-right">
                                <AddBoxIcon />
                            </IconButton>
                            {/*create doctor pop up*/}
                            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Add doctor</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        To add doctor detail, please fill data here.
                                    </DialogContentText>
                                    <TextField
                                        disabled={editMode === true ? true : false}
                                        hidden={editMode === true ? true : false}
                                        autoFocus
                                        margin="dense"
                                        id="email"
                                        label="Email"
                                        type="text"
                                        fullWidth
                                        value={doctorData.email} onChange={(e) => setDoctorData({...doctorData, email: e.target.value })}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="fullName"
                                        label="Full Name"
                                        type="text"
                                        fullWidth
                                        value={doctorData.fullName} onChange={(e) => setDoctorData({...doctorData, fullName: e.target.value })}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="sip"
                                        label="SIP"
                                        type="text"
                                        fullWidth
                                        value={doctorData.sip} onChange={(e) => setDoctorData({...doctorData, sip: e.target.value })}
                                    />
                                    <TextField
                                        id="category"
                                        autoFocus
                                        margin="dense"
                                        label="Category"
                                        type="text"
                                        fullWidth
                                        value={doctorData.category} onChange={(e) => setDoctorData({...doctorData, category: e.target.value })}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="practicePlace"
                                        label="Practice Place"
                                        type="text"
                                        fullWidth
                                        value={doctorData.practicePlace} onChange={(e) => setDoctorData({...doctorData, practicePlace: e.target.value })}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="totalPatient"
                                        label="Total Patient"
                                        type="text"
                                        fullWidth
                                        value={doctorData.totalPatient} onChange={(e) => setDoctorData({...doctorData, totalPatient: e.target.value })}
                                    />
                                    <TextField
                                        disabled={editMode === true ? true : false}
                                        hidden={editMode === true ? true : false}
                                        autoFocus
                                        margin="dense"
                                        id="password"
                                        label="Password"
                                        type="text"
                                        fullWidth
                                        value={doctorData.password} onChange={(e) => setDoctorData({...doctorData, password: e.target.value })}
                                    />
                                    <TextField
                                        disabled={editMode === true ? true : false}
                                        hidden={editMode === true ? true : false}
                                        autoFocus
                                        margin="dense"
                                        id="confirmPassword"
                                        label="confirmPassword"
                                        type="text"
                                        fullWidth
                                        value={doctorData.confirmPassword} onChange={(e) => setDoctorData({...doctorData, confirmPassword: e.target.value })}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} variant="outlined" color="secondary">
                                        Cancel
                                    </Button>
                                    <Button onClick={editMode === true ? handleUpdateDoctor : handleSubmit} variant="outlined" color="primary" type="submit" fullWidth>
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
                                            {doctors && doctors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                                                                            <IconButton onClick={()=>editDoctor(row)} aria-label="delete" className={classes.margin}>
                                                                                <EditIcon />
                                                                            </IconButton>
                                                                            {/*edit doctorspop up*/}
                                                                            <IconButton onClick={()=>handleDeleteDoctor(row['_id'])} aria-label="delete" className={classes.margin}>
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
                                    count={doctors.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}