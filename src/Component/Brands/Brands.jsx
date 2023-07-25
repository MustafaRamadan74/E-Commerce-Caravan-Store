import React, { useContext, useEffect, useState } from 'react';
import { DataContextVar } from '../../Context/DataContext';
import { MutatingDots } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';


export default function Brands() {

  let { getAllBrands } = useContext(DataContextVar);
  const [Brands, setBrands] = useState()
  const [isLoading, setisLoading] = useState(false);

  async function getBrands() {
    setisLoading(true)
    let { data } = await getAllBrands();
    console.log(data.data);
    setisLoading(false);
    setBrands(data.data);
  }

  useEffect(() => {
    getBrands()
  }, [])


  return <>

    <Helmet>
      <title>Brands</title>
    </Helmet>

    <div className="row gy-5 my-5">
      <h2 className='h3 mainColor'>In Cooperation With : </h2>
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
        Brands?.map((brand, index) => <div key={index} className=' col-md-3'>
          <div className="featuredProduct ">
            <div className="featuredProductCard py-2 px-3">
              <img className='w-100 rounded' src={brand.image} alt="product" />
              <span className='mainColor'>{brand.name}</span>
            </div>
          </div>
        </div>)}
    </div>

  </>
}
