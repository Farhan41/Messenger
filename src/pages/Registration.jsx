import React from 'react'
import one from '../assets/one.png'
import Image from '../Components/Image'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
// import Login from './Login';


const Registration = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const db = getDatabase();
  let data = useSelector(state => state.loggeduser.value)

  useEffect(()=>{
    if(data){
      navigate('/home')
    }
  },[])
  

  let [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  })

  let [errorFull, setErrorFull] = useState("")
  let [errorEmail, setErrorEmail] = useState("")
  let [errorPass, setErrorPass] = useState("")
  let [load, setLoad] = useState(true)

  let [openPass, setOpenPass] = useState(true)

  let handleRegistration =(e)=> {

  
   if(!formData.fullname){
    setErrorFull("Full Name is Required!")
   }

   if(!formData.email){
    setErrorEmail("Email is Required!")
   }

   if(!formData.password){
    setErrorPass("Password is Required!")
   }

   
   
   if(formData.fullname && formData.email && formData.password){

    setLoad(false)

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
    .then((user)=>{
      updateProfile(auth.currentUser, {
        displayName: formData.fullname,
        photoURL: "https://firebasestorage.googleapis.com/v0/b/messenger-7ee84.appspot.com/o/avatar.jpg?alt=media&token=4f37203e-67c6-41bc-8938-b2cf23424d21"
      })
      .then(()=>{
        sendEmailVerification(auth.currentUser)
        .then(()=>{
          setFormData({
            fullname: "",
            email: "",
            password: ""
           })
           
           setLoad(true)
           toast("Please verify your email..");
            setTimeout(()=>{
            navigate("/login")
            },[5000])
  
        })
          .then(()=>{

            console.log(user.user.uid)
            set(ref(db, "users"+ user.user.uid), {
            username: formData.fullname,
            email: formData.email,
            profile_picture :"https://firebasestorage.googleapis.com/v0/b/messenger-7ee84.appspot.com/o/avatar.jpg?alt=media&token=4f37203e-67c6-41bc-8938-b2cf23424d21"
          });

        })
      })
      
      
    })
    
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;  
      if(errorCode.includes("email") ){
        setErrorEmail("Invalid Email or Email Alread Exist!")
      }

      if(errorMessage.includes("password") ){
        setErrorPass("Weak Password!")
      }

      setLoad(true)

    });

    

   }

  }

  let handleChange =(e)=>{
 
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    if(e.target.name === "fullname" ){
      setErrorFull("")
    }

    if(e.target.name === "email" ){
      setErrorEmail("")
    }

    if(e.target.name === "password" ){
      setErrorPass("")
    }

  }



  return (
    <div className='flex'>
        <div className='left w-[50%] h-[100vh] flex justify-center items-center'>  
        <div className='w-[80%] lg:max-w-[60%] flex flex-col gap-y-4'>
        <div className='text-center flex flex-col gap-y-2'>
        <h2 className='text-2xl'>Get started with easily register</h2>
        <p className='text-[12px] lg:text-[14px]'>Free register and you can enjoy it</p>
        </div>
        <div className='flex flex-col gap-y-5'>
        <TextField onChange={handleChange} name='fullname' type="text" id="outlined-basic" label="Full Name" varient="outlined" value={formData.fullname} />
        {errorFull && <Alert severity="error">{errorFull}</Alert>}
        <TextField onChange={handleChange} name='email' type="eamil" id="outlined-basic" label="Email" varient="outlined" value={formData.email} />
        {errorEmail && <Alert severity="error">{errorEmail}</Alert>}
        <div className='relative'>
        <TextField className='w-full' onChange={handleChange} name='password' type={openPass ? "password" : "text"} id="outlined-basic" label="Password" varient="outlined" value={formData.password} />
        {openPass ? < FaRegEyeSlash onClick={()=>setOpenPass(false)} className='absolute top-[19px] right-[12px]' /> : <FaRegEye  onClick={()=>setOpenPass(true)} className='absolute top-[19px] right-[12px]' /> }
        {errorPass && <Alert className='mt-4' severity="error">{errorPass}</Alert>}
        </div>
       
        {load
         ?
         <Button onClick={handleRegistration} variant="contained">Sign Up</Button>
         :
         <Button onClick={handleRegistration} variant="contained" disabled >
          <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={true}
          />
         </Button>
         }
        
       

        <p>Already  have an account ? <Link to="/login"><span className='text-red-500 font-bold'>Sign In</span></Link> </p>
        </div>
        </div>

        </div>
        <div className= 'w-[50%] h-[100vh]'>
            <Image className='w-full h-full object-cover' src={one}/>
        </div>
    </div>
  )
}

export default Registration


 // let regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    // var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    // if(formData.fullname.length < 4){
    //   setErrorFull("Must be more than 3 charecters!")
    // }

    // if(!regex.test(formData.email)){
    //   setErrorEmail("Email is Invalid!")
    // }

    // if(!re.test(formData.password)){
    //   setErrorPass("Password is not strong enough!")
    // }