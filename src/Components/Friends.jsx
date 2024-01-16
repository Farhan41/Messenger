import React from 'react'
import Button from '@mui/material/Button';
import batman from '../assets/batman.png'
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'


const Friends = () => {

    const db = getDatabase();
    let [reqlist, setReqlist] = useState([]);
    let [friendList, setFriendList] = useState([]);
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
    });
    },[])

    useEffect(()=>{
    const friendRef = ref(db, 'friends');
    onValue(friendRef, (snapshot) => {
    let arr =[]
    snapshot.forEach(item=>{
    
    arr.push({...item.val(),fid:item.key})
  
    });
    setFriendList(arr)  
    });
    },[])

    let handleBlock = (item)=>{
      if(userInfo.uid == item.whosendid){
        set(push(ref(db, 'block')), {
          blockid: item.whoreceiveid,
          blockname: item.whorecievename,
          blockbyid: item.whosendid,
          blockbyname: item.whosendname
        }).then(()=>{
          remove(ref(db,'friends/'+item.fid))
        });
      }
      
      else{
        set(push(ref(db, 'block')), {
          blockid: item.whosendid,  
          blockname: item.whosendname,
          blockbyid: item.whoreceiveid,
          blockbyname: item.whorecievename
        }).then(()=>{
          remove(ref(db,'friends/'+item.fid))
        });
      }
      
    }

  return (
    <div className='box'>
    <h3>Friends</h3>
    {reqlist.map(item=>(
         <div className='list'>
         <img width="50" height="50" src={batman} />
         <h4>{item.whosendid == userInfo.uid ? item.whorecievename : item.whosendname}</h4>
         <Button
         onClick={()=>handleBlock(item)}
         variant="contained"
          color='error'
          >
            Block
         </Button>
        </div>  
    ))}
</div>
  )
}

export default Friends