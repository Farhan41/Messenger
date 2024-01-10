import React from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Sidebar from './Sidebar';


const RouteLayout = () => {


  
  return (
    <>

    <Grid container spacing={4}>

    <Grid className='relative' item xs={2}>
    <Sidebar/>
    </Grid>

    <Grid item xs={10}>
    <Outlet/>
    </Grid>
    </Grid>


    </>
  )
}

export default RouteLayout