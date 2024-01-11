import React from 'react'
import {useSelector} from 'react-redux'
import {AiFillHome, AiFillMessage} from 'react-icons/ai'
import { IoIosNotifications } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { loggeduser } from '../slices/userSlice';
import { useState } from 'react';
import { FaBars } from "react-icons/fa6";
import { GiCrossMark } from "react-icons/gi";




const Sidebar = () => {
  const auth = getAuth();
  let dispatch = useDispatch()
  const navigate = useNavigate();
  let userInfo = useSelector((state) => state.loggeduser.value)

  let handleLogout =()=>{
    signOut(auth).then(() => {
      dispatch(loggeduser(null))
      localStorage.removeItem("user")
      navigate("/login")
    })
  }

  let [url, setUrl] = useState("home");

  let [show, setShow] = useState(false);

  let handleClick = () => {
    if(!show){
      setShow(true)
    }else{
      setShow(false)
    }
  }

  return (
   
    <div className='relative'>
      <div onClick={handleClick} className='z-50 fixed top-5 left-3 w-[50px] h-[50px] bg-red-500 opacity-50 rounded-full block md:hidden pt-[17px] pl-[17px]'>
        {show
        ?
        <GiCrossMark className='text-white' />
        :
        <FaBars className='text-white'/>
      }
     
      </div>
     {show ?
     (
      
        <div className='sidebar  fixed top-0 left-2'>
      <img className='sidebarimg' src={userInfo.photoURL} />
      <h1>{userInfo.displayName}</h1>

      <ul>
        <li onClick={()=>setUrl("home")} className={url == "home" && "active"} >
          <Link to='/home'>
          <AiFillHome className='icon'/>
          </Link>
        </li>
        <li  onClick={()=>setUrl("messege")} className={url == "messege" && "active"}> 
          <Link to='/messege'>
          <AiFillMessage className='icon'/>
          </Link>
        </li>
        <li  onClick={()=>setUrl("notification")} className={url == "notification" && "active"}>
          <Link to='/notification'>
          <IoIosNotifications className='icon'/>
          </Link>
        </li>
        <li  onClick={()=>setUrl("settings")} className={url == "settings" && "active"}>
          <Link to='#'>
          <IoMdSettings className='icon'/>
          </Link>
        </li>
        <li  onClick={()=>setUrl("logout")} className={url == "logout" && "active"}>
        <Link to='#'>
          <IoLogOut  onClick={handleLogout} className='icon'/>
        </Link>  
        </li>
      </ul>
  </div>
     )
     :

     (
      <div className='sidebar hidden md:block fixed top-0 left-2'>
      <img className='sidebarimg' src={userInfo.photoURL} />
      <h1>{userInfo.displayName}</h1>

      <ul>
        <li onClick={()=>setUrl("home")} className={url == "home" && "active"} >
          <Link to='/home'>
          <AiFillHome className='icon'/>
          </Link>
        </li>
        <li  onClick={()=>setUrl("messege")} className={url == "messege" && "active"}> 
          <Link to='/messege'>
          <AiFillMessage className='icon'/>
          </Link>
        </li>
        <li  onClick={()=>setUrl("notification")} className={url == "notification" && "active"}>
          <Link to='/notification'>
          <IoIosNotifications className='icon'/>
          </Link>
        </li>
        <li  onClick={()=>setUrl("settings")} className={url == "settings" && "active"}>
          <Link to='#'>
          <IoMdSettings className='icon'/>
          </Link>
        </li>
        <li  onClick={()=>setUrl("logout")} className={url == "logout" && "active"}>
        <Link to='#'>
          <IoLogOut  onClick={handleLogout} className='icon'/>
        </Link>  
        </li>
      </ul>
  </div>
     )

     }
    </div>
  )
}

export default Sidebar