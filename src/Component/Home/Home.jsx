import React from 'react'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Helmet } from 'react-helmet'

export default function Home() {


  return <>

    <Helmet>
      <title>Home</title>
    </Helmet>

    <div className="my-5">
      <CategorySlider />
      <FeaturedProducts />
    </div>


  </>
}
