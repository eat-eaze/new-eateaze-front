import React from 'react'
// import img from '../assets/img.png';
import '../../style/component/card/CardAddProduct.sass'
import { Link } from "react-router-dom";

function CardAddProduct() {

    return (
        <div className="CardAddProduct__Container">
            <Link to="/addproduct" >
                <p>+</p>
            </Link>
        </div>

    )
}

export default CardAddProduct