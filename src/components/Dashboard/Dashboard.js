import React, { useState } from 'react'
import Footer from '../Footer/Footer'
import useLocalStorage from '../../hooks/useLocalStorage';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate, Link } from "react-router-dom";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { red } from '@mui/material/colors';



import './Dashboard.css';
const Dashboard = () => {

    const [data, setData] = useLocalStorage("data", [])
    const [api, setAPi] = useState(true)
    // const [isAscending, setIsAscending] = useState(true)
    // const [isEmpId, setIsEmpId] = useState(true)
    // const [isJoined, setJoined] = useState(true)
    // const [isdob, setIsDob] = useState(true)
    const [selectedRows, setSelectedRows] = useState([])
    const navigate = useNavigate();

    if (api) {
        console.log(api)
        // localStorage.setItem("data", JSON.stringify(JsonData))
        const response = JSON.parse(localStorage.data)
        setData(response)
        console.log(data)
        setAPi(false)
    }

    const columns = [
        { field: 'name', headerName: 'Employee Name', width: 200 },
        { field: 'empId', headerName: 'Employee ID', width: 150 },
        { field: 'role', headerName: 'Designation', sortable: false, width: 150 },
        { field: 'type', headerName: 'Employee type', sortable: false, width: 150, },
        { field: 'doj', headerName: 'Date of joining', width: 150 },
        { field: 'email', headerName: 'Email', sortable: false, width: 200, },
        { field: 'dob', headerName: 'Date of birth', width: 150, },
        {
            field: "actions", type: 'actions', headerName: "Action", sortable: false, filterable: false, width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<DeleteOutlineOutlinedIcon sx={{ color: red[500] }} />}
                    label="Delete"
                    onClick={() => deleteItem(params.id)}
                />,
                <GridActionsCellItem
                    icon={<EditOutlinedIcon color="success" />}
                    label="Edit"
                    onClick={() => editItem(params.row.id, params.row.name, params.row.empId, params.row.role, params.row.email, params.row.dob, params.row.type, params.row.doj)}
                />,
            ]
        },
    ];

    const editItem = (id, name, empId, role, email, dob, type, doj) => {
        navigate('/user', { state: { id: id, name: name, empId: empId, role: role, email: email, dob: dob, type: type, doj: doj } });

    }

    const deleteItem = (id) => {
        setData(data.filter((item) => item.id !== id))
    }

    const handleBulkDelete = () => {
        setData((rows) => rows.filter((r) => !selectedRows.includes(r.id)));
    }


    // const sortArray = (e) => {
    //     const sortProperty = e.target.id;
    //     console.log(sortProperty)
    //     if (sortProperty === "name") {
    //         if (isAscending) {
    //             const sorted = data.sort((a, b) => (a[sortProperty] > b[sortProperty]) ? 1 : -1)
    //             setData(sorted)
    //             console.log(sorted, "top")
    //         } else {
    //             const sorted = data.sort((a, b) => (a[sortProperty] > b[sortProperty]) ? -1 : 1)
    //             setData(sorted)
    //             console.log(sorted, "bottom")
    //         }
    //         setIsAscending(!isAscending)
    //     }
    //     else if (sortProperty === "empId") {
    //         if (isEmpId) {
    //             const sortEmpid = data.sort((a, b) => (parseFloat(a[sortProperty] - b[sortProperty])))
    //             setData(sortEmpid)
    //             console.log(sortEmpid, "41")
    //         }
    //         else {
    //             const sortEmpid = data.sort((a, b) => (parseFloat(b[sortProperty] - a[sortProperty])))
    //             setData(sortEmpid)
    //             console.log(sortEmpid, "42")
    //         }
    //         setIsEmpId(!isEmpId)
    //     }
    //     else if (sortProperty === "doj") {
    //         if (isJoined) {
    //             const sortJoinDate = data.sort((a, b) => {
    //                 a = a[sortProperty].split("/").reverse().join("-")
    //                 b = b[sortProperty].split("/").reverse().join("-")
    //                 return a.localeCompare(b)
    //             })
    //             setData(sortJoinDate)
    //             console.log(sortJoinDate, "dojTop")
    //         } else {
    //             const sortJoinDate = data.sort((a, b) => {
    //                 a = a[sortProperty].split("/").reverse().join("-")
    //                 b = b[sortProperty].split("/").reverse().join("-")
    //                 return b.localeCompare(a)
    //             })
    //             setData(sortJoinDate)
    //             console.log(sortJoinDate, "dojbottom")
    //         }
    //         setJoined(!isJoined)
    //     }
    //     else if (sortProperty === "dob") {
    //         if (isdob) {
    //             const sortDOB = data.sort((a, b) => {
    //                 a = a[sortProperty].split("/").reverse().join("-")
    //                 b = b[sortProperty].split("/").reverse().join("-")
    //                 return a.localeCompare(b)
    //             })
    //             setData(sortDOB)
    //             console.log(sortDOB, "dobTOp")
    //         } else {
    //             const sortDOB = data.sort((a, b) => {
    //                 a = a[sortProperty].split("/").reverse().join("-")
    //                 b = b[sortProperty].split("/").reverse().join("-")
    //                 return b.localeCompare(a)
    //             })
    //             setData(sortDOB)
    //             console.log(sortDOB, "dobBottom")
    //         }
    //         setIsDob(!isdob)
    //     }
    // }

    return (
        <div className="container">
            <div className="button-container">
                <Link to="/user">
                    <Button variant="outlined" className="btn-m10 fw-600" startIcon={<AddCircleIcon />}>
                        Create Employee
                </Button>
                </Link>
                <div>
                    <Button variant="outlined" className="fw-600" startIcon={<DeleteIcon />} onClick={handleBulkDelete}>
                        Delete selected
                    </Button>
                </div>
            </div>
            <DataGrid autoHeight
                rows={data}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[15]}
                checkboxSelection
                disableSelectionOnClick
                disableColumnSelector
                onSelectionModelChange={setSelectedRows}
                selectionModel={selectedRows}
            />

            <Footer />
        </div>
    )
}
export default Dashboard