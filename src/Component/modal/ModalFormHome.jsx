import "../../style/component/modal/modal.sass";
import "../../style/component/modal/modalHome.sass";
import logo from "../../assets/logo/tous_a_la_ferme_logo_fond_blanc.png";
function ModalForm() {
  return (
    <>
      <div id="divBigModal__center">
        <div id="divBigModal__Home">
          <div id="divModal__logo">
            <img id="logoModal" src={logo} alt="logo" />
          </div>
          <div id="divModal__textarea">
            <h1 id="titleModal">Bienvenue à tout à la ferme</h1>
            <h2>
              Pour accéder à votre interface merci de créer un compte ou de vous
              connecter ou sinon cliquer ci-dessous.
            </h2>
          </div>
          <div id="Modal__login">
            {/* big btn pour se connecter */}
            <button
              id="btnModal__login"
              style={{ width: "300px" }}
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalForm;
