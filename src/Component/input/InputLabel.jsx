import "../../style/component/input/inputLabel.sass";
import { useEffect } from "react";

function InputLabel({
    labelText = "tu as oublier de mettre un label ...",
    placeHolder = "Tu as oublier de holder",
    id = "id-oublie",
    type = "text",
    valueInput,
    setValueInput,
    // size="L"
}) {
    useEffect(() => {
        if (valueInput === undefined || setValueInput === undefined) {
            throw new Error("Tu as oublier de mettre les props valueInput ou setValueInput");
        }
    }, [valueInput, setValueInput]);

    const handleChange = (event) => {
        setValueInput(event.target.value);
    };

    return (
        <>
            <div className="divinputLabel__container divinputLabel__container_L">
                <label htmlFor="input" className="divinputLabel__label">{labelText}</label>
                <input type={type} id={id} className="divinputLabel__input" placeholder={placeHolder} name="input" value={valueInput} onChange={handleChange} />
            </div>
        </>
    );
}

export default InputLabel;
