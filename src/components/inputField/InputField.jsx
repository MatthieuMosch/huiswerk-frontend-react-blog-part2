import "./InputField.css";

function InputField({id, placeholder, value, onChange, children}) {
    return (
        <div className="input-field">
            <label htmlFor={id}>{children}</label>
            <input type="text"
                   id={id}
                   name={id}
                   placeholder={placeholder}
                   value={value}
                   onChange={onChange}/>
        </div>
    );
}

export default InputField;