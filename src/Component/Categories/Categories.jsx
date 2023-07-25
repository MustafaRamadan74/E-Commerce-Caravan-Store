import React, { useContext, useEffect, useState } from 'react';
import { DataContextVar } from '../../Context/DataContext';
import { MutatingDots } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import { ThemeContextVar } from '../../Context/DarkModeContext';


export default function Categories() {

  let { getCategorySlider } = useContext(DataContextVar);
  const theme = useContext(ThemeContextVar);
  const darkMode = theme.state.darkMode;

  const [categories, setCategories] = useState()
  const [isLoading, setisLoading] = useState(false);

  async function getCategories() {
    setisLoading(true)
    let { data } = await getCategorySlider();
    console.log(data.data);
    setisLoading(false);
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories()
  }, [])


  return <>

    <Helmet>
      <title>Categories</title>
    </Helmet>

    <div className="row gy-5 my-5">
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
        categories?.map((cat, index) => <div key={index} className=' col-md-3'>
          <div className="featuredProduct ">
            <div className="featuredProductCard py-2 px-3">
              <img className='w-100 featuredCategory featuredProductImg rounded' src={cat.image} alt="product" />
              <span style={{ color: darkMode ? "#EBD96B" : "#2F2F2F" }} className=''>{cat.name}</span>
            </div>
          </div>
        </div>)}
    </div>

  </>
}
