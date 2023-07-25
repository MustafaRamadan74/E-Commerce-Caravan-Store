import React, { useContext } from 'react'
import { useRef, useState } from 'react'
import "./Contact.css"
import emailjs from '@emailjs/browser';
import { ThemeContextVar } from '../../Context/DarkModeContext';
import { Helmet } from 'react-helmet';

export default function Contact() {

  const formRef = useRef()
  const [done, setDone] = useState(false)

  const theme = useContext(ThemeContextVar)
  const darkMode = theme.state.darkMode

  function handleSubmit(e) {
    e.preventDefault()
    emailjs.sendForm('service_y9zeyy8', 'template_2f938zg', formRef.current, 'bPZnFPsWLnkqJGHXm')
      .then((result) => {
        console.log(result.text);
        setDone(true)
      }, (error) => {
        console.log(error.text);
      });
  }

  return <>

    <Helmet>
      <title>Contact Us</title>
    </Helmet>

    <div className="c">
      <div className="c-wrapper">
        <div className="c-left">
          <h1 className="title">Let's Get In Touch</h1>
          <div className="info">
            <div className="info-item">
              <i class="fa-solid fa-phone-volume fa-2x mainColor"></i>
              <div style={{ color: darkMode ? "#fff" : "#2F2F2F" }} className='h4'>+201557227144</div>
            </div>
            <a href='https://wa.me/+201015950011' target={"_blank"} rel={"noreferrer"} className="info-item">
              <i class="fa-brands fa-square-whatsapp fa-2x mainColor"></i>
              <div className='h4'>+201015950011</div>
            </a>
            <a href='mailto:mafroto74@gmail.com' target={"_blank"} rel={"noreferrer"} className="info-item">
              <i class="fa-solid fa-envelope fa-2x mainColor"></i>
              <div className='h4'>mafroto74@gmail.com</div>
            </a>
            <div className="info-item">
              <i class="fa-solid fa-location-dot fa-2x mainColor"></i>
              <div style={{ color: darkMode ? "#fff" : "#2F2F2F" }} className='h4'>Cairo, Egypt</div>
            </div>
          </div>
        </div>
        <div className="c-right">
          <p className="desc">
            <b>What's your story ?</b> Get in touch. Always available
          </p>
          <form ref={formRef} onSubmit={handleSubmit}>
            <input style={{ backgroundColor: "#EBD96B" }} className='form-control mb-4 ' type="text" placeholder='Your Name' name='user_name' />
            <input style={{ backgroundColor: "#EBD96B" }} className='form-control mb-4 ' type="text" placeholder='Subject' name='user_subject' />
            <input style={{ backgroundColor: "#EBD96B" }} className='form-control mb-4 ' type="Email" placeholder='Your Email' name='user_email' />
            <textarea style={{ backgroundColor: "#EBD96B" }} className='form-control mb-4 ' name="message" rows="5" placeholder='Your Message'></textarea>
            <div className="text-center">
              <button className='btn mainColorBG px-5 py-2' >Submit</button>
            </div>
            <div style={{ color: darkMode ? "#fff" : "#2F2F2F" }} >
              {done && "Thank you for connecting ....."}
            </div>
          </form>
        </div>

      </div>

    </div>



  </>
}
