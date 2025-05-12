import "../style/page/login.sass";
import ModalFormProfil from "../Component/modal/ModalFormProfil";

function Login() {
  return (
    <>
      <div id="backgroundLogin">
        <div id="div__containerLogin">
          <ModalFormProfil />
        </div>
      </div>
    </>
  );
}

export default Login;
