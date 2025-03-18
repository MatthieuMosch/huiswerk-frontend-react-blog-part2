import {useNavigate} from "react-router-dom";

function Tile({id, title, subtitle}) {
    const navigate = useNavigate();
    return (
        <button key={id} onClick={() => navigate(`/posts/${id}`)}>
            <h2>{id} {title}</h2>
            <p>{subtitle}</p>
        </button>
    );
}

export default Tile;