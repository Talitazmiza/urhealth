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
function createData(firstname, lastname, bloodtype, height, email, actions) {
    return { firstname, lastname, bloodtype, height, email, actions };
}

const rows = [
    createData('Diana', 'Fitri', 'A', 160),
];


export default function PatientTable() {
    const patients = useSelector((state) => state.patients);  // patients mengacu di reducers/indexjs
    const classes = useStyles();
    // console.log(patients);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [ patient, setPatient ] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [currency, setCurrency] = React.useState('O');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    } ;


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


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
                                                                    autofocus
                                                                    margin="dense"
                                                                    id="first name"
                                                                    onChange={handleChange}
                                                                    label="First Name"
                                                                    type="text"
                                                                    fullWidth
                                                                />
                                                                <TextField
                                                                    autofocus
                                                                    margin="dense"
                                                                    id="last name"
                                                                    onChange={handleChange}
                                                                    label="Last Name"
                                                                    type="text"
                                                                    fullWidth
                                                                />
                                                                <TextField
                                                                    id="bloodtype"
                                                                    autofocus
                                                                    margin="dense"
                                                                    onChange={handleChange}
                                                                    label="Blood Type"
                                                                    type="text"
                                                                    fullWidth
                                                                />
                                                                <TextField
                                                                    autofocus
                                                                    margin="dense"
                                                                    id="height"
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
