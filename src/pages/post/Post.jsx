import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

import "./Post.css";

import showDate from "../../showDate.jsx";
import Error from "../../components/error/Error.jsx";

function Post() {
    const {id} = useParams();
    const uri = "http://localhost:3000";

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [post, setPost] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setErrorMsg("");
                setIsLoading(true);
                const response = await axios.get(`${uri}/posts/${id}`);
                setPost(response.data);
            } catch (err) {
                setErrorMsg(err.message);
                console.error("foutmelding", err);
            } finally {
                setIsLoading(false);
            }
        }
        void fetchPost();
    }, [])

    //delete a post
    async function deletePost() {
        try {
            setIsLoading(true);
            const response = await axios.delete(`${uri}/posts/${id}`);
            if (response.statusText === "OK") {
                setPost(response.data);
                console.log(response.data);
            }
        } catch (err) {
            setErrorMsg(err.message);
            console.error("foutmelding", err);
        } finally {
            setIsLoading(false);
        }
    }

    if (Object.keys(post).length > 0) {
        return (
            <article className="post">
                {errorMsg && <Error>er is iets fout gegaan</Error>}
                {isLoading && <p>Loading...</p>}
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
    } else
        return (
            <div>
                {isLoading && <p>Deleting...</p>}
                <h2>Deze post is verwijderd</h2>
                Ga naar de <a href={"/"}>hoofdpagina</a> voor een overzicht van de beschikbare posts.
            </div>
        );
}

export default Post;