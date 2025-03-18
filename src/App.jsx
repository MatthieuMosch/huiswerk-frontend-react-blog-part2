import {Route, Routes} from "react-router-dom";
import './App.css'
import Home from "./pages/home/Home.jsx";
import Post from "./pages/post/Post.jsx";
import NewPost from "./pages/newPost/NewPost.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path={"/posts/:id"} element={<Post/>}/>
            <Route path={"/newpost"} element={<NewPost/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}

export default App
