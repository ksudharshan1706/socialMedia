import React, { useEffect, useState } from "react";

import axios from "axios";
import "../rightbar/rightbar.css";
// import "../rightbar/rightbar.css";
import {
  Link,
  json,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Feed from "../feed/Feed";
import Rightbar from "../rightbar/Rightbar";
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
const Search = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const location = useLocation();
  const stringse = location.state;
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const Getsearch = async () => {
    console.log(stringse);
    const res = await axios.get("users/searchdata/", { params: { stringse } });
    const user = res.data;
    console.log(user);
    if (user.length == 0) {
      console.log("user not found here");
    } else {
      navigate(`/profile/${user[0].username}`);
    }
    setData(res.data);
  };

  useEffect(() => {
    Getsearch();
  }, [stringse]);

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
                src={PF + "person/noCover.jpg"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={PF + "person/noAvatar.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">User Not Found</h4>
              {/* <span className="profileInfoDesc">{user.desc}</span> */}
            </div>
          </div>
          <div className="profileRightBottom"></div>
        </div>
      </div>
    </>
  );
};

export default Search;
