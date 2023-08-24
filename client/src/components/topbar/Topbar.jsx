import "./topbar.css";
import {Search,Person,Chat,Notifications, Logout} from '@mui/icons-material';
import { useContext, useEffect, useState } from "react";
import {Link, useNavigate,NavLink}from "react-router-dom"
import { AuthContext } from "../../context/Authcontext";
import axios from "axios"


export default function Topbar() {
  const {user} = useContext(AuthContext)
  const [conversationId,setConversationId] = useState([])
  const [messages,setMessages] = useState(0)
  console.log(user._id)
  // useEffect(()=>{
  //   const getMessages = async() => {
  //     const conversationIDs = await axios.get(`/conversations/getMessages/${user._id}`)
  //     const IDs = conversationIDs.data.map((conver) => conver._id)
  //     setConversationId(IDs)
  //     const totalUserMessages = await axios.post(`/conversations/totalMessages/`,{Ids:IDs})
  //     //console.log(totalUserMessages)
  //     setMessages(totalUserMessages.data.length)

  //     //console.log(totalUserMessages.data.length)
  //   }
  //   getMessages()
  // },[user])


  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [search, setSearch] = useState('');
  const history = useNavigate();
//   const Getsearch = () => {
//   if(search!=""){
//     <Search search={search}/>
//   }
// }
  const Getsearch = () => {
    console.log(search);
    history(`/searchpage`, { state: search });
  };

  const logout = ()=>{
    localStorage.removeItem("user");
    history("/login");
    window.location.reload();
    // toast.success("logout successfully");
  }


  return (
  <div className="topbarContainer">
    <div className="topbarLeft">
      <Link to="/"style={{textDecoration:"none"}}>
      <span className="logo">Social</span>
      </Link>
    </div>
    <div className="topbarCenter">
      <div className="searchbar" >
        <div onClick={Getsearch}>
        <Search className="searchIcon" />
        </div>
        <input placeholder="search for friends Full Name" className="searchInput" onChange={(e)=>setSearch(e.target.value)}/>
      </div>
    </div>
    <div className="topbarRight">
      <div className="topbarLinks">
        <Link to="/" style={{textDecoration:"none",color:"white"}}>
        <span className="topbarLink">HomePage</span>
        </Link>
        {/* <span className="topbarLink">TimeLine</span> */}
      </div>
      <div className="topbarIcons">
        {/* <div className="topbarIconItem">
          <Person/>
          <span className="topbarIconBadge">1</span>
        </div> */}
        <Link to="/messenger" style={{textDecoration:"none",color:"white"}} >
        <div className="topbarIconItem" >
          <Chat/>
          {messages>0?<span className="topbarIconBadge">{messages}</span>:null}
        </div>
        </Link>
        {/* <div className="topbarIconItem">
          <Notifications/>
          <span className="topbarIconBadge">1</span>
        </div>  */}
        
        <div className="topbarIconItem" >
        <NavLink to="/login" onClick={logout} p={1}>
          <Logout style={{color:"white",cursor:"pointer"}}/> 
          </NavLink>
        </div> 
      </div>
      <Link to={`/profile/${user.username}`}>
      <img src={user.profilePicture? user.profilePicture:PF+"person/noAvatar.png"} alt="" className="topbarImg" />
      </Link>
    </div>
  </div>
  );
}
