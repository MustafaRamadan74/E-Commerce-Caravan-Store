import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { DataContextVar } from '../../Context/DataContext';
import toast from 'react-hot-toast';
import { MutatingDots } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import { ThemeContextVar } from '../../Context/DarkModeContext';


export default function ProductDetails() {

  const theme = useContext(ThemeContextVar);
  const darkMode = theme.state.darkMode;

  let { addToCart, setnumOfCartItems } = useContext(DataContextVar);
  async function addProduct(productId) {
    if (localStorage.getItem("userToken") !== null) {
      let response = await addToCart(productId);
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
  }

  let { id } = useParams();

  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setisLoading] = useState(false)

  async function getProductDetails(id) {
    setisLoading(true)
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
    setProductDetails(data.data);
    setisLoading(false)
  }

  useEffect(() => {
    getProductDetails(id);
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };


  return <>

  <Helmet>
    <title>{productDetails.title}</title>
  </Helmet>

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
    </div>
      : <div className="row my-5 align-items-center justify-content-between">

        <div className="col-md-4">
          <Slider className='mb-5' {...settings}>
            {productDetails.images !== undefined ? productDetails.images.map((img) => <img key={productDetails.id} className='w-100 rounded ' src={img} alt='productDetailsImg' />) : ""}
          </Slider>
        </div>

        <div className="col-md-7">
          <div className="productDetails">
            <h2 className=' h3 mainColor fw-bold'>{productDetails.title}</h2>
            <p style={{ color: darkMode ? "#fff" : "#2F2F2F" }} className=' '>{productDetails.description}</p>
            <div className="d-flex justify-content-between">
              <span style={{ color: darkMode ? "#fff" : "#2F2F2F" }} className=''>{productDetails.price} EGP</span>
              <span style={{ color: darkMode ? "#fff" : "#2F2F2F" }}>
                <i className='fas fa-star rating-color text-warning'></i>
                {productDetails.ratingsAverage}
              </span>
            </div>
            <div className="btnContainer">
            <button onClick={() => addProduct(productDetails.id)} className='mainColorBG btn w-100'>
              ADD TO CART
              <i className="fa-solid fa-cart-shopping mx-2"></i>
            </button>
            </div>
          </div>
        </div >
      </div>}


  </>
}
