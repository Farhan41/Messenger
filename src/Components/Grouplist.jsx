import React from 'react'
import Button from '@mui/material/Button';
import batman from '../assets/batman.png';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import {useSelector} from 'react-redux'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



const Grouplist = () => {

let userInfo = useSelector((state)=>state.loggeduser.value);

const [gname, setGname] = useState("");
const [gtag, setGtag] = useState("");
const [open, setOpen] = React.useState(false);

const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

let handleCreate =()=>{
    console.log(gname, gtag)
  }

  return (
    <div className='box'>
        <div className='flex justify-between items-center'>
        <h3>Grouplist</h3>
        <Button onClick={handleOpen} variant="contained" color='success'>Create Group</Button>
        </div>
        <div className='list'>
            <img width="50" height="50" src={batman} />
            <h4>Friends Reunion</h4>
            <Button variant="contained">Join</Button>
        </div>
        <div className='list'>
            <img width="50" height="50" src={batman} />
            <h4>Friends Reunion</h4>
            <Button variant="contained">Join</Button>
        </div>
        <div className='list'>
            <img width="50" height="50" src={batman} />
            <h4>Friends Reunion</h4>
            <Button variant="contained">Join</Button>
        </div>
        <div className='list'>
            <img width="50" height="50" src={batman} />
            <h4>Friends Reunion</h4>
            <Button variant="contained">Join</Button>
        </div>
        <div className='list'>
            <img width="50" height="50" src={batman} />
            <h4>Friends Reunion</h4>
            <Button variant="contained">Join</Button>
        </div>
        <div className='list'>
            <img width="50" height="50" src={batman} />
            <h4>Friends Reunion</h4>
            <Button variant="contained">Join</Button>
        </div>
        <div className='list'>
            <img width="50" height="50" src={batman} />
            <h4>Friends Reunion</h4>
            <Button variant="contained">Join</Button>
        </div>
        <div className='list'>
            <img width="50" height="50" src={batman} />
            <h4>Friends Reunion</h4>
            <Button variant="contained">Join</Button>
        </div>
        <div className='list'>
            <img width="50" height="50" src={batman} />
            <h4>Friends Reunion</h4>
            <Button variant="contained">Join</Button>
        </div>
        <div className='list'>
            <img width="50" height="50" src={batman} />
            <h4>Friends Reunion</h4>
            <Button variant="contained">Join</Button>
        </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="flex flex-col justify-center items-center" sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Group
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField  onChange={(e)=>setGname(e.target.value)} id="outlined-basic" label="Group name" variant="outlined" />
          <br />
          <br />
          <TextField onChange={(e)=>setGtag(e.target.value)} id="outlined-basic" label="Group tag" variant="outlined" />
          <br />
          <br />
          <div className='text-center'>
          <Button onClick={handleCreate} variant="contained">Create</Button>
          </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Grouplist