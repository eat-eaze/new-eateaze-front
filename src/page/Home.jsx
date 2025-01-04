import React from "react";
import ModalFormLogin from "../Component/modal/ModalFormLogin";
import "../style/_allpages.sass";
import ModalFormHome from "../Component/modal/ModalFormHome";


function Home() {
    return (
        <div id="backgroundPage">
            <div id="div__containerPage">
                <ModalFormHome />
            </div>
        </div>
    );
}

export default Home;
