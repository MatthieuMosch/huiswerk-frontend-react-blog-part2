import {useEffect, useState} from "react";
import axios from "axios";

import fakePost from "../../constants/fakePost.json";
import newPost from "../../constants/newPost.json";

import Tile from "../../components/tile/Tile.jsx";

function Home() {
    const URI = "http://localhost:3000";

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [posts, setPosts] = useState([]);

    //an arrow function to fetch 1 post
    const fetchPost  = async (id) => {
        try{
            setIsLoading(true);
            const response = await axios.get(`${URI}/posts/${id}`);
            setPost(response.data);
            console.log(response);
        } catch(err) {
            setErrorMsg(err.message);
            console.error("foutmelding", err);
        } finally {
            setIsLoading(false);
        }
    }

    //add a post
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
            console.error("foutmelding", err);
        } finally {
            setIsLoading(false);
        }
    }

    //delete a post
    async function deletePost(id){
        try{
            setIsLoading(true);
            const response = await axios.delete(`${URI}/posts/${id}`);
            console.log(response);
        } catch(err) {
            setErrorMsg(err.message);
            console.error("foutmelding", err);
        } finally {
            setIsLoading(false);
        }
    }

    //change the subtitle of a post
    async function changeFirstSubtitle(subtitle){
        try{
            setIsLoading(true);
            const response = await axios.put(`${URI}/posts/1`, {...posts[0], subtitle: subtitle});
            console.log("change subtitle: ", response.statusText);
        } catch(err) {
            setErrorMsg(err.message);
            console.error("foutmelding", err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const fetchAllPosts = async () => {
            try{
                setIsLoading(true);
                const response = await axios.get(`${URI}/posts`);
                setPosts(response.data);
                console.log(response);
            } catch(err) {
                setErrorMsg(err.message);
                console.error("foutmelding", err);
            } finally {
                setIsLoading(false);
            }
        };
        void fetchAllPosts();
    }, [])


    return (
        <main>
            <h1>blog part 2</h1>
            <h2>bekijk alle {posts.length} posts</h2>
            <Tile id={1} title="titel" subtitle="subtitel" uri={URI}></Tile>
            {/*<button type="button" onClick={fetchAllPosts}>haal alle posts op</button>*/}
            <button type="button" onClick={()=>fetchPost(6)}>haal post 6 op</button>
            <button type="button" onClick={()=>addPost(fakePost)}>voeg een fake post toe</button>
            <button type="button" onClick={()=>addPost(newPost)}>voeg een nieuwe post toe</button>
            <button type="button" onClick={()=>deletePost(19)}>verwijder post 19</button>
            <button type="button" onClick={()=>changeFirstSubtitle(`changed at ${new Date().toLocaleTimeString()}`)}>
                wijzig subtitle van de eerste post
            </button>
            <article>
                {isLoading && <p>loading...</p>}
                {errorMsg && <p>{errorMsg}</p>}
                { posts.length > 0 ?
                    <ul>
                        {
                            posts.map(post => (
                                <li key={post.id}>{post.id} {post.title} : {post.subtitle}</li>
                            ))
                        }
                    </ul> : null
                }
                {post && <p>{post.content}</p>}
            </article>
        </main>
    );
}

export default Home;