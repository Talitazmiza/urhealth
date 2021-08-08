import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllPatient} from "../../../actions/patients";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import HGraph, {calculateHealthScore, hGraphConvert} from "new-hgraph";
import CircularProgress from "@material-ui/core/CircularProgress";

const columns = [
    {
        id: 'name',
        label: 'Nama Pasien',
    }
];

function Content() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [graph, setGraph] = useState(0)
    const patients = useSelector((state) => state.patients);  // patients mengacu di reducers/indexjs
    const dispatch = useDispatch();
    const [isSelected, setisSelected] = useState(false);
    // When component mount, load your Offices data
    useEffect(() => {
        updateWindowDimensions();
        window.addEventListener('resize', updateWindowDimensions);
        // document.addEventListener('mousedown', handleClick);
        return function cleanup() {
            window.removeEventListener('resize', updateWindowDimensions);
            // document.removeEventListener('mousedown', handleClick);
        };

    });

    useEffect(() => {
        dispatch(getAllPatient());

    }, []);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const showGraph = (data) => {
        setGraph(data)
    }

    const convertDataSet = (data) => {
        // const newData = JSON.parse(data);
        return data.map(d => {
            const converted = hGraphConvert('male', d.metric, d);
            converted.id = d.metric;
            if (d.children) {
                converted.children = d.children.map(c => {
                    const convertedChild = hGraphConvert('male', c.metric, c);
                    convertedChild.parentKey = c.parentKey;
                    convertedChild.id = c.metric;
                    return convertedChild;
                });
            }
            return converted;
        });
    };


    const [windowWidth, setwindowWidth] = useState(window.innerWidth);


    const updateWindowDimensions = () => {
        setwindowWidth(window.innerWidth);
    };

    const handlePointClick = (data, event) => {
        // setHistoryOpen(true);
        // setHistoryData(data);
        // console.log(data);
        // console.log(event);
    };


    const sizeBasedOnWindow = ((windowWidth / 6) * 2);
    const size = sizeBasedOnWindow > 2000 ? 2000 : sizeBasedOnWindow;


    return (
        <div className="content-wrapper p-5">
            <div className="d-flex justify-content-between">
                <div>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                        >
                                            <b>{column.label}</b>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patients && patients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                return (
                                                    <TableCell key={column.id}>
                                                        <button className="btn btn-primary"
                                                                onClick={() =>
                                                                    page!=0 ? showGraph(index+(rowsPerPage*page)) : showGraph(index)
                                                                }>{`${row.firstName} ${row.lastName}`}</button>
                                                    </TableCell>
                                                );
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
                        count={patients.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
                <div>
                    <div>
                        {
                            !patients.length ? <CircularProgress /> : (
                                <>
                                    <h5 className="text-center">Nama Pasien : {patients[graph].firstName} {patients[graph].lastName}</h5>
                                        <HGraph
                                            data={convertDataSet(patients[graph].data_grafik.data_grafik)}
                                            score={parseInt(calculateHealthScore(convertDataSet(patients[graph].data_grafik.data_grafik),10))}
                                            width={size}
                                            height={size}
                                            fontSize={size < 300 ? 12 : 16}
                                            pointRadius={size < 300 ? 5 : 10}
                                            scoreFontSize={size < 300 ? 50 : 120}
                                            onPointClick={handlePointClick}
                                        />
                                </>

                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;
