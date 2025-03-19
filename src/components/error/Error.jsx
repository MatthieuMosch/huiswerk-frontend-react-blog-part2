import "./Error.css";

function Error({children}) {
    return (
        <h2 className="error-msg">
            {children}
        </h2>
    );
}

export default Error;