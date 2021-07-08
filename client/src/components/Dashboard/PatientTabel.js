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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { getPatients } from "../../api";

const columns = [
    { id: 'firstName', label: 'First name', align: 'center', minWidth: 150 },
    { id: 'lastName', label: 'Last name', align: 'center', minWidth: 100 },
    {
        id: 'goldar',
        label: 'Blood type',
        minWidth: 150,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'tinggi_badan',
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
        render() {
            return (
                <tr>
                    <td>Name data</td>
                    <td>Username data</td>
                    <td>
                        <button className="button muted-button">Edit</button>
                        <button className="button muted-button">Delete</button>
                    </td>
                </tr>
            );
        },
    },
];

function createData(firstname, lastname, bloodtype, height, email, actions) {
    return { firstname, lastname, bloodtype, height, email, actions };
}

const rows = [
    createData('Diana', 'Fitri', 'A', 160),
    createData('Aditya', 'Junianto', 'O', 160),
    createData('Talita', 'Nurazmi', 'B', 160),
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [ patient, setPatient ] = useState([]);
    const retrievePatient = () => {
        getPatients()
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
                                                        <i className="far fa-edit mr-2" />
                                                        <i className="fas fa-trash mr-2" />
                                                    </div>
                                                </TableCell>
                                            );
                                        }
                                        // const value = row[column.id];
                                        // return (
                                        //     <TableCell key={column.id} align={column.align}>
                                        //         {column.format && typeof value === 'number' ? column.format(value) : value}
                                        //     </TableCell>
                                        // );
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
