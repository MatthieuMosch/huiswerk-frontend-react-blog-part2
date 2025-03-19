import {useNavigate} from "react-router-dom";
import "./Tile.css";

function Tile({id, title, subtitle}) {
    const navigate = useNavigate();
    return (
        <button className="button-tile" onClick={() => navigate(`/posts/${id}`)}>
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </button>
    );
}

export default Tile;