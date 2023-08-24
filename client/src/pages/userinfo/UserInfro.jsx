import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../components/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";
// import { useSelector } from "react-redux";


const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 10px;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index:1000
`;

const Wrapper = styled.div`
  width: 600px;
  height: 500px;
  background-color: white;
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: black;
  border-radius: 3px;
  padding: 10px;
  background-color: white;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: grey;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: #1877f2;
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;
const UserInfo = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [imgPercCover, setImgPercCover] = useState(0);
  // const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  // const [tags, setTags] = useState([]);
//   const { currentUser } = useSelector((state) => state.user);
const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    console.log(e.target.value)
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // const handleTags = (e) => {
  //   console.log(e.target.value.split(","))
  //   setTags(e.target.value.split(","));
  // };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "coverPicture" ? setImgPercCover(Math.round(progress)) : setImgPerc(Math.round(progress));
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
      (error) => {},
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
    video && uploadFile(video , "coverPicture");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "profilePicture");
  }, [img]);

  const handleUpload = async (e)=>{
    e.preventDefault();
    console.log(inputs)
    const res = await axios.put(`/users/${user._id}`, {...inputs,user})
    console.log(res.data)
    navigate("/")
    // // const res = await axios.post("/videos", {...inputs, tags})
    // setOpen(false)
    // res.status===200 && navigate(`/video/${res.data._id}`)
  }

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Add User Data</Title>
        <Label>BackGround Image:</Label>
        {imgPercCover > 0 ? (
          "Uploading:" + imgPercCover
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Label>Profile Image:</Label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        
        {/* <Input
          type="text"
          placeholder="Name"
          name="username"
          onChange={handleChange}
        /> */}
        <Input
          type="text"
          placeholder="city"
          name="city"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="from"
          name="from"
          onChange={handleChange}
        />
        
        {/* <Desc
          placeholder="Description"
          name="desc"
          rows={8}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Separate the tags with commas."
          onChange={handleTags}
        /> */}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default UserInfo;