import React from 'react'
// import img from '../assets/img.png';
import '../../style/component/card/cardCustomer.sass'
import { useCartStore } from '../../store/cartStore'
import { useNavigate } from 'react-router-dom';

function CardProductCustomer({ id, img = "https://via.placeholder.com/150", titleImg = "Titre de l'image", title = "Titre", description = "Description", price = "Prix", stock = "Stock" }) {

    const navigate = useNavigate();

    // intégration store
    const { cart, addProduct, updateQuantity } = useCartStore();
    const quantity = cart.find(p => p.id === id)?.quantity || 0;

    const handleAdd = (e) => { e.stopPropagation(); addProduct({ id, image: img, name: title, description, price }); };
    const handleRemove = (e) => { e.stopPropagation(); if (quantity > 0) updateQuantity(id, -1); };

    const handleDetail = () => {
        console.log("Detail");
        // navigate(`/customer/detail/${title}`); // Redirige vers la page "About"
    }

    const getUniqueImageUrl = () => {
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 1000);
        return `https://cataas.com/cat?t=${timestamp}&rand=${randomNum}`;
    };

    return (
        <div className="CardCustomer__Container">
            <img src={getUniqueImageUrl()} alt={titleImg} className="CardCustomer__banner" />
            <div className="CardCustomer__body" onClick={handleDetail}>
                <p className="CardCustomer__titreProduct">{title}</p>
                <p className="CardCustomer__textProduct">{description}</p>
                <p className="CardCustomer__textProduct">Prix : {price}€/Kg</p>
                <div className="CardCustomer__stockManager">
                    <div className="CardCustomer__Button" onClick={handleAdd}>+</div>
                    <p className="CardCustomer__stockText">{quantity} Kg</p>
                    <div className="CardCustomer__Button" onClick={handleRemove}>-</div>
                </div>
            </div>
        </div>
    )
}

export default CardProductCustomer