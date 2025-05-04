import React from "react";
import "../style/_allpages.sass";
import ModalFormHome from "../Component/modal/ModalFormHome";
// import NavBar from "../Component/other/NavBar";
import "../style/component/button/button.scss";

function Home() {
    return (
        <>
            {/* <NavBar /> */}
            <div id="backgroundPage">
                <div id="BigModal__center">
                    <ModalFormHome />
                </div>
            </div>
            <div style={{ padding: "20px" }}>
                <h1>Styles des boutons</h1>
                <div style={{ display: "flex", gap: "10px", flexDirection: "column", maxWidth: "200px" }}>
                    <button className="button button--primary">Button1 </button>
                    <button className="button button--secondary">Button2</button>
                    <button className="button button--cta">Bouton CTA</button>
                    <button className="button button--profile">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#eaa521">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </button>
                    <button className="button button--return">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#eaa521">
                            <path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Home;
