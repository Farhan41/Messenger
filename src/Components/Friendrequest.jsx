import React from 'react'
import Button from '@mui/material/Button';
import batman from '../assets/batman.png';
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
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
            if(item.val().whoreceiveid == userInfo.uid){
               arr.push({...item.val(),frid:item.key})
           }
        });
        setReqlist(arr)  
        console.log("test",reqlist)
});
    },[])

    let handleDelete = (item) =>{
        console.log(item.frid)
        remove(ref(db, 'friendrequest/'+item.frid))
    }

    let handleAccept =(item)=>{
        set(push(ref(db, 'friends/')), {
           ...item
          }).then(()=>{
            remove(ref(db, 'friendrequest/'+item.frid))
          })
    }
    
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
       <Button onClick={()=>handleAccept(item)} variant="contained">Accept</Button>
        <Button onClick={()=>handleDelete(item)} variant="contained" color="error">Delete</Button>
       </div>
    </div> 
    ))}  
</div>
  )
}

export default Friendrequest