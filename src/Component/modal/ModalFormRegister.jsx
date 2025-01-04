import "../../style/component/modal/modalRegister.sass";
import logo from "../../assets/logo/tous_a_la_ferme_logo_fond_blanc.png";
import InputLabel from "../input/InputLabel";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ModalFormLogin() {
    const [emailInput,setEmailInput] = useState("");
    const [passwordInput,setPasswordInput] = useState("");

    useEffect(() => {
        console.log(`useEffect : ${emailInput}, ou ${passwordInput}`);
    }, [emailInput,passwordInput]);

    return (
        <>
            <div id="divModal__center">
                <div id="divModal__container">
                    <div id="divModal__logo">
                        <img src={logo} alt=""/>
                    </div>
                    <div id="div__textarea">
                        <h1 id="welcome">Ravi de vous revoir !</h1>
                        <h2 id="instruction">Veuillez entrer vos informations pour vous connecter.</h2>
                    </div>
                    <form method="post" id="formModal__login">
                        <InputLabel labelText="Email" placeHolder={"Email@TousALaFerme.com"} id={"emailInput"} valueInput={emailInput} setValueInput={setEmailInput} type={"email"} />
                        <InputLabel labelText="Confirmer l'Email" placeHolder={"Email@TousALaFerme.com"} id={"emailInput"} valueInput={emailInput} setValueInput={setEmailInput} type={"email"} />
                        <InputLabel labelText="mot de passe" placeHolder="Mot de passe" id="password" valueInput={passwordInput} setValueInput={setPasswordInput} type="password" />
                    </form>
                    <p id="paragraph__textparam">Un compte ? <Link to={"/login"} id="link__register">connectez-vous</Link> </p>
                    <p>Boutton de Josué</p>
                </div>
            </div>
        </>
    );
}

export default ModalFormLogin;
