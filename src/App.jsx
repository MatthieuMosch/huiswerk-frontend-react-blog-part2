import './App.css'
import {useState} from "react";
import axios from"axios";
import fakePost from "./constants/fakePost.json";
import newPost from "./constants/newPost.json";

function App() {
    const URI = "http://localhost:3000";

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState({});

    //a 'normal' function to fetch all posts
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

    //an arrow function to fetch 1 post
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

    //a 'normal' function to add a  posts
    async function addPost(post){
        try{
            setIsLoading(true);
            const response = await axios.post(`${URI}/posts`, post);
            console.log(response);
            if (response.statusText==="Created"){
                console.log("succesmelding");
            } else {
                console.error("een foutmelding");
            }
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
                <button type="button" onClick={()=>addPost(fakePost)}>voeg een fake post toe</button>
                <button type="button" onClick={()=>addPost(newPost)}>voeg een nieuwe post toe</button>
                <article>
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
                </article>
            </main>
        </>
    )
}

export default App
