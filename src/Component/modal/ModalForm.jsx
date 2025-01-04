// import "../../style/component/modal/modal.css";
// change le chemin de l'importation du css
import "../../style/component/modal/modal.sass";
import logo from "../../assets/logo.svg";
import InputLabel from "../input/InputLabel";

function ModalForm() {
    return (
        <>
            <div id="divModal__center">
                <div id="divModal__container">
                    <img src={logo} alt="" id="divModal__logo"/>
                    <form method="post">
                        <InputLabel labelText={"Email"} placeHolder={"Email@TousALaFerme.com"} id={"emailInput"} />
                    </form>
                    <p>Login 3</p>
                </div>
            </div>
        </>
    );
}

export default ModalForm;
