import React, { useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';


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

          <Grid item xs={4}>
          Farhan
          </Grid>

          <Grid item xs={4}>
          Farhan
          </Grid>

          <Grid item xs={4}>
          Farhan
          </Grid>

          </Grid>
    </>
   
  )
}

export default Home