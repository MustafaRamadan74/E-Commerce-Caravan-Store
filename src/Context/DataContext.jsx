import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';



export let DataContextVar = createContext(0);

function DataContext(props) {



    const [userData, setUserData] = useState(null);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [numOfCartItems, setnumOfCartItems] = useState(0);
    const [isLoading, setisLoading] = useState(false);

    async function getCategorySlider() {
        return await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
    }

    async function getAllBrands() {
        return await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`)
    }

    async function getFeaturedProducts() {
        setisLoading(true);
        let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`)
        setFeaturedProducts(data.data);
        setisLoading(false)
    };

    let headers = {
        token: localStorage.getItem("userToken")
    }
    function addToCart(productId) {
        return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`,
            {
                productId: productId
            },
            {
                headers: headers
            }).then((response) => response).catch((error) => error)

    }

    function getUserCart() {
        return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`,
            {
                headers: headers
            }).then((response) => response).catch((error) => error)
    }

    async function getNumOfCartItems() {
        let response = await getUserCart();
        if (response?.data?.status === "success") {
            setnumOfCartItems(response.data.numOfCartItems)
        }
    }

    function deleteProduct(productId) {
        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
            {
                headers: headers
            }).then((response) => response).catch((error) => error)
    }

    function updateQuantity(productId, count) {
        return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
            {
                count: count
            },
            {
                headers: headers
            }).then((response) => response).catch((error) => error)
    }


    useEffect(() => {
        getFeaturedProducts();
        getNumOfCartItems();
    }, []);

    const [searchValue, setsearchValue] = useState("");

    function getSearchValue(e) {
        setsearchValue(e.target.value);
    }


    return <>

        <DataContextVar.Provider value={
            {
                userData,
                setUserData,
                getCategorySlider,
                featuredProducts,
                addToCart,
                getUserCart,
                deleteProduct,
                updateQuantity,
                numOfCartItems,
                setnumOfCartItems,
                isLoading,
                getAllBrands,
                getSearchValue,
                searchValue,
            }
        }>
            {props.children}
        </DataContextVar.Provider>

    </>
}

export default DataContext