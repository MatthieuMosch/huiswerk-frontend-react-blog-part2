import {useEffect, useState} from "react";
import axios from "axios";
import "./Home.css";

import Tile from "../../components/tile/Tile.jsx";

function Home() {
    const uri = "http://localhost:3000";

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                setErrorMsg("");
                setIsLoading(true);
                const response = await axios.get(`${uri}/posts`);
                setPosts(response.data);
            } catch (err) {
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
            {isLoading && <p>loading...</p>}
            {errorMsg ? <p>{errorMsg}</p> :
                posts.length > 0 ?
                    <>
                        <h2>{posts.length} posts beschikbaar</h2>
                        <article className="post-tiles">
                            {
                                posts.map(post => (
                                    <Tile
                                        key={post.id}
                                        id={post.id}
                                        title={post.title}
                                        subtitle={post.subtitle}
                                    />
                                ))
                            }
                        </article>
                    </> : null
            }
        </main>
    );
}

export default Home;