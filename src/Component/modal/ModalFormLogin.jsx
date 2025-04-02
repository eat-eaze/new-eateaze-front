import "../../style/component/modal/modalLogin.sass";
import logo from "../../assets/logo/tous_a_la_ferme_logo_fond_blanc.png";
import InputLabel from "../input/InputLabel";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleLogin, handleLogout } from "../../service/serviceUser";

function ModalFormLogin() {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    useEffect(() => {
        console.log(`useEffect : ${emailInput}, ou ${passwordInput}`);
    }, [emailInput, passwordInput]);

    const handleLoginClick = async () => {
        console.log("test");
        try {
            console.log(`Email : ${emailInput}, Password : ${passwordInput}`);
            await handleLogin(emailInput, passwordInput);
            console.log('Connexion réussie!');
            window.location.replace('/');
        } catch (error) {
            console.error('Erreur de connexion', error);
            alert('Échec de la connexion!');
        }
    }

    const handleLogoutClick = async () => {
        console.log("test déco");
        try {
            await handleLogout();
            console.log('déconnexion réussie!');
        } catch (error) {
            console.error('Erreur de déconnexion', error);
            alert('Échec de la déconnexion!');
        }
    }


    return (
        <>
            <div id="divModal__center">
                <div id="divModal__container">
                    <div id="divModal__logo">
                        <img src={logo} alt="" onClick={handleLogoutClick} />
                    </div>
                    <div id="div__textarea">
                        <h1 id="welcome">Ravi de vous revoir !</h1>
                        <h2 id="instruction">Veuillez entrer vos informations pour vous connecter.</h2>
                    </div>
                    <form method="post" id="formModal__login">
                        <InputLabel labelText={"Email"} placeHolder={"Email@TousALaFerme.com"} id={"emailInput"} valueInput={emailInput} setValueInput={setEmailInput} type={"email"} />
                        <InputLabel labelText={"mot de passe"} placeHolder={"Password"} id={"password"} valueInput={passwordInput} setValueInput={setPasswordInput} type={"password"} />
                    </form>
                    <p id="paragraph__textparam">Pas encore de compte ? <Link to="/register" id="link__register">Inscrivez-vous</Link></p>
                    <p onClick={handleLoginClick}>Boutton de Josué</p>
                </div>
            </div>
        </>
    );
}

export default ModalFormLogin;
