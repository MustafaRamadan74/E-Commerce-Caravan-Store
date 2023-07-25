import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../images/caravan-logoE.png";

export default function Footer() {
  return <>

    <div className=' d-flex flex-column justify-content-center align-items-center mt-5'>
      <div className="upper mainColorBG w-100 d-flex flex-column justify-content-center align-items-center py-5">
        <h3 className='h4 fw-bolder'>Jion our community to get special offers</h3>
        <p>Type your email down below</p>
        <div className=" d-flex position-relative ">
          <input className=' form-control pe-5 py-2' type="text" placeholder='Add your email here' />
          <button className='btn blackColorBG mainColor sendMail position-absolute'>SEND</button>
        </div>
      </div>
      <div className="lower blackColorBG w-100 px-5 py-5">
        <div className="row">
          <div className="col-md-6">
            <img className='w-25' src={logo} alt="logo" />
            <p className=' my-4'>Complete your style with awesome clothes from us</p>
            <div className="socialMedia">
              <a className='linkStyle mx-2' rel='noreferrer' target='_blank' href='https://www.facebook.com/mustafa.afroto.9/'>
                <i className=' fa-2x mainColor fa-brands fa-facebook'></i>
              </a>
              <a className='linkStyle mx-2' rel='noreferrer' target='_blank' href='https://www.instagram.com/mustafa.r_74/'>
                <i className='fa-2x mainColor fa-brands fa-instagram'></i>
              </a>
              <a className='linkStyle mx-2' rel='noreferrer' target='_blank' href='https://www.linkedin.com/in/mustafa-ramadan-8a232315b/'>
                <i className='fa-2x mainColor fa-brands fa-linkedin'></i>
              </a>
              <a className='linkStyle mx-2' rel='noreferrer' target='_blank' href='#'>
                <i className='fa-2x mainColor fa-brands fa-youtube'></i>
              </a>




            </div>
          </div>
          <div className="col-md-2 d-flex flex-column">
            <p className=' mainColor'>Copmany</p>
            <Link to={"#"} className=' my-1 linkStyle'>About</Link>
            <Link to={"/contact"} className=' my-1 linkStyle'>Contact Us</Link>
            <Link to={"#"} className=' my-1 linkStyle'>Careers</Link>
            <Link to={"#"} className=' my-1 linkStyle'>Support</Link>
          </div>
          <div className="col-md-2 d-flex flex-column">
            <p className=' mainColor'>Quick Link</p>
            <Link to={"#"} className=' my-1 linkStyle'>Share Location</Link>
            <Link to={"#"} className=' my-1 linkStyle'>Orders Tracking</Link>
            <Link to={"#"} className=' my-1 linkStyle'>Size Guide</Link>
            <Link to={"#"} className=' my-1 linkStyle'>FAQs</Link>
          </div>
          <div className="col-md-2 d-flex flex-column">
            <p className=' mainColor'>Legal</p>
            <Link to={"#"} className=' my-1 linkStyle'>Terms & conditions</Link>
            <Link to={"#"} className=' my-1 linkStyle'>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  </>


}
