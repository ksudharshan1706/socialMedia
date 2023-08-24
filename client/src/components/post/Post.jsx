import "./post.css"
import {MoreVert} from "@mui/icons-material"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/Authcontext"
import DeletePost from "../delete/DeletePost"
import Comments from "../comments/Comments"
export default function Post({post}) {
    const [like,setLike] = useState(post.likes.length)
    const [isLiked,setIsLiked] = useState(false)
    const [user,setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;  
    const { user: currentUser } = useContext(AuthContext);
    const [open,setOpen]=useState(false)
    const [comment,setComment]=useState(false)
    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
      }, [currentUser._id, post.likes]);
      
    useEffect(()=>{
        const fetchUser = async () =>{
          const res = await axios.get(`/users?userId=${post.userId}`)
          setUser(res.data)
        }
        fetchUser()
      },[post.userId])

      const likeHandler = () => {
        try {
          axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
        } catch (err) {}
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
      };
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to = {`profile/${user.username}`}>
                    <img src=    {user.profilePicture?user.profilePicture :PF+"person/noAvatar.png"} alt="" className="postProfileImg" />
                    </Link>
                    <span className="postUsername">
                        {user.username}
                    </span>
                    <span className="postDate">{format(post.createdAt)}</span>    
                </div>
                <div className="postTopRight">
                    <MoreVert onClick={()=>setOpen(!open)}/>
                    {currentUser._id==post.userId && open && <DeletePost post={post} setOpen={setOpen} /> }
                    
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post.desc}</span>
                <img src={post.img} alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className ="likeIcon"src={`${PF}like.png`} onClick={likeHandler}alt="" />
                    <img className ="likeIcon"src={`${PF}heart.png`} onClick={likeHandler} alt="" />
                    <span className="PostLikeCounter">
                        {like?like +" people liked it":""}
                    </span>
                </div>
                <div className="postBottomRight">
                <span className="postCommentText" onClick={()=>setComment(!comment)}>{post.comment} comments</span>
                    {comment && <Comments post={post} setComment={setComment} />}
                </div>
            </div>
        </div>
    </div>
  )
}
