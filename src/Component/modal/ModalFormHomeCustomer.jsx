import "../../style/component/modal/modalHomeProductor.sass";
import CardCustomerGrid from "../card/CardCustomerGrid";

function ModalFormHomeCustomer() {
  return (
    <div id="divBigModal__center">
      <h1>Produits disponibles</h1>
      <CardCustomerGrid />
    </div>
  );
}

export default ModalFormHomeCustomer;
