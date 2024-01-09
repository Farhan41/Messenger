import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import batman from '../assets/batman.png'
import { getDatabase, ref, onValue,set, push, remove } from "firebase/database";
import {useSelector} from 'react-redux'
const Userlist = () => {

    let [userslist, setUserslist] = useState([]);
    let userInfo = useSelector((state)=>state.loggeduser.value)
    
    console.log("xabed",userInfo)

    const db = getDatabase();

    useEffect(()=>{
        const userRef = ref(db, 'users');
        onValue(userRef, (snapshot) => {
        let arr = [];
        snapshot.forEach(item=>{
          
          // console.log("farhan", item.val())
          arr.push(item.val())
          // {...item.val(),userid: item.key}
          // arr.push({...item.val(),userid: item.key})
         
        
       })
       
       setUserslist(arr)
       
        });
    },[])

  return (
    <div className='box'>
    <h3>User List</h3>
    {userslist.map(item=>(
        <div className='list'>
        <img width="50" height="50" src={batman} />
        <h4>{item.username}</h4>
        {/* <p>{userInfo.uid}</p> */}
        <Button variant="contained">+</Button>
        </div>
    ))}
    
   
  
</div>
  )
}

export default Userlist




// if(userInfo.uid != item.key){
//   arr.push(item.val())
// }