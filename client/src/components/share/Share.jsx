// import "./share.css";
// import {
//   PermMedia,
//   Label,
//   Room,
//   EmojiEmotions,
//   Cancel,
// } from "@mui/icons-material";
// import { useContext, useRef, useState } from "react";
// import { AuthContext } from "../../context/Authcontext";
// import axios from "axios";

// export default function Share() {
//   const { user } = useContext(AuthContext);
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//   const desc = useRef();
//   const [file, setFile] = useState(null);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const newPost = {
//       userId: user._id,
//       desc: desc.current.value,
//     };
//     if (file) {
//       const data = new FormData();
//       const fileName = Date.now() + file.name;
//       data.append("name", fileName);
//       data.append("file", file);
//       newPost.img = fileName;
//       console.log(newPost);
//       try {
//         await axios.post("/upload", data);
//       } catch (err) {}
//     }
//     try {
//       await axios.post("/posts", newPost);
//       window.location.reload();
//     } catch (err) {}
//   };

//   return (
//     <div className="share">
//       <div className="shareWrapper">
//         <div className="shareTop">
//           <img
//             className="shareProfileImg"
//             src={
//               user.profilePicture
//                 ? PF + user.profilePicture
//                 : PF + "person/noAvatar.png"
//             }
//             alt=""
//           />
//           <input
//             placeholder={"What's in your mind " + user.username + "?"}
//             className="shareInput"
//             ref={desc}
//           />
//         </div>
//         <hr className="shareHr" />
//         {file && (
//           <div className="shareImgContainer">
//             <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
//             <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
//           </div>
//         )}
//         <form className="shareBottom" onSubmit={submitHandler}>
//           <div className="shareOptions">
//             <label htmlFor="file" className="shareOption">
//               <PermMedia htmlColor="tomato" className="shareIcon" />
//               <span className="shareOptionText">Photo or Video</span>
//               <input
//                 style={{ display: "none" }}
//                 type="file"
//                 id="file"
//                 accept=".png,.jpeg,.jpg"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//             </label>
//             <div className="shareOption">
//               <Label htmlColor="blue" className="shareIcon" />
//               <span className="shareOptionText">Tag</span>
//             </div>
//             <div className="shareOption">
//               <Room htmlColor="green" className="shareIcon" />
//               <span className="shareOptionText">Location</span>
//             </div>
//             <div className="shareOption">
//               <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
//               <span className="shareOptionText">Feelings</span>
//             </div>
//           </div>
//           <button className="shareButton" type="submit">
//             Share
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import "./share.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import axios from "axios";
import app from "../firebase";


export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [img, setImg] = useState(undefined);
  
  const [inputs, setInputs] = useState({});
  const [userId,setUserId] = useState(user._id)
  const [desc,setDesc] = useState("")
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const handleChange = (e) => {
    console.log(e.target.value)
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
      
    
    console.log(uploadTask)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress)
        urlType === "img" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {console.log(error)},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    img && uploadFile(img, "img");
  }, [img]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(inputs)
    try {
      await axios.post("/posts", {...inputs,userId:user._id});
      window.location.reload();
    } catch (err) {console.log(err)}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <hr className="shareHr" />
        {imgPerc=="100" && img && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(img)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => {setImg(null)
            setImgPerc(0)}} />
          </div>
        )}
        
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              {/* {
              imgPerc > 0 ? (
                  "Uploading:" + imgPerc + "%"
                ) : ( */}
               <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setImg(e.target.files[0])}
              />
              
              {/* )} */}
              {/* {imgPerc > 0 ? (
                  "Uploading:" + imgPerc + "%"
                ) : (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                )} */}
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}