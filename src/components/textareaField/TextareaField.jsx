import "./TextareField.css";

function TextareaField({id, placeholder, value, onChange, children}) {
    return (
        <div className="textarea-field">
            <label htmlFor={id}>{children}</label>
            <textarea
                id={id}
                name={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                cols="30"
                rows="10"/>
        </div>
    );
}

export default TextareaField;