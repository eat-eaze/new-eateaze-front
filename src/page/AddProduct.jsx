import React from "react";
import "../style/_allpages.sass";
import ModalAddProduct from "../Component/modal/ModalAddProduct";

function Home() {
    return (
        <>
            <div id="backgroundPage">
                <div id="BigModal__center">
                    <ModalAddProduct/>
                </div>
            </div>

        </>


    );
}

export default Home;
