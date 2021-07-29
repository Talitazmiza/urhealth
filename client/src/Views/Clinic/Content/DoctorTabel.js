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
import { getAllDoctor } from '../../../api'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


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
        label: 'Full name',
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
        minWidth: 150,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'category',
        label: 'Doctor Category',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'practicePlace',
        label: 'Practice Place',
        align: 'center',
        minWidth: 150
    },
    {
        id: 'totalPatient',
        label: 'Total Patient',
        minWidth: 150,
        type: 'number',
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

// createData dan rows kok gak bisa dihapus
function createData(fullName, email, sip, category, practicePlace, totalPatient, actions) {
    return { fullName, email, sip, category, practicePlace, totalPatient, actions };
}

const rows = [
    createData('Diana', 'Fitri', '12345567799', 'internal disease', 'surabaya', 2),
];


export default function DoctorTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [ doctor, setDoctor ] = useState([]);
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

    const retrieveDoctor = () => {
        getAllDoctor()
            .then(response => {
                setDoctor(response.data.result);
            })
            .catch(e => {
                console.log(e);
            });
    }
    useEffect(() => {
        retrieveDoctor();
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
                        {doctor.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                                                            <DialogTitle id="form-dialog-title">Edit doctor</DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText>
                                                                    To edit doctor detail, please do some changes data here.
                                                                </DialogContentText>
                                                                <TextField
                                                                    autofocus
                                                                    margin="dense"
                                                                    id="fullName"
                                                                    onChange={handleChange}
                                                                    label="Full Name"
                                                                    type="text"
                                                                    fullWidth
                                                                />
                                                                <TextField
                                                                    autofocus
                                                                    margin="dense"
                                                                    id="email"
                                                                    onChange={handleChange}
                                                                    label="E-mail"
                                                                    type="text"
                                                                    fullWidth
                                                                />
                                                                <TextField
                                                                    autofocus
                                                                    margin="dense"
                                                                    id="sip"
                                                                    onChange={handleChange}
                                                                    label="SIP"
                                                                    type="text"
                                                                    fullWidth
                                                                />
                                                                <TextField
                                                                    autofocus
                                                                    margin="dense"
                                                                    id="category"
                                                                    onChange={handleChange}
                                                                    label="Category"
                                                                    type="text"
                                                                    fullWidth
                                                                />
                                                                <TextField
                                                                    autofocus
                                                                    margin="dense"
                                                                    id="practicePlace"
                                                                    onChange={handleChange}
                                                                    label="Practice Place"
                                                                    type="text"
                                                                    fullWidth
                                                                />
                                                                <TextField
                                                                    autofocus
                                                                    margin="dense"
                                                                    id="totalPatient"
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
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
