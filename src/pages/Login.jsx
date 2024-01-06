import React from 'react'
import one from '../assets/one.png'
import Image from '../Components/Image'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Alert from '@mui/material/Alert';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { loggeduser } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getDatabase, ref, set, push } from "firebase/database";

const Login = () => {

  const auth = getAuth();
  const db = getDatabase();
  const provider = new GoogleAuthProvider();
  let dispatch = useDispatch()
  const navigate = useNavigate();
  let [openPass, setOpenPass] = useState(true)

  let [errorEmail, setErrorEmail] = useState("")
  let [errorPass, setErrorPass] = useState("")

  let [formData, setFormData] = useState({
    email : "",
    password : ""
  })

  let data = useSelector(state => state.loggeduser.value)

  useEffect(()=>{
    if(data){
      navigate("/home")
    }
  },[])

  let handleChange =(e)=>{

    console.log(e.target)
    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

    console.log(formData)

    setErrorEmail("")
    setErrorPass("")
    
  }

  let handleLogin =()=>{

    if(!formData.email){
    setErrorEmail("Email Error")
    }

    if(!formData.password){
    setErrorPass("Password Error")
    }

    
    signInWithEmailAndPassword(auth, formData.email, formData.password).then((user)=>{
      console.log(user.user.emailVerified)
      // if(user.user.emailVerified){
        navigate("/home")
        dispatch(loggeduser(user.user))
        localStorage.setItem("user", JSON.stringify(user.user) )
      // }else{
      //   toast.error('To login please verfiy your email!', {
      //     position: "bottom-left",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,  
      //     progress: undefined,
      //     theme: "dark",
      //     });
      // }
    })
    
  }

  let handleGoogle =()=>{
    
    signInWithPopup(auth, provider).then((user)=>{
     
      navigate("/home")
      dispatch(loggeduser(user.user))
      localStorage.setItem("user", JSON.stringify(user.user) )

      set(push(ref(db, 'users')), {
        username: user.user.displayName,
        email: user.user.email ,
        profile_picture : user.user.photoURL
      });
    })
    
  }

  return (
    <div className='flex'>
        <div className='left w-[50%] h-[100vh] flex justify-center items-center'>  
        <div className='w-[80%] lg:max-w-[60%] flex flex-col gap-y-4'>
        <div className='text-center flex flex-col gap-y-2'> 
        <h2 className='text-2xl'>Get started with easily register</h2>
        <p className='text-[12px] lg:text-[14px]'>Free register and you can enjoy it</p>
        <div onClick={handleGoogle} className='border-2 rounded-full py-3 flex justify-center items-center gap-x-2 cursor-pointer'>
          <FcGoogle className='text-[40px]' />
          <p className='text-[12px] lg:text-[20px]'>Sign in with Google</p>
        </div>
        </div>
        <div className='flex flex-col gap-y-5'>
        
        <TextField onChange={handleChange} name='email' type="email" id="outlined-basic" label="Email" varient="outlined" value={formData.email} />
        {errorEmail && <Alert severity="error">{errorEmail}</Alert>}
        <div className='relative'>
        <TextField className='w-full' onChange={handleChange} name='password' type={openPass ? "password" : "text"} id="outlined-basic" label="Password" varient="outlined" value={formData.password} />
        {errorPass && <Alert className='mt-4' severity="error">{errorPass}</Alert>}
        {openPass ? <FaRegEyeSlash onClick={()=>setOpenPass(false)} className='absolute top-[19px] right-[12px]' /> : <FaRegEye onClick={()=>setOpenPass(true)} className='absolute top-[19px] right-[12px]' /> }
        </div>
        <Button onClick={handleLogin} variant="contained">Sign In</Button>
        <p>Don’t have an account ?<Link to="/"><span className='text-green-500 font-bold'> Sign Up </span></Link></p>
        <p>Forget Password ? <Link to="/forgot"><span className='text-blue-500 font-bold'> Click Here </span></Link></p>
        </div>
        </div>

        </div>
        <div className= 'w-[50%] h-[100vh]'>
            <Image className='w-full h-full object-cover' src={one}/>
        </div>
    </div>
  )
}

export default Login


// if(!formData.email){
//   setErrorEmail("Email Error")
// }

// if(!formData.password){
//   setErrorPass("Password Error")
// }

// setFormData({
//   email : "",
//   password : ""
// })