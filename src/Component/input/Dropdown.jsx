import { useState } from "react";
// import "../../style/component/input/dropdown.sass";


function Dropdown({ selectedType, types, selectType }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="dropdown">
            <button className="dropdown__button" onClick={toggleDropdown}>
                {selectedType || "Sélectionner un type"} ▼
            </button>
            {isOpen && (
                <div className="dropdown__content">
                    {types.map((type) => (
                        <div
                            key={type}
                            className="dropdown__item"
                            onClick={() => selectType(type)}
                        >
                            {type}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;