import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Alert from '@mui/material/Alert';

const Forgot = () => {

    const auth = getAuth();
    const navigate = useNavigate();
    let [email, setEmail] = useState("")
    // let [errorAlert, setErrorAlert] = useState(false)
    // let [errorMsg, setErrorMsg] = useState("")

    let handleChange =(e)=>{
        setEmail( e.target.name = e.target.value)
    }

    let handleForgot =()=>{
        
        sendPasswordResetEmail(auth, email).then(()=>{
        
            toast.success('Please verify Your Email!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            setTimeout(()=>{
                navigate("/login")
            },[1000])
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            if(errorMessage.includes("missing")){
                toast.error('Forget Error!', {
                    position: "bottom-left",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
            
          });
    }


  return (
    <div className='bg-orange-500 h-[100vh] flex justify-center items-center'>
        <div className=' flex flex-col gap-y-4 border-2 border-zinc-900 w-[500px] h-[500px] justify-center items-center'>
        <h1 className='font-bold'>Recover Your Password:</h1>
        <TextField name='email' onChange={handleChange} id="standard-basic" label="Email" variant="standard" />
        {/* { errorAlert && <Alert variant="filled" severity="error">{errorMsg}</Alert>} */}
        <Button onClick={handleForgot} variant="contained">Click Here</Button>
        </div>
    </div>
  )
}

export default Forgot