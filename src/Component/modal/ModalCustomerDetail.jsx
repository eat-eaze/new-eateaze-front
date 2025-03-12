import "../../style/component/modal/modalCustomerDetail.sass";
import React, { useEffect, useState } from "react";
import InputLabel from "../input/InputLabel";
import TextareaLabel from "../input/textareaLabel";

function ModalAddProduct() {
    const [nameProductInput, setNameProductInput] = useState("");
    const [priceProductInput, setPriceProductInput] = useState("");
    const [VarietyProudctSelected, setVarietyProudctSelected] = useState([]);
    const [VarietyProudct, setVarietyProudct] = useState([]);
    const [isOpenDesc, setIsOpenDesc] = useState(false);


    useEffect(() => {
        // Varieties of strawberry
        setVarietyProudct(
            [
                "Gariguette",
                "Fraise de jardin",
                "Fraise de serre",
                "Fraise de montagne",
                "Fraise de plaine",
                "Fraise de forêt",
                "Fraise de campagne",
                "Fraise de ville",
                "Fraise de mer",
                "Fraise de montagne",
                "Fraise de plaine"
            ]
        )
    }, []);

    const produit = "Fraise";
    const catagories = "Fruit";
    const price = "2.50€/kg";
    const delivery = "Livraison sous 3 jours";

    const handleChange = (event) => {
        setVarietyProudctSelected(event.target.value);
    };

    const toggleDescription = () => {
        setIsOpenDesc(!isOpenDesc);
    };


    return (
        <div id="divBigModal__center">
            <div id="divBigModal__Home">
                <h1>Detail produit</h1>
                <div id="ModalDetail__container">
                    <div id="ModalDetail__image">
                        <img id="ModalDetail__containerImage" src="https://th.bing.com/th/id/R.8ce107cf07b0c345ecaaa9234acbecf9?rik=4jP62rw2Ea3aQg&riu=http%3a%2f%2fdessinsagogo55.d.e.pic.centerblog.net%2fo%2fa8a401e3.jpeg&ehk=9XDTnaqKB%2bTqVy2L0TMPbq774vtgqIY5mPZJgxwY1Ps%3d&risl=&pid=ImgRaw&r=0" />
                    </div>
                    <div id="ModalDetail__form">
                        <h2 id="ModalDetail__productName">{produit}</h2>
                        <div id="ModalDetail__tags">
                            <span className="ModalDetail__tagProduct">
                                {catagories}
                            </span>
                        </div>
                        <h3 id="ModalDetail__productPrice">{price}</h3>
                        <p id="ModalDetail__productDescription">{delivery}</p>
                        <div id="ModalDetail__form">
                            <div className="ModalDetail__formInput">
                                <label htmlFor="dropdown">Variéte
                                    de {produit} :</label>
                                <select
                                    id="dropdown"
                                    name="options"
                                    value={VarietyProudctSelected}
                                    onChange={handleChange}
                                >
                                    {VarietyProudct.map((option) => (
                                        <option value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="ModalDetail__formInput">
                                <label htmlFor="dropdown">producteur :</label>
                                <select
                                    id="dropdown"
                                    name="options"
                                    value={VarietyProudctSelected}
                                    onChange={handleChange}
                                >
                                    <option value="Michel ECH.">Michel ECH.</option>

                                    {VarietyProudct.map((option) => (
                                        <option value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button id="ModalDetail__buttonAddProduct">Ajouter au
                            panier
                        </button>

                        <div style={{
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            background: '#f9f9f9'
                        }}>
                            <h3 onClick={toggleDescription} style={{
                                cursor: 'pointer',
                                marginBottom: '10px'
                            }}>
                                Description du
                                producteur {isOpenDesc ? '▼' : '▲'}
                            </h3>
                            {isOpenDesc && (
                                <div>
                                    <p>J’adore les fraises, c’est pour cela que
                                        j’ai voulu devenir agriculteur. Voilà
                                        tout.</p>
                                </div>
                            )}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAddProduct;
