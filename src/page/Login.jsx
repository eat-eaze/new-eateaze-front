import "../style/page/login.css";
import ModalFormLogin from "../Component/login/ModalFormLogin";

function Login() {
    return (
        <>
            <div id="backgroundLogin"/>
            <div id="div__containerLogin">
                <ModalFormLogin />
            </div>
        </>
    );
}

export default Login;
