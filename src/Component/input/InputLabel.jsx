// import logo from './logo.svg';
// import './App.css';
import "../../style/component/input/inputLabel.css";
import logo from "../../logo.svg";

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
