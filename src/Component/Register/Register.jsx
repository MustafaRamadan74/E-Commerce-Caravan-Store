
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useFormik } from 'formik';
import * as yup from "yup";
import { useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';


export default function Register() {

  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [messageError, setmessageError] = useState("")

  let validation = yup.object({
    name: yup.string().required("name is required"),
    email: yup.string().required("email is required").email("invalid email"),
    password: yup.string().required("password is required").matches(/^(?=.*[A-Z])[A-Za-z\d.@#$%^&+=!_]{7,15}$/, "must start with uppercase letter & the length 8~16"),
    rePassword: yup.string().required("required").oneOf([yup.ref("password")], "doesn't match"),
    phone: yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/, "invalid phone number"),
  });

  async function sendRegisterData(values) {
    setisLoading(true)
    let { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`, values).catch((errr) => {
      setisLoading(false)
      setmessageError(`${errr.response.data.message}`)
    })
    console.log(data)
    if (data.message === "success") {
      setisLoading(false)
      navigate("/login")
    }
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: ""
    },
    validationSchema: validation,
    onSubmit: sendRegisterData
  })



  return <>

    <Helmet>
      <title>Register</title>
    </Helmet>

    <div className="registerForm m-auto my-5 p-3 rounded-3 shadow-lg mainColorBG">

      {messageError.length > 0 ? <div className='alert alert-warning'>{messageError}</div> : null}

      <form onSubmit={formik.handleSubmit}>

        <label className='text-dark' htmlFor="name">Name : </label>
        <input onBlur={formik.handleBlur} className=' form-control text-light my-3 bg-dark' name='name' id='name' type="text" value={formik.values.name} onChange={formik.handleChange} />
        {formik.errors.name && formik.touched.name ? <div className='alert alert-warning '>{formik.errors.name}</div> : ""}

        <label className='text-dark' htmlFor="email">Email : </label>
        <input onBlur={formik.handleBlur} className=' form-control text-light my-3 bg-dark' name='email' id='email' type="email" value={formik.values.email} onChange={formik.handleChange} />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-warning '>{formik.errors.email}</div> : ""}

        <label className='text-dark' htmlFor="password">Password : </label>
        <input onBlur={formik.handleBlur} className=' form-control text-light my-3 bg-dark' name='password' id='password' type="password" value={formik.values.password} onChange={formik.handleChange} />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-warning '>{formik.errors.password}</div> : ""}

        <label className='text-dark' htmlFor="rePassword">RePassword : </label>
        <input onBlur={formik.handleBlur} className=' form-control text-light my-3 bg-dark' name='rePassword' id='rePassword' type="password" value={formik.values.rePassword} onChange={formik.handleChange} />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-warning '>{formik.errors.rePassword}</div> : ""}

        <label className='text-dark' htmlFor="phone">Phone : </label>
        <input onBlur={formik.handleBlur} className=' form-control text-light my-3 bg-dark' name='phone' id='phone' type="tel" value={formik.values.phone} onChange={formik.handleChange} />
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-warning '>{formik.errors.phone}</div> : ""}

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
        </div> : <button type='submit' className='btn blackColorBG mainColor mt-4'>Register</button>}


      </form>
    </div>


  </>
}
