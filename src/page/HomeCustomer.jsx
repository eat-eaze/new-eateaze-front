import React from "react";
import "../style/_allpages.sass";
import ModalFormHomeCustomer from "../Component/modal/ModalFormHomeCustomer";

function Home() {
    return (
        <>
            <div id="backgroundPage">
                <div id="BigModal__center">
                    <ModalFormHomeCustomer />
                </div>
            </div>
        </>



    );
}

export default Home;
