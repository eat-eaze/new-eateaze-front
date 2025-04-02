import React from "react";
{/* import ModalFormLogin from "../Component/modal/ModalFormLogin"; */ }
import "../style/_allpages.sass";

import ModalFormHome from "../Component/modal/ModalFormHome";
import NavBar from "../Component/other/NavBar";


function Home() {

    return (
        <>
            <NavBar />
            <div id="backgroundPage">
                <div id="BigModal__center">
                    <ModalFormHome />
                </div>
            </div>
        </>

    );
}

export default Home;
