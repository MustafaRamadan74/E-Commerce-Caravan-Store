import React, { useContext } from 'react';
import { DataContextVar } from '../../Context/DataContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MutatingDots } from 'react-loader-spinner';
import { ThemeContextVar } from '../../Context/DarkModeContext';

export default function FeaturedProducts() {

    let { featuredProducts, addToCart, setnumOfCartItems, isLoading, searchValue } = useContext(DataContextVar);
    const theme = useContext(ThemeContextVar);
    const darkMode = theme.state.darkMode;


    async function addProduct(productId) {

        let response;
        if (localStorage.getItem("userToken") !== null) {
            response = await addToCart(productId);
            if (response.data.status === "success") {
                setnumOfCartItems(response.data.numOfCartItems)
                toast.success(response.data.message, { duration: 4000 })
            }
            else {
                toast.error(response.data.message, { duration: 4000 })
            }
        }
        else {
            toast.error("You Have To login First", { duration: 4000 })
        }


    };

    return <>

        <div className="my-5">
            <p style={{ color: darkMode ? "#EBD96B" : "#2F2F2F" }} className=' fw-bolder h4'>Popular Products : </p>
        </div>

        <div className="row gy-5">
            {isLoading ? <div className='loadingSpinner position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center'>
                <MutatingDots
                    height="100"
                    width="100"
                    color="#EBD96B"
                    secondaryColor='#00'
                    radius='12.5'
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div> :
                featuredProducts.map((product, index) => <div key={index} className=' col-md-2'>

                    {product.title.toLowerCase().includes(searchValue.toLowerCase()) === true ? <div className="featuredProduct cursor-pointer">
                        <div className="featuredProductCard py-2 px-3">
                            <Link className=' linkStyle' to={`/productDetails/${product._id}`}>
                                <img className='w-100 featuredProductImg rounded' src={product.imageCover} alt="product" />
                                <span style={{ color: darkMode ? "#EBD96B" : "#2F2F2F" }} className=''>{product.category.name}</span>
                                <h3 style={{ color: darkMode ? "#fff" : "#2F2F2F" }} className='h6 fw-bolder'>{product.title.split(" ").slice(0, 3).join(" ")}</h3>
                                <div style={{ color: darkMode ? "#fff" : "#2F2F2F" }} className="d-flex justify-content-between">
                                    <span className=''>{product.price} EGP</span>
                                    <span>
                                        <i className='fas fa-star rating-color text-warning'></i>
                                        {product.ratingsAverage}
                                    </span>
                                </div>
                            </Link>
                            <button style={{ color: darkMode ? "#EBD96B" : "#2F2F2F" }} onClick={() => addProduct(product._id)} className='btn  w-100'>
                                ADD TO CART
                                <i className="fa-solid fa-cart-shopping mx-2"></i>
                            </button>
                        </div>
                    </div>: "" }

                    
                </div>)}
        </div>

    </>
}
