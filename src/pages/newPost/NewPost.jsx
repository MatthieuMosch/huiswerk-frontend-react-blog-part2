import {useState} from "react";
import axios from "axios";

import "./NewPost.css";

import InputField from "../../components/inputField/InputField.jsx";
import TextareaField from "../../components/textareaField/TextareaField.jsx";
import Error from "../../components/error/Error.jsx";

// import fakePost from "../../constants/fakePost.json";
// import newPost from "../../constants/newPost.json";

function NewPost() {
    const uri = "http://localhost:3000";

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [postData, setPostData] = useState({
        title: "",
        subtitle: "",
        content: "",
        author: "",
    });

    //this function is not used anymore, but is still here because it was part of the exercise
    async function addConstantPost(post) {
        // <button type="button" onClick={()=>addConstantPost(fakePost)}>voeg een fake post toe</button>
        // <button type="button" onClick={()=>addConstantPost(newPost)}>voeg een nieuwe post toe</button>
        try {
            setIsLoading(true);
            const response = await axios.post(`${URI}/posts`, post);
            console.log(response);
            setStatus(response.statusText);
            if (response.statusText === "Created") {
                console.log("succesmelding");
            } else {
                console.error("een foutmelding");
            }
        } catch (err) {
            setErrorMsg(err.message);
            console.error("foutmelding", err);
        } finally {
            setIsLoading(false);
        }
    }

    //change the subtitle of the first post
    //this function is not used anymore, but is still here because it was part of the exercise
    async function changeFirstSubtitle(subtitle) {
        // <button type="button" onClick={()=>changeFirstSubtitle(`changed at ${new Date().toLocaleTimeString()}`)}>
        try {
            setIsLoading(true);
            const response = await axios.put(`${URI}/posts/1`, {...posts[0], subtitle: subtitle});
            console.log("change subtitle: ", response.statusText);
        } catch (err) {
            setErrorMsg(err.message);
            console.error("foutmelding", err);
        } finally {
            setIsLoading(false);
        }
    }

    function doChange(e) {
        setPostData({...postData, [e.target.id]: e.target.value,});
    }

    async function addPost(e) {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post(`${uri}/posts`, postData);
            console.log(response);
            setPostData(response.data);
            setStatus(response.statusText);
        } catch (err) {
            setStatus(err.message);
            console.error("foutmelding", err);
        } finally {
            setIsLoading(false);
        }
    }

    switch (status.toLowerCase()) {
        case "":
        default:
            return (
                <form onSubmit={addPost}>
                    {status && <Error>er is iets fout gegaan</Error>}
                    {isLoading && <p>loading...</p>}
                    <fieldset>
                        <legend>Nieuwe Post</legend>
                        <InputField id="title" placeholder="Titel" value={postData.title} onChange={doChange}>
                            Titel
                        </InputField>
                        <InputField id="subtitle" placeholder="Subtitel" value={postData.subtitle}
                                    onChange={doChange}>
                            Subtitel
                        </InputField>
                        <TextareaField id="content" placeholder="type hier uw post" value={postData.content}
                                       onChange={doChange}/>
                        <InputField id="author" placeholder="Auteur" value={postData.author} onChange={doChange}>
                            Auteur
                        </InputField>
                    </fieldset>
                    <button type="submit">Plaatsen</button>
                </form>
            );
        case "created":
            return (
                <div>
                    {isLoading && <p>loading...</p>}
                    <h2>De blogpost is succesvol toegevoegd.</h2>
                    Je kunt deze <a href={`/posts/${postData.id}`}>hier</a> bekijken.
                </div>
            );
    }
}

export default NewPost;