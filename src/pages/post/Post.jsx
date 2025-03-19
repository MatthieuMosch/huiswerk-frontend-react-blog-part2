import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import "./Post.css";
import showDate from "../../showDate.jsx";

function Post() {
    const {id} = useParams();

    const uri = "http://localhost:3000";

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [post, setPost] = useState({});

    useEffect(() => {
        const fetchPost  = async () => {
            try{
                setErrorMsg("");
                setIsLoading(true);
                const response = await axios.get(`${uri}/posts/${id}`);
                setPost(response.data);
            } catch(err) {
                setErrorMsg(err.message);
                console.error("foutmelding", err);
            } finally {
                setIsLoading(false);
            }
        }
        void fetchPost ();
    }, [])

    //delete a post
    async function deletePost(){
        try{
            setIsLoading(true);
            const response = await axios.delete(`${uri}/posts/${id}`);
        } catch(err) {
            setErrorMsg(err.message);
            console.error("foutmelding", err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <article className="post">
            <span className="readtime">readtime: {post.readTime}</span>
            <h1>{post.title}</h1>
            <h2>{post.subtitle}</h2>
            <p>{post.content}</p>
            <cite>{showDate(post.created)} {post.author}</cite>
            <span className="comments">comments: {post.comments}</span>
            <span className="shares">shares: {post.shares}</span>
            <button type="button" onClick={deletePost}>verwijder post</button>
        </article>
    );
}

export default Post;