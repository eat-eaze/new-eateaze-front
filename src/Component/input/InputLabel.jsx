import "../../style/component/input/inputLabel.scss";

function InputLabel() {
    return (
        <>
            <div className="divinputLabel__container">
                <label htmlFor="input" className="divinputLabel__label">Input</label>
                <input type="text" id="input" className="divinputLabel__input" name="input" />
            </div>
        </>
    );
}

export default InputLabel;
