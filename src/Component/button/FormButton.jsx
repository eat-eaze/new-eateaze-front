import React from 'react';
import "../../style/component/button/formButton.sass";

function FormButton({ text, onClick, disabled = false, type = "button" }) {
    return (
        <button
            className="form-button"
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {text}
        </button>
    );
}

export default FormButton; 