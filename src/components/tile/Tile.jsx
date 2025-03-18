import {useNavigate} from "react-router-dom";

function Tile({uri, id, title, subtitle}) {
    const navigate = useNavigate();
    return (
        <button key={id} onClick={() => navigate(`${uri}/${id}`)}>
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </button>
    );
}

export default Tile;