import React from "react";
// import img from '../assets/img.png';
import "../../style/component/card/CardAddProduct.sass";

function CardAddProduct({ onClick }) {
  return (
    <div className="CardAddProduct__Container" onClick={onClick}>
      <div className="CardAddProduct__Content">
        <p>+</p>
      </div>
    </div>
  );
}

export default CardAddProduct;
