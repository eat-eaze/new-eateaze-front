// import "../../style/component/modal/modal.css";
// change le chemin de l'importation du css
import "../../style/component/modal/modal.sass";
import logo from "../../assets/logo/tous_a_la_ferme_logo_fond_blanc (2).png";
import InputLabel from "../input/InputLabel";

function Modal() {
    return (
        <>
            <div id="divModal__center">
                <div id="divModal__container">
                    <img src={logo} alt="" id="divModal__logo"/>
                    <InputLabel labelText={"Email"} placeHolder={"Email@TousALaFerme.com"} id={"emailInput"} />
                    <p>Login 3</p>
                </div>
            </div>
        </>
    );
}

export default Modal;
