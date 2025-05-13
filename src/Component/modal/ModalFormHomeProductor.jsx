import "../../style/component/modal/modalHomeProductor.sass";
import CardProuductorGrid from "../card/CardProuductorGrid";

function ModalFormHomeProductor() {
  return (
    <div id="divBigModal__center">
      <h1> Mes produits </h1>
      <CardProuductorGrid />
    </div>
  );
}

export default ModalFormHomeProductor;
