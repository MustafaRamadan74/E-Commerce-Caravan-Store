import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { DataContextVar } from '../../Context/DataContext';
import { MutatingDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { ThemeContextVar } from '../../Context/DarkModeContext';

export default function CategorySlider() {

    let { getCategorySlider } = useContext(DataContextVar);
    const theme = useContext(ThemeContextVar);
    const darkMode = theme.state.darkMode;

    const [CategorySlider, setCategorySlider] = useState([]);
    const [isLoading, setisLoading] = useState(false)

    async function getCatSlider() {
        setisLoading(true);
        let { data } = await getCategorySlider();
        setCategorySlider(data.data);
        setisLoading(false);
    }

    useEffect(() => {
        getCatSlider();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay:true,
        autoplaySpeed: 2000,
        arrows:false
    };


    return <>

        <div className="my-5 catSliderContainer">
            <div className=" mb-3">
                <p style={{ color: darkMode ? "#EBD96B" : "#2F2F2F" }} className=' fw-bolder h4'>Discover Categories : </p>
            </div>
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
            </div> : <Slider {...settings}>
                {CategorySlider.map((cat) => <div key={cat._id}>
                    <img className='w-100 catSlider' height={"250px"} src={cat.image} alt="categoryImg" />
                    <h2 className='h6 mainColor text-center my-2'>{cat.name}</h2>
                </div>)}
            </Slider>}

            <div className='seeAll mt-5 cursor-pointer w-25 ms-auto d-flex justify-content-end'>
                <Link to={"/categories"} className="linkStyle ">
                    <p style={{ color: darkMode ? "#EBD96B" : "#2F2F2F" }} className='seeAllLink cursor-pointer fw-bold'>See All Categories <i className='fa-solid fa-arrow-right'></i></p>
                </Link>
            </div>
        </div>

    </>
}
