import React from 'react'
// import img from '../assets/img.png';
import '../../style/component/card/cardProfil.sass'

function CardProfil({
                             img = "https://via.placeholder.com/150",
                             titleImg = "Titre de l'image",
                             title = "Titre",
                         }) {

    return (
        <div className="CardProfil__Container">
            <img src={img} alt={titleImg} className="CardProfil__banner" />
            <div className="CardProfil__body">
                <p className="CardProfil__titreProduct">{title}</p>
            </div>
        </div>
    )
}

export default CardProfil