import {useState} from "react";
import axios from "axios";

// import fakePost from "../../constants/fakePost.json";
// import newPost from "../../constants/newPost.json";

function NewPost() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

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

    //change the subtitle of the first post
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

    return (
        <div>
            form for new post
            {/*/!*<button type="button" onClick={()=>addPost(fakePost)}>voeg een fake post toe</button>*!/*/}
            {/*/!*<button type="button" onClick={()=>addPost(newPost)}>voeg een nieuwe post toe</button>*!/*/}
            {/*/!*<button type="button" onClick={()=>changeFirstSubtitle(`changed at ${new Date().toLocaleTimeString()}`)}>*!/*/}
            {/*    wijzig subtitle van de eerste post*/}
            {/*</button>*/}
        </div>
    );
}

export default NewPost;