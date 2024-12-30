import "../../style/component/modal/modal.sass";
import logo from "../../assets/logo.svg";
import InputLabel from "../input/InputLabel";
import { useEffect, useState } from "react";

function ModalForm() {
    const [emailInput,setEmailInput] = useState("");
    const [passwordInput,setPasswordInput] = useState("");

    useEffect(() => {
        console.log(`useEffect : ${emailInput}, ou ${passwordInput}`);
    }, [emailInput,passwordInput]);

    return (
        <>
            <div id="divModal__center">
                <div id="divModal__container">
                    <img src={logo} alt="" id="divModal__logo"/>
                    <form method="post" id="formModal__login">
                        <InputLabel labelText={"Email"} placeHolder={"Email@TousALaFerme.com"} id={"emailInput"} valueInput={emailInput} setValueInput={setEmailInput} type={"email"} />
                        <InputLabel labelText={"mot de passe"} placeHolder={"Password"} id={"password"} valueInput={passwordInput} setValueInput={setPasswordInput} type={"password"} />
                    </form>
                    <p>Boutton de Josué</p>
                </div>
            </div>
        </>
    );
}

export default ModalForm;
