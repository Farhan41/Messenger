import React from 'react'
import Button from '@mui/material/Button';
import batman from '../assets/batman.png'
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'

const Block = () => {

    const db = getDatabase();
    let [blocklist, setBlocklist] = useState([]);
    let userInfo = useSelector((state)=>state.loggeduser.value);

    useEffect(()=>{
    const blockRef = ref(db, 'block');
    onValue(blockRef, (snapshot) => {
    let arr =[]
    snapshot.forEach(item=>{
   
    arr.push({...item.val(),bid:item.key})

    });
    setBlocklist(arr)  
    });
    },[])

    let handleUnblock = (item)=>{
      set(push(ref(db, 'friends')), {
        whosendname: item.blockbyname,
        whosendid: item.blockbyid,
        whorecievename: item.blockname,
        whoreceiveid: item.blockid
      }).then(()=>{
        
         remove(ref(db,'block/'+item.bid))
      })
    }

  return (
    <div className='box'>
        <h3>Block User List</h3>
        {blocklist.map(item=>(
             <div className='list'>
                 <img width="50" height="50" src={batman} />
                 <h4>{item.blockbyid == userInfo.uid ? item.blockname : item.blockbyname }</h4>
                 {item.blockbyid == userInfo.uid &&
                 <Button
                 onClick={()=>handleUnblock(item)}
                 variant="contained" color='error'>Unblock</Button>
                 }
             </div>
        ))}
    </div>
  )
}

export default Block