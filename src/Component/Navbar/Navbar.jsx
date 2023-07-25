import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContextVar } from '../../Context/DataContext'
import logo from "../../images/caravan-logoE.png";


export const Navbar = ({ userData, logout }) => {

  let { numOfCartItems, getSearchValue } = useContext(DataContextVar);


  return <>

    <nav className="navbar navbar-expand-lg blackColorBG fixed-top ">
      <div className="container-fluid ">

        <div className=" navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">

          <div className="row w-100 align-items-center">


            <div className="col-md-5  ">
              <ul className="navbar-nav mb-2 mb-lg-0 navUL">
                <li className="nav-item ">
                  <Link className="nav-link mainColor active" aria-current="page" to={"/"}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mainColor" to={"categories"}>Categories</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mainColor" to={"brands"}>Brands</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mainColor" to={"product"}>Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mainColor" to={"contact"}>Contact Us</Link>
                </li>
              </ul>
            </div>


            <div className="col-md-2 ">
              <div className="divlogo  ">
                <Link className="navbar-brand d-flex justify-content-center" to={"/"}><img className=' w-100' src={logo} alt='logo' /></Link>
              </div>
            </div>


            <div className="col-md-5 ">
              <div className='navRight d-flex justify-content-end'>
                <Link to={"cart"} className="navCart nav-link mainColor mx-2 position-relative">
                  <i className="fa-solid fa-cart-shopping fa-2x mainColor"></i>
                  <i className='badge position-absolute mainColor bg-danger'>{numOfCartItems}</i>
                </Link>
                <input onChange={getSearchValue} className="form-control navSearch mx-2 w-50" type="search" placeholder="Type To Filter" aria-label="Search" />
                {!userData ? <ul className="navbar-nav RegLog mb-2 mb-lg-0 ">
                  <li className="nav-item">
                    <Link className="nav-link regLogMar mainColor " aria-current="page" to={"register"}>Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link regLogMar mainColor" to={"login"}>Login</Link>
                  </li>
                </ul> : <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item">
                    <span onClick={logout} className="nav-link regLogMar mainColor cursor-pointer">Logout</span>
                  </li>
                </ul>}
              </div>
            </div>


          </div>










        </div>
      </div>
    </nav>


  </>
}
