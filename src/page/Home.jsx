import React from "react";
import "../style/_allpages.sass";
import ModalFormHome from "../Component/modal/ModalFormHome";
// import NavBar from "../Component/other/NavBar";
import "../style/component/button/button.scss";

function Home() {
    return (
        <div id="backgroundPage">
            <div id="BigModal__center">
                <ModalFormHome />
            </div>
        </div>
    );
}

export default Home;
