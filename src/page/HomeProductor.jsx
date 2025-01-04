import React from "react";
import "../style/_allpages.sass";
import ModalFormHomeProductor from "../Component/modal/ModalFormHomeProductor";


function Home() {
    return (
        <div id="backgroundPage">
            <div id="div__containerPage">
                <ModalFormHomeProductor />
            </div>
        </div>
    );
}

export default Home;
