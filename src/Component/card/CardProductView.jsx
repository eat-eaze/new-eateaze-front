import React from 'react'
// import img from '../assets/img.png';
import '../../style/component/card/cardProductView.sass'

function CardProductView({
    img = "https://via.placeholder.com/150",
                             titleImg = "Titre de l'image",
    title = "Titre",
    description = "Description",
    price = "Prix",
    stock = "Stock",
                     }) {

    return (
        <div className="CardProductView__Container">
            <img src={img} alt={titleImg} className="CardProductView__banner" />
            <div className="CardProductView__body">
                <p className="CardProductView__titreProduct">{title}</p>
                <p className="CardProductView__textProduct">{description}</p>
                <p className="CardProductView__textProduct">Prix : {price}€/Kg</p>
                <p className="CardProductView__textProduct">{stock}</p>
            </div>
        </div>
    )
}

export default CardProductView