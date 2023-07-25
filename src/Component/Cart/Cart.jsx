import React, { useContext, useEffect, useState } from 'react';
import { DataContextVar } from '../../Context/DataContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { MutatingDots } from 'react-loader-spinner';

export default function Cart() {

  let { getUserCart, deleteProduct, updateQuantity, setnumOfCartItems } = useContext(DataContextVar);
  const [cartProducts, setcartProducts] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  async function displayCart() {
    setisLoading(true)
    let response = await getUserCart();
    if (response?.data?.status === "success") {
      setcartProducts(response.data.data);
    }
    setisLoading(false)
  };

  async function deleteItem(productId) {
    let response = await deleteProduct(productId);
    setcartProducts(response.data.data);
    if (response.data.status === "success") {
      setnumOfCartItems(response.data.numOfCartItems)
      toast.success("Deleted Successfully", { duration: 4000 })
    }
    else {
      toast.error("Can't Delete Item", { duration: 4000 })
    }
  };

  async function updateQProduct(productId, count) {
    let response = await updateQuantity(productId, count);
    setcartProducts(response.data.data);
    if (count === 0) {
      deleteItem(productId)
    }
    if (response.data.status === "success") {
      toast.success("Updated Successfully", { duration: 4000 })
    }
    else {
      toast.error("Can't Update Item", { duration: 4000 })
    }
  };

  useEffect(() => {
    displayCart()
  }, [])

  return <>

    <Helmet>
      <link rel="icon" href="../../images/shoppingCart.ico" />
      <title>Cart Details</title>
    </Helmet>

    {isLoading ? <div className='loadingSpinner position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center'>
      <MutatingDots
        height="100"
        width="100"
        color="#000"
        secondaryColor='#00'
        radius='12.5'
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div> : cartProducts !== null ? <div className='bg-dark rounded my-5 p-4'>
      <h2 className='h4'>Your Cart Items : </h2>
      <h3 className='h6'>Total Price : {cartProducts.totalCartPrice}</h3>
      {cartProducts.products.map((product) => <div key={product.product.id} className='row align-items-center border-bottom py-4 px-2'>
        <div className="col-md-1">
          <img className='w-100' src={product.product.imageCover} alt="product" />
        </div>
        <div className="col-md-11 d-flex justify-content-between">
          <div className="left">
            <h6>{product.product.title}</h6>
            <p>price : {product.price}</p>
            <button onClick={() => deleteItem(product.product.id)} className='btn mainColorBG d-flex align-items-center'><i className='me-2 fa-regular text-dark fa-trash-can'></i>Remove</button>
          </div>
          <div className="right d-flex align-items-center">
            <button onClick={() => updateQProduct(product.product.id, product.count + 1)} className='btn mainColorBG btn-sm  px-3'>+</button>
            <span className='mx-3'>{product.count}</span>
            <button onClick={() => updateQProduct(product.product.id, product.count - 1)} className='btn mainColorBG btn-sm  px-3'>-</button>
          </div>
        </div>
      </div>)}
    </div> : null}



  </>
}
