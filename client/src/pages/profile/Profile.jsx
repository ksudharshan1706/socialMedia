import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import EditIcon from '@mui/icons-material/Edit';
import { Edit } from "@mui/icons-material";
import { AuthContext } from "../../context/Authcontext";
import UserInfo from "../userinfo/UserInfro";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user1, setUser1] = useState({});
  const username = useParams().username;
  const [open, setOpen] = useState(false);
  const {user} = useContext(AuthContext)
  console.log(username)
  useEffect(() => {
    const fetchUser = async () => {
      // const res = user._id?await axios.get(`/users?userId=${user._id}`):
      const res = await axios.get(`/users?username=${username}`);
      // console.log
      setUser1(res.data);
    };
    fetchUser();
  }, [username]);
  console.log(user1)
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user1.coverPicture
                    ?  user1.coverPicture
                    : PF + "person/noCover.jpg"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user1.profilePicture
                    ?  user1.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
              
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user1.username}
              {user._id == user1._id?<Edit style={{marginLeft:"10px"}} onClick={() => setOpen(true)} />:null}
              </h4>
              <span className="profileInfoDesc">{user1.desc}</span>
             
            </div>
            
          </div>
          <div className="profileRightBottom">
            {console.log(user1.username)}
            <Feed username={user1.username} />
            <Rightbar user={user1} />
          </div>
        </div>
      </div>
      {open && <UserInfo setOpen={setOpen} />}
    </>
  );
}