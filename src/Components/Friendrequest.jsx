import React from 'react'
import Button from '@mui/material/Button';
import batman from '../assets/batman.png';
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'

const Friendrequest = () => {
    const db = getDatabase();
    let [reqlist, setReqlist] = useState([]);
    let userInfo = useSelector((state)=>state.loggeduser.value);
    console.log("redux", userInfo)

    useEffect(()=>{
        const friendrequestRef = ref(db, 'friendrequest');
        onValue(friendrequestRef, (snapshot) => {
            let arr =[]
        snapshot.forEach(item=>{
            // console.log('fire',item.val().whoreceiveid)
            // console.log('react',userInfo.uid)
            if(item.val().whoreceiveid == userInfo.uid){
               arr.push(item.val())
           }
        });
        setReqlist(arr)  
        console.log("test",reqlist)
});
    },[])
    console.log("test1",reqlist)
  return (
    <div className='box'>
    <h3>Friend Request</h3>
    {reqlist.map((item)=>(
        <div className='list'>
       <div className='list-left'>
       <img width="50" height="50" src={batman} />
        <h4 className='uppercase'>{item.whosendname}</h4>
       </div>
       <div className='list-right'>
       <Button variant="contained">Accept</Button>
        <Button variant="contained" color="error">Delete</Button>
       </div>
    </div> 
    ))}  
</div>
  )
}

export default Friendrequest