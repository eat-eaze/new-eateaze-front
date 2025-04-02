import React, { useMemo } from 'react'
// import img from '../assets/img.png';
import '../../style/component/card/cardProductView.sass'

/**
 * Génère une URL unique pour l'image du chat afin d'éviter la mise en cache
 * @returns {string} URL unique d'une image de chat
 */
const getUniqueImageUrl = () => {
    // Ajout d'un timestamp et d'un nombre aléatoire pour rendre chaque URL unique
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    return `https://cataas.com/cat?t=${timestamp}&rand=${randomNum}`;
};

function CardProductView({
    img = "https://via.placeholder.com/150",
    titleImg = "Titre de l'image",
    title = "Titre",
    description = "Description",
    price = "Prix",
    stock = "Stock",
}) {
    // Si l'image par défaut n'est pas fournie ou si elle contient cataas.com, générer une URL unique
    const imageUrl = useMemo(() => {
        if (img === "https://via.placeholder.com/150" || (typeof img === 'string' && img.includes("cataas.com"))) {
            return getUniqueImageUrl();
        }
        return img;
    }, [img]);
    
    return (
        <div className="CardProductView__Container">
            <img src={imageUrl} alt={titleImg} className="CardProductView__banner" />
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