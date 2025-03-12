import React from "react";
import "../style/_allpages.sass";
import ModalFormHomeProductor from "../Component/modal/ModalFormHomeProductor";
// import ModalFormHomeProductor from "../Component/modal/ModalFormHomeProductor";


function Home() {
    return (
        <>
            <div id="backgroundPage">
                <div id="BigModal__center">
                    <ModalFormHomeProductor />
                </div>
            </div>
        </>



    );
}

export default Home;
