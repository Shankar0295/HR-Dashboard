import React, { useState, useEffect } from 'react';
import './CreateUser.css';
import { Link, useLocation } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

const CreateData = () => {
    const location = useLocation();

    const initialvalues = { name: "", empId: "", role: "", email: "", dob: "", type: "", doj: "" }
    const [formValues, setFormValues] = useState(initialvalues)
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [data, setData] = useLocalStorage("data", [])
    const [edit, setEdit] = useState(false)
    const [editId, setEditId] = useState(null)
    const [editValue, setEditValue] = useState(true)// for loading values form navigate one time

    useEffect(() => {
        populateEditValues()// eslint-disable-next-line
    }, [])
    const populateEditValues = () => {
        if (location.state !== null && editValue) {
            setFormValues({ "dob": location.state.dob, "email": location.state.email, "empId": location.state.empId, "name": location.state.name, "role": location.state.role, "doj": location.state.doj, "type": location.state.type })
            setEdit(true)
            setEditId(location.state.id)
            setEditValue(false)

        } else {
            setEdit(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(typeof (e.target.value))
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        if (edit && Object.keys(formErrors).length === 0 && isSubmit) {
            setData(data.map((item) => {
                if (item.id === editId) {
                    return { ...item, "dob": formValues.dob, "email": formValues.email, "empId": +formValues.empId, "name": formValues.name, "role": formValues.role, "doj": formValues.doj, "type": formValues.type }
                }
                return item
            }))
            setEditId(null);
            setEdit(false);
        }
        else if (Object.keys(formErrors).length === 0 && isSubmit) {
            // onload
            setData([...data, { "id": new Date().getTime().toString(), "name": formValues.name, "empId": +formValues.empId, "role": formValues.role, "email": formValues.email, "dob": formValues.dob, "doj": formValues.doj, "type": formValues.type }])
            console.log(data)
        } else {
            alert("Fill all the fields to continue")
        }
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            setFormValues({ name: "", empId: "", role: "", email: "", dob: "", type: "", doj: "" })
            alert("Employee details submitted successfully")
        }// eslint-disable-next-line
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const empIdregex = /^\d+$/;
        const date = /^(0?[1-9]|1\d|2\d|3[01])\/(0?[1-9]|1[0-2])\/(19|20)\d{2}$/;
        const uniqueIds = data.find(item => item.empId === +formValues.empId)
        console.log(uniqueIds, "unique")

        if (!values.name) {
            errors.name = "Employee name is required"
        }
        if (!values.empId) {
            errors.empId = "Employee id is required"
        } else if (!empIdregex.test(values.empId)) {
            errors.empId = "Enter numbers only"
        } else if (uniqueIds !== undefined) {
            errors.empId = "employee id must be unique"
        }
        if (!values.role) {
            errors.role = "Employee role is required"
        }
        if (!values.type) {
            errors.type = "Employee type is required"
        }
        if (!values.email) {
            errors.email = "Email id is required"
        } else if (!emailregex.test(values.email)) {
            errors.email = "Invalid email id format"
        }
        if (!values.dob) {
            errors.dob = "DOB is required"
        } else if (!date.test(values.dob)) {
            errors.dob = "Only dd/mm/yyyy is allowed"
        }
        if (!values.doj) {
            errors.doj = "DOJ is required"
        } else if (!date.test(values.doj)) {
            errors.doj = "Only dd/mm/yyyy is allowed"
        }
        return errors;
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
                            <input type="text" className="input-text" name="name" placeholder="Enter name" value={formValues.name} onChange={handleChange}></input>
                        </div>
                        <p className="error-field">{formErrors.name}</p>
                        <div className="input-fields">
                            <label htmlFor="empId" className="input-text">Employee Id</label>
                            <input type="text" className="input-text" name="empId" placeholder="Enter id" value={formValues.empId} onChange={handleChange}></input>
                        </div>
                        <p className="error-field">{formErrors.empId}</p>
                        <div className="input-fields">
                            <label htmlFor="role" className="input-text">Designation</label>
                            <select className="input-text" name="role" value={formValues.role} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="Tester">Tester</option>
                                <option value="Developer">Developer</option>
                            </select>
                        </div>
                        <p className="error-field">{formErrors.role}</p>
                        <div className="input-fields">
                            <label htmlFor="type" className="input-text">Employee Type</label>
                            <select className="input-text" value={formValues.type} name="type" onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="Employee">Employee</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>
                        <p className="error-field">{formErrors.type}</p>
                        <div className="input-fields">
                            <label htmlFor="doj" className="input-text">Date of Joining</label>
                            <input type="text" className="input-text" name="doj" placeholder="dd/mm/yyyy" value={formValues.doj} onChange={handleChange}></input>
                        </div>
                        <p className="error-field">{formErrors.doj}</p>
                        <div className="input-fields">
                            <label htmlFor="email" className="input-text">Email</label>
                            <input type="text" className="input-text" name="email" placeholder="Enter email" value={formValues.email} onChange={handleChange}></input>
                        </div>
                        <p className="error-field">{formErrors.email}</p>
                        <div className="input-fields">
                            <label htmlFor="dob" className="input-text">Date of Birth</label>
                            <input type="text" className="input-text" name="dob" placeholder="dd/mm/yyyy" value={formValues.dob} onChange={handleChange}></input>
                        </div>
                        <p className="error-field">{formErrors.dob}</p>
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