import React, { useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Grouplist from '../Components/Grouplist';
import Friendrequest from '../Components/Friendrequest';
import Friends from '../Components/Friends';
import Mygroup from '../Components/Mygroup';
import Userlist from '../Components/Userlist';
import Block from '../Components/Block';


const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  let data = useSelector(state => state.loggeduser.value)


  useEffect(()=>{
    if(!data){
      navigate("/login")
    }
  },[])

 

  return (
          <>
          <Grid container spacing={2}>

          <Grid item xs={12} sm={6} md={4}>
          <Grouplist/>
          <Friendrequest/>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
          <Friends/>
          <Mygroup/>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
          <Userlist/>
          <Block/>
          </Grid>

          </Grid>
    </>
   
  )
}

export default Home