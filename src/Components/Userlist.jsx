import React from 'react'
import Button from '@mui/material/Button';
import batman from '../assets/batman.png';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'

const Userlist = () => {

  const db = getDatabase();
  let [userslist, setUserslist] = useState([]);
  let userInfo = useSelector((state)=>state.loggeduser.value);
  

  useEffect(()=>{
    const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{
        if(userInfo.uid != item.key){
          arr.push({...item.val(),userid:item.key})
        }
       
      })
      setUserslist(arr)
      console.log(userslist)
    });
  },[])

  

  let handleFriendRequest = (info) => {
   set(push(ref(db, 'friendrequest')), {
    whosendname: userInfo.displayName,
    whosendid: userInfo.uid,
    whorecievename: info.username,
    whoreceiveid: info.userid
  });
  };

  

  return (
    <div className='box'>
    <h3>User List</h3>
   {userslist.map(item=>(
    
     <div className='list'>
     <img width="50" height="50" src={batman} />
     <h4 className='uppercase'>{item.username}</h4>
     {/* <p>{userInfo.uid}</p> */}
     <Button onClick={() => handleFriendRequest(item)} variant="contained">+</Button>
    </div>

   ))}
</div>
  )
}

export default Userlist