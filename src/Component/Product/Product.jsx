import React from 'react'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import { Helmet } from 'react-helmet'

export default function Product() {


  return <>

    <Helmet>
      <title>Products</title>
    </Helmet>

    <div className="my-5">
      <FeaturedProducts />
    </div>


  </>
}
