import React, {useState} from 'react';
import PatientTabel from './PatientTabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const currencies = [
    {
        value: 'A',
        label: 'A',
    },
    {
        value: 'O',
        label: 'O',
    },
    {
        value: 'B',
        label: 'B',
    },
    {
        value: 'AB',
        label: 'AB',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function Tabel() {
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

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Patients</h1>
                        </div>
                        <div className="col-sm-6">
                            <button onClick={handleClickOpen} className="dbtn-dark float-sm-right">Create</button>
                            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Add patient</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        To add patient detail, please fill data here.
                                    </DialogContentText>
                                        <TextField
                                            autofocus
                                            margin="dense"
                                            id="first name"
                                            label="first name"
                                            type="text"
                                            fullWidth
                                        />
                                        <TextField
                                            autofocus
                                            margin="dense"
                                            id="last name"
                                            label="last name"
                                            type="text"
                                            fullWidth
                                        />
                                        <TextField
                                            id="filled-select-currency"
                                            fullWidth
                                            select
                                            label="select"
                                            value={currency}
                                            onChange={handleChange}
                                            helperText="Please select your goldar"
                                        >
                                            {currencies.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            autofocus
                                            margin="dense"
                                            id="tinggi badan"
                                            label="tinggi badan"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            type="number"
                                            fullWidth
                                        />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="danger">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleClose} color="primary">
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
