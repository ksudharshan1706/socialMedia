import React, { useContext, useEffect, useState } from 'react'
import "./comment.css"
import styled from "styled-components";
import { AuthContext } from '../../context/Authcontext';
import axios from 'axios';
import Comment from './Comment';
const Container = styled.div`
  width: 50%;
  height: 100%;
  position: fixed;
  top: 10px;
  left: 400px;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index:1000
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: white;
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit:cover; 
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 60%;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Button = styled.div`
background-color: #1877f2;
font-weight: 500;
color: white;
border: none;
border-radius: 3px;
height: max-content;
padding: 10px 20px;
cursor: pointer;
width:75px
`;
const Comments = ({post,setComment}) => {
    const { user: currentUser } = useContext(AuthContext);
    const [desc,setDesc] = useState("")
    const [comments, setComments] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    useEffect(() => {
        const fetchComments = async () => {
          try {
            const res = await axios.get(`/comments/${post._id}`);
            setComments(res.data.sort((p1,p2)=>{return new Date(p2.createdAt)-new Date(p1.createdAt)}));
          } catch (err) {}
        };
        fetchComments();
      }, [post]);
    const handleComment = async(e) =>{
        e.preventDefault()
        if(desc!=""){
        await axios.post(`/comments/`,{userId:currentUser._id,postId:post._id,desc:desc});
        const fetchComments = async () => {
            try {
              const res = await axios.get(`/comments/${post._id}`);
              setComments(res.data.sort((p1,p2)=>{return new Date(p2.createdAt)-new Date(p1.createdAt)}));
            }catch (err) {}
        };
        fetchComments()
      }
    }
  return (
    <Container>
        <Wrapper >
            <Close onClick={() => setComment(false)}>X</Close>
            <img src={post.img} alt="" className="commentImg" />
            
            <div className='comment'>
            <Avatar src={currentUser.profilePicture?currentUser.profilePicture:PF+"person/noAvatar.png"} />
              
                <Input placeholder="Add a comment..." onChange={(e)=>setDesc(e.target.value)}/>
                <Button onClick={handleComment} >Comment</Button>
            </div>
            <div className='scroller'>
                {comments.map(data=>(
                    <Comment key={data._id} data={data}/>
                ))}
            </div>
        </Wrapper>
    </Container>
  )
}

export default Comments