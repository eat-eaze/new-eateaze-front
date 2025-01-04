import "../style/page/login.sass";
import ModalFormLogin from "../Component/modal/ModalFormLogin";

function Login() {
    return (
        <>
            <div id="backgroundLogin">
               <div id="div__containerLogin">
                    <ModalFormLogin />
                </div>
            </div>
        </>
    );
}

export default Login;
