// import "../../style/component/modal/modal.scss";
import "../../style/component/modal/modal.scss";
import logo from "../../assets/logo.svg";
import InputLabel from "../input/InputLabel";

function Modal() {
    return (
        <>
            <div id="divModal__center">
                <div id="divModal__container">
                    <img src={logo} alt="" id="divModal__logo"/>
                    <InputLabel />
                    <p>Login 3</p>
                </div>
            </div>
        </>
    );
}

export default Modal;
