import "../../style/component/modal/modalHomeProductor.sass";
import CardCustomerGrid from "../card/CardCustomerGrid";

function ModalFormHomeProductor() {
    return (
            <div id="divBigModal__center">
                <h1> Tous les produits </h1>
                <CardCustomerGrid />
            </div>
    );
}

export default ModalFormHomeProductor;
