import React, { useState } from 'react'
// import JsonData from '../../data.json';
import useLocalStorage from '../../hooks/useLocalStorage';
import { FaEdit, FaTrash, FaSort } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import './Dashboard.css';
const Dashboard = () => {

    const [data, setData] = useLocalStorage("data", [])
    const [api, setAPi] = useState(true)
    const [isAscending, setIsAscending] = useState(true)
    const [isEmpId, setIsEmpId] = useState(true)
    const [isJoined, setJoined] = useState(true)
    const [isdob, setIsDob] = useState(true)


    const navigate = useNavigate();
    if (api) {
        console.log(api)
        // localStorage.setItem("data", JSON.stringify(JsonData))
        const response = JSON.parse(localStorage.data)
        setData(response)
        console.log(data)
        setAPi(false)
    }

    const editItem = (id, name, empId, role, email, dob, type, doj) => {
        navigate('/user', { state: { id: id, name: name, empId: empId, role: role, email: email, dob: dob, type: type, doj: doj } });

    }

    const deleteItem = (id) => {
        setData(data.filter((item) => item.id !== id))
    }

    const sortArray = (e) => {
        console.log(e.target.id)
        const sortProperty = e.target.id;
        console.log(sortProperty)
        if (isAscending) {
            const sorted = data.sort((a, b) => (a[sortProperty] > b[sortProperty]) ? 1 : -1)
            setData(sorted)
            console.log(sorted, "top")
        } else {
            const sorted = data.sort((a, b) => (a[sortProperty] > b[sortProperty]) ? -1 : 1)
            setData(sorted)
            console.log(sorted, "bottom")
        }

        setIsAscending(!isAscending)
    }

    const sortById = (e) => {
        const sortId = e.target.id
        console.log(sortId)
        if (isEmpId) {
            const sortEmpid = data.sort((a, b) => (parseFloat(a[sortId] - b[sortId])))
            setData(sortEmpid)
            console.log(sortEmpid, "41")
        }
        else {
            const sortEmpid = data.sort((a, b) => (parseFloat(b[sortId] - a[sortId])))
            setData(sortEmpid)
            console.log(sortEmpid, "42")
        }
        setIsEmpId(!isEmpId)
    }

    const sortByDoj = (e) => {
        const sortDoj = e.target.id
        if (isJoined) {
            const sortJoinDate = data.sort((a, b) => {
                a = a[sortDoj].split("/").reverse().join("-")
                b = b[sortDoj].split("/").reverse().join("-")
                return a.localeCompare(b)
            })
            setData(sortJoinDate)
            console.log(sortJoinDate, "dojTop")
        } else {
            const sortJoinDate = data.sort((a, b) => {
                a = a[sortDoj].split("/").reverse().join("-")
                b = b[sortDoj].split("/").reverse().join("-")
                return b.localeCompare(a)
            })
            setData(sortJoinDate)
            console.log(sortJoinDate, "dojbottom")
        }
        setJoined(!isJoined)
    }

    const sortByDob = (e) => {
        const sortDob = e.target.id
        if (isdob) {
            const sortDOB = data.sort((a, b) => {
                a = a[sortDob].split("/").reverse().join("-")
                b = b[sortDob].split("/").reverse().join("-")
                return a.localeCompare(b)
            })
            setData(sortDOB)
            console.log(sortDOB, "dobTOp")
        } else {
            const sortDOB = data.sort((a, b) => {
                a = a[sortDob].split("/").reverse().join("-")
                b = b[sortDob].split("/").reverse().join("-")
                return b.localeCompare(a)
            })
            setData(sortDOB)
            console.log(sortDOB, "dobBottom")
        }
        setIsDob(!isdob)
    }

    return (
        <div className="container">
            <Link to="/user"><button>Create Employee</button></Link>
            <ul className="responsive-table">
                <li className="table-header">
                    <div className="col col-1"></div>
                    <div className="col col-2">Employee Name <button id="name" value="name" name="name" onClick={(e) => sortArray(e)}><FaSort id="name" /></button></div>
                    <div className="col col-3">Employee Id<button id="empId" value="empId" name="empId" onClick={(e) => sortById(e)}><FaSort id="empId" /></button></div>
                    <div className="col col-4">Designation</div>
                    <div className="col col-5">Employee Type</div>
                    <div className="col col-6">Date of Joining<button id="doj" value="doj" name="doj" onClick={(e) => sortByDoj(e)}><FaSort id="doj" /></button></div>
                    <div className="col col-7">Email</div>
                    <div className="col col-8">DOB <button id="dob" value="dob" name="dob" onClick={(e) => sortByDob(e)}><FaSort id="dob" /></button></div>
                    <div className="col col-9">Edit</div>
                    <div className="col col-10">Delete</div>
                </li>
                {data.length > 0 ?
                    data.map(({ id, name, empId, role, email, dob, type, doj }) => {
                        return (
                            <li className="table-row" key={id}>
                                <div className="col col-1" data-label="select">
                                    <input type="checkbox"
                                    />
                                </div>
                                <div className="col col-2 data-text" data-label="Name">{name}</div>
                                <div className="col col-3 data-text" data-label="Id">{empId}</div>
                                <div className="col col-4 data-text" data-label="role">{role}</div>
                                <div className="col col-5 data-text" data-label="type">{type}</div>
                                <div className="col col-6 data-text" data-label="doj">{doj}</div>
                                <div className="col col-7" data-label="email">{email}</div>
                                <div className="col col-8 data-text" data-label="dob">{dob}</div>
                                <div className="col col-9 data-text" data-label="edit"> <FaEdit className="edit" onClick={() => editItem(id, name, empId, role, email, dob, type, doj)} /></div>
                                <div className="col col-10 data-text" data-label="delete"> <FaTrash className="delete" onClick={() => deleteItem(id)} /></div>
                            </li>
                        )
                    })
                    : <p>No item(s) to show</p>}

            </ul>
            <div>
                <button className="delete-btn">Delete Selected</button>
            </div>
        </div>
    )
}
export default Dashboard