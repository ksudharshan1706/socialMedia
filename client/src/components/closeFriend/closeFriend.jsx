import { useEffect, useState } from "react";
import "./closeFriend.css";
import axios from "axios";

export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;  
  // console.log(user)
  const [friend,setFriend] = useState(null)
  useEffect(()=>{
    // console.log(user)
    const getUser = async()=>{
      const friends = await axios.get(`/users/${user}`)
      //console.log("friend",friend)
      setFriend(friends.data)
    }
    getUser()
  },[user])
  return (
    
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={friend?.profilePicture? friend?.profilePicture:PF+"person/noAvatar.png"} alt="" />
      <span className="sidebarFriendName">{friend?.username}</span>
    </li>
  );
}
