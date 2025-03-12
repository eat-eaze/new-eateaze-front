import React from 'react'
// import img from '../assets/img.png';
import '../../style/component/card/cardCustomer.sass'
import { useNavigate } from 'react-router-dom';

function CardCustomer({
    img = "https://via.placeholder.com/150",
                             titleImg = "Titre de l'image",
    title = "Titre",
    description = "Description",
    price = "Prix",
    stock = "Stock",
                     }) {

    const navigate = useNavigate();

    const [stockManager, setStockManager] = React.useState(0);

    const handleManageStock = (number,e) => {
        e.stopPropagation();
        if (stockManager + number < 0) {
            return;
        }
        setStockManager(stockManager + number);
        console.log(stockManager);
    }

    const handleDetail = () => {
        console.log("Detail");
        navigate(`/customer/detail/${title}`); // Redirige vers la page "About"
    }

    return (
        <div className="CardCustomer__Container">
            <img src={img} alt={titleImg} className="CardCustomer__banner" />
            <div className="CardCustomer__body" onClick={handleDetail}>
                <p className="CardCustomer__titreProduct">{title}</p>
                <p className="CardCustomer__textProduct">{description}</p>
                <p className="CardCustomer__textProduct">Prix : {price}€/Kg</p>
                <div className="CardCustomer__stockManager">
                    <div className="CardCustomer__Button" onClick={(e) => handleManageStock(1,e)}>+</div>
                    <p className="CardCustomer__stockText">{stockManager} Kg</p>
                    <div className="CardCustomer__Button" onClick={(e) => handleManageStock(-1,e)}>-</div>
                </div>
            </div>
        </div>
    )
}

export default CardCustomer