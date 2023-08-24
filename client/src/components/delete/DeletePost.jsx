import React from 'react'
import "./deletepost.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const DeletePost = ({post,setOpen}) => {
    // console.log(post)
    const navigate = useNavigate();
  const handleDelete = async() =>{
    const res = await axios.delete(`/posts/${post._id}`,{data:{userId:post.userId}})
    setOpen(false)
    navigate("/login");
  }
  return (
    <div className='deletepost' onClick={handleDelete}>
      Delete    
    </div>
  )
}

export default DeletePost