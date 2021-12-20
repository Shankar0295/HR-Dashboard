import './App.css';
import Dashboard from './components/Dashboard/Dashboard'
import CreateUser from './components/CreateUser/CreateUser'
import Header from './components/Header/Header'
import Login from "./components/Login/Login";
import { Routes, Route } from 'react-router-dom';
import JsonData from './data.json';

function App() {

  localStorage.setItem("data", JSON.stringify(JsonData))
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/user" element={<CreateUser />}></Route>
      </Routes>
    </div>
  );
}

export default App;
