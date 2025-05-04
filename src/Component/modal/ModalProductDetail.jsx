import React, { useState } from "react";
import "../../style/component/modal/modalProductDetail.sass";
import Dropdown from "../input/Dropdown";

function ModalProductDetail({ id, img = "https://thafd.bing.com/th/id/OIP.zbTBIIKQy_voEukcNdFYXAHaFc?w=236&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", titleImg = "Titre de l'image", title = "Titre", description = "Description", price = "Prix", stock = 5 }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const [selectedProducteur, setSelectedProducteur] = useState("");

    const types = [
        "Fraise Gariguette",
        "Fraise Mara des Bois",
        "Fraise Charlotte",
        "Fraise Ciflorette"
    ];

    const producteurs = [
        "Producteur Roger",
        "Producteur Jacques",
        "Producteur Paul",
        "Producteur Jacques",
        "Producteur Paul"
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

    return (
        <div id="divBigModal__center">
            <div id="divBigModal__ProductDetail">
                <div id="divBigModal__ProductDetail__left">
                    <img src={"https://thafd.bing.com/th/id/OIP.zbTBIIKQy_voEukcNdFYXAHaFc?w=236&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"} alt={titleImg} />
                </div>
                <div id="divBigModal__ProductDetail__right">

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
                            <Dropdown selectedType={selectedType} types={types} selectType={selectType} />
                        </div>
                        <div id="divBigModal__ProductDetail__section__dropdown">
                            <h2>Producteur</h2>
                            <Dropdown selectedType={selectedProducteur} types={producteurs} selectType={selectProducteur} />
                        </div>

                    </div>
                    <p>Quantité : {stock}</p>
                    <p>Description : Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                </div>
            </div>
        </div>
    );
}

export default ModalProductDetail;