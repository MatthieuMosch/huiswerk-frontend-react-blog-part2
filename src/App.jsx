import './App.css'
import {useState} from "react";
import axios from"axios";

function App() {
    const URI = "http://localhost:3000";

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState({});

    //as 'normal' named function
    async function fetchAllPosts(){
        try{
            setIsLoading(true);
            const response = await axios.get(`${URI}/posts`);
            setPosts(response.data);
            console.log(response);
        } catch(err) {
            setErrorMsg(err.message);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    //as named arrow function
    const fetchPost  = async (id) => {
        try{
            setIsLoading(true);
            const response = await axios.get(`${URI}/posts/${id}`);
            setPost(response.data);
            console.log(response);
        } catch(err) {
            setErrorMsg(err.message);
            console.error(err);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <>
            <h1>Programmeer hier jouw applicatie</h1>
            <main>
                <button type="button" onClick={fetchAllPosts}>haal alle posts op</button>
                <button type="button" onClick={()=>fetchPost(6)}>haal post 6 op</button>
                {isLoading && <p>loading...</p>}
                {errorMsg && <p>{errorMsg}</p>}
                { posts.length > 0 ?
                    <ul>
                        {
                            posts.map(post => (
                                <li key={post.id}>{post.title}</li>
                            ))
                        }
                    </ul> : null
                }
                {post && <p>{post.content}</p>}
            </main>
        </>
    )
}

export default App
