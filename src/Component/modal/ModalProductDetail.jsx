import React, { useState } from "react";
import "../../style/component/modal/modalProductDetail.sass";
import Dropdown from "../input/Dropdown";
import { useCartStore } from "../../store/cartStore";

function ModalProductDetail({
  id,
  img = "https://thafd.bing.com/th/id/OIP.zbTBIIKQy_voEukcNdFYXAHaFc?w=236&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  titleImg = "Titre de l'image",
  title = "Titre",
  description = "Description",
  price = "Prix",
  stock = 5,
  varieties = [],
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedProducteur, setSelectedProducteur] = useState("");
  const [quantity, setQuantity] = useState(1);
  const addProduct = useCartStore((state) => state.addProduct);

  const producteurs = [
    "Producteur Roger",
    "Producteur Jacques",
    "Producteur Paul",
    "Producteur Jacques",
    "Producteur Paul",
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectType = (type) => {
    setSelectedType(type);
    setIsOpen(false);
  };

  const selectProducteur = (producteur) => {
    setSelectedProducteur(producteur);
    setIsOpen(false);
  };

  // Transformer les variétés en format attendu par le dropdown
  const varietyOptions = varieties.map((variety) => variety.name);

  const handleAddToCart = () => {
    addProduct({
      id,
      name: title,
      price,
      image: img,
      quantity: parseInt(quantity),
    });
    console.log(quantity);
    // setQuantity(1);
    window.location.href = "/customer";
  };

  return (
    <div id="divBigModal__center">
      <div id="divBigModal__ProductDetail">
        <div id="divBigModal__ProductDetail__left">
          <img src={img} alt={titleImg} />
        </div>
        <div id="divBigModal__ProductDetail__right">
          <h2>{title}</h2>

          <div id="divBigModal__ProductDetail__right__tag">
            <div className="divBigModal__ProductDetail__right__tag__type">
              <p>Fruit</p>
            </div>
            <div className="divBigModal__ProductDetail__right__tag__type">
              <p>Fruit Rouge</p>
            </div>
            <div className="divBigModal__ProductDetail__right__tag__type">
              <p>Eté</p>
            </div>
            <div className="divBigModal__ProductDetail__right__tag__type">
              <p>(fonctionnalité en cours )</p>
            </div>
          </div>

          <div id="divBigModal__ProductDetail__section">
            <div id="divBigModal__ProductDetail__section__dropdown">
              <h2>Variété</h2>
              <Dropdown
                selectedType={selectedType}
                types={varietyOptions}
                selectType={selectType}
              />
            </div>
            {/* Fonctionnalité en cours de développement mettre les users qui propose des produits qui on la même variété */}
            {/* <div id="divBigModal__ProductDetail__section__dropdown">
              <h2>Producteur</h2>
              <Dropdown
                selectedType={selectedProducteur}
                types={producteurs}
                selectType={selectProducteur}
              />
            </div> */}
          </div>
          <p>Quantité : {stock}</p>
          <p>{description}</p>
          <div className="quantity-container">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="quantity-input"
            />
            <button onClick={handleAddToCart} className="add-to-cart-btn">
              Ajouter au panier
            </button>
          </div>
        </div>
        {/* buy button */}
      </div>
    </div>
  );
}

export default ModalProductDetail;
