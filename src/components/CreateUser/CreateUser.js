import React, { useState, useEffect } from 'react';
import './CreateUser.css';
import { Link, useLocation } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

const CreateData = () => {
    const location = useLocation();


    const [name, setName] = useState('')
    const [empId, setEmpId] = useState('')
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState('')
    const [type, setType] = useState('')
    const [doj, setDoj] = useState('')
    const [data, setData] = useLocalStorage("data", [])
    const [edit, setEdit] = useState(false)
    const [editId, setEditId] = useState(null)
    const [editValue, setEditValue] = useState(true)// for loading values form navigate one time

    useEffect(() => {
        populateEditValues()// eslint-disable-next-line
    }, [])
    const populateEditValues = () => {
        if (location.state !== null && editValue) {
            setName(location.state.name)
            setEmpId(location.state.empId)
            setRole(location.state.role)
            setDoj(location.state.doj)
            setType(location.state.type)
            setEmail(location.state.email)
            setDob(location.state.dob)
            setEdit(true)
            setEditId(location.state.id)
            setEditValue(false)

        } else {
            setEdit(false)
        }
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        if (!name || !empId || !role || !email || !dob || !type || !doj) {
            alert("please fill all details to proceed")
        } else if (name && edit) {
            setData(data.map((item) => {
                if (item.id === editId) {
                    return { ...item, "dob": dob, "email": email, "empId": empId, "name": name, "role": role, "doj": doj, "type": type }
                }
                return item
            }))
            setEditId(null);
            setEdit(false);
            setName('')
            setEmpId('')
            setRole('')
            setEmail('')
            setDob('')
            setType('')
            setDoj('')
        }
        else {
            // onload
            setData([...data, { "id": new Date().getTime().toString(), "name": name, "empId": empId, "role": role, "email": email, "dob": dob, "doj": doj, "type": type }])
            console.log(data)
            setName('')
            setEmpId('')
            setRole('')
            setEmail('')
            setDob('')
            setType('')
            setDoj('')
        }
    }


    return (
        <div className="container">
            <div>
                <h1>Create Employee Details</h1>
                <Link to="/"><button>Go to Dashboard</button></Link>
            </div>
            <div className="input-container" >
                <form onSubmit={handleSumbit}>
                    <div className="input-field-wrapper">
                        <div className="input-fields">
                            <label htmlFor="name" className="input-text">Employee Name</label>
                            <input type="text" className="input-text" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                        </div>
                        <div className="input-fields">
                            <label htmlFor="empId" className="input-text">Employee Id</label>
                            <input type="text" className="input-text" name="empId" value={empId} onChange={(e) => setEmpId(e.target.value)}></input>
                        </div>
                        <div className="input-fields">
                            <label htmlFor="role" className="input-text">Designation</label>
                            <input type="text" className="input-text" name="role" value={role} onChange={(e) => setRole(e.target.value)}></input>
                        </div>
                        <div className="input-fields">
                            <label htmlFor="type" className="input-text">Employee Type</label>
                            <input type="text" className="input-text" name="type" value={type} onChange={(e) => setType(e.target.value)}></input>
                        </div>
                        <div className="input-fields">
                            <label htmlFor="doj" className="input-text">Date of Joining</label>
                            <input type="text" className="input-text" name="doj" value={doj} onChange={(e) => setDoj(e.target.value)}></input>
                        </div>
                        <div className="input-fields">
                            <label htmlFor="email" className="input-text">Email</label>
                            <input type="email" className="input-text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div className="input-fields">
                            <label htmlFor="dob" className="input-text">Date of Birth</label>
                            <input type="text" className="input-text" name="dob" value={dob} onChange={(e) => setDob(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="input-fields">
                        <button type="submit" className="create-btn">{edit ? 'Save Employee' : 'Add Employee'}</button>
                    </div>

                </form>
            </div>
            {/* <DataList props={data} batchdelete={batchdelete} editItem={editItem} deleteItem={deleteItem} handleOnChange={handleOnChange} deleteSelected={deleteSelected} checkedState={checkedState}></DataList> */}

        </div>
    )
}


export default CreateData