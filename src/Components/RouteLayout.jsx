import React from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Sidebar from './Sidebar';


const RouteLayout = () => {


  
  return (
    <>

    <Grid container spacing={4}>

    <Grid className='relative' item  md={2} xs={0}>
    <Sidebar/>
    </Grid>

    <Grid item  md={10} xs={12}>
    <Outlet/>
    </Grid>
    </Grid>


    </>
  )
}

export default RouteLayout