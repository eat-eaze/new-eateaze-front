// import "../../style/component/modal/modal.css";
// change le chemin de l'importation du css
import "../../style/component/modal/modal.sass";
import "../../style/component/modal/modalHomeProductor.sass";
import logo from "../../assets/logo/tous_a_la_ferme_logo_fond_blanc.png";
import InputLabel from "../input/InputLabel";
import CardProductView from "../card/CardProductView";
import CardProuductorGrid from "../card/CardProuductorGrid";

function ModalFormHomeProductor() {
    return (
        <>
            <div id="divModal__center">
                <div id="divModal__bigContainer">
                    <h1>Vos produits en vente</h1>

                    <CardProuductorGrid />
                </div>
            </div>
        </>
    );
}

export default ModalFormHomeProductor;
