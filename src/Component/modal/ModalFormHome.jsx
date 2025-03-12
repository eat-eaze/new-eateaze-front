// import "../../style/component/modal/modal.css";
// change le chemin de l'importation du css
import "../../style/component/modal/modal.sass";
import "../../style/component/modal/modalHome.sass";
import logo from "../../assets/logo/tous_a_la_ferme_logo_fond_blanc.png";

// import InputLabel from "../input/InputLabel";

function ModalForm() {
    return (
        <>
            <div id="divBigModal__center">
                <div id="divBigModal__Home">
                    <div id="divModal__logo">
                        <img id="logoModal" src={logo} alt="logo"/>
                    </div>
                    <div id="divModal__textarea">
                        <h1 id="titleModal">Bienvenue à tout à la ferme</h1>
                        <h2>Pour accéder à votre interface merci de créer un
                            compte ou de vous connecter ou sinon cliquer
                            ci-dessous.</h2>
                    </div>
                    <div id="Modal__login">
                        <p>/*GROS BTN POUR SE CONNECTER DE JOSUE*/</p>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ModalForm;
