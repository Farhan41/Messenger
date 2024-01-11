import React from 'react'
import Button from '@mui/material/Button';
import batman from '../assets/batman.png';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'

const Userlist = () => {

  const db = getDatabase();
  let [userslist, setUserslist] = useState([]);
  let [reqlist, setReqlist] = useState([]);
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

  useEffect(()=>{
    const friendrequestRef = ref(db, 'friendrequest');
    onValue(friendrequestRef, (snapshot) => {
        let arr =[]
    snapshot.forEach(item=>{
        
        
           arr.push(item.val().whoreceiveid+item.val().whosendid)

    });
    setReqlist(arr)  
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

     {reqlist.includes(item.whoreceiveid+item.whosendid) || reqlist.includes(item.whosendid+item.whoreceiveid) 
     ?
     <Button onClick={() => handleFriendRequest(item)} variant="contained">+</Button>
     :
     <Button color="error" variant="contained">Pending</Button>
    }

    </div>

   ))}
</div>
  )
}

export default Userlist