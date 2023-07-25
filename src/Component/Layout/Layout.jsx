import React, { useContext } from 'react';
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet, useNavigate } from 'react-router-dom';
import { DataContextVar } from '../../Context/DataContext';


export const Layout = () => {

  let { userData, setUserData } = useContext(DataContextVar)
  let navigate = useNavigate()
  function logout() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login")
  }

  return <>

    <div className="pt-5">
      <Navbar userData={userData} logout={logout}></Navbar>
      <div className="container">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  </>
}
