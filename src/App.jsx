import './App.css';
import { RouterProvider, createHashRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { Layout } from "./Component/Layout/Layout";
import Home from "./Component/Home/Home";
import Cart from "./Component/Cart/Cart";
import Login from "./Component/Login/Login";
import Product from "./Component/Product/Product";
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import Register from "./Component/Register/Register";
import NotFound from "./Component/NotFound/NotFound";
import Contact from './Component/Contact/Contact';
import Categories from './Component/Categories/Categories';
import Brands from './Component/Brands/Brands';
import { useContext, useEffect } from 'react';
import jwtDecode from "jwt-decode";
import { DataContextVar } from './Context/DataContext';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import { Offline } from "react-detect-offline";
import Toggle from './Component/Toggle/Toggle';
import { ThemeContextVar } from './Context/DarkModeContext';



function App() {

  const theme = useContext(ThemeContextVar);
  const darkMode = theme.state.darkMode;

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserData()
    }
  }, [])


  let { userData, setUserData } = useContext(DataContextVar)

  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  let routers = createHashRouter([
    {
      path: "/", element: <Layout userData={userData} />, children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "product", element: <Product /> },
        { path: "productDetails/:id", element: <ProductDetails /> },
        { path: "brands", element: <Brands /> },
        { path: "contact", element: <Contact /> },
        { path: "categories", element: <Categories /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "*", element: <NotFound /> },

      ]
    }
  ])

  return <>

    <div style={{
      backgroundColor: darkMode ? "#222" : "#fff"
    }}>

      <Toaster />
      <Toggle />
      <Offline>
        <div className="offline">
          "You Are Offline"
        </div>
      </Offline>

      <RouterProvider router={routers}></RouterProvider>

    </div>

  </>;
}

export default App;
