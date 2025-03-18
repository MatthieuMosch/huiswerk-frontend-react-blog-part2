import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

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
    async function deletePost(id){
        try{
            setIsLoading(true);
            const response = await axios.delete(`${URI}/posts/${id}`);
        } catch(err) {
            setErrorMsg(err.message);
            console.error("foutmelding", err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <article>
            <h2>{post.title}</h2>
            {post && <p>{post.content}</p>}
            {/*/!*<button type="button" onClick={()=>fetchPost(6)}>haal post 6 op</button>*!/*/}
            {/*/!*<button type="button" onClick={()=>deletePost(19)}>verwijder post 19</button>*!/*/}
        </article>
    );
}

export default Post;