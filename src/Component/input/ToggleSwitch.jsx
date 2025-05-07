import React from 'react';
import "../../style/component/input/toggleSwitch.sass";

function ToggleSwitch({ options, selectedOption, onOptionChange }) {
    return (
        <div className="toggle-switch-container">
            <div className="toggle-switch">
                <div
                    className={`toggle-switch-slider ${selectedOption === options[1] ? 'right' : 'left'}`}
                />
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={`toggle-switch-option ${selectedOption === option ? 'active' : ''}`}
                        onClick={() => onOptionChange(option)}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ToggleSwitch; 