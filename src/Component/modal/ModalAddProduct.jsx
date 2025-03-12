import "../../style/component/modal/modalAddProduct.sass";
import React, { useState } from "react";
import InputLabel from "../input/InputLabel";
import TextareaLabel from "../input/textareaLabel";

function ModalAddProduct() {
    const [nameProductInput, setNameProductInput] = useState("");
    const [priceProductInput, setPriceProductInput] = useState("");

    return (
        <div id="divBigModal__center">
            <div id="divBigModal__Home">
                <h1> Ajouter un produit </h1>
                <div id="divBigModal__InputMain">
                    <div id="divBigModal__InputText">
                        <InputLabel id="productName" type="text" labelText="Nom du produit" placeHolder="ex : tomate" setValueInput={nameProductInput} valueInput={setNameProductInput} />
                        <InputLabel id="productPrice" type="text" labelText="Prix du produit" placeHolder="ex : 50" setValueInput={priceProductInput} valueInput={setPriceProductInput} />
                    </div>
                    <div id="divBigModal__InputImage">
                        <InputLabel id="productImage" type="file" labelText="Image" placeHolder="ex : 50" setValueInput={priceProductInput} valueInput={setPriceProductInput} />
                    </div>
                </div>
                <div id="divBigModal__InputDescription">
                    <TextareaLabel id="productPrice" type="text" labelText="Description  du produit" placeHolder="ex : 50" setValueInput={priceProductInput} valueInput={setPriceProductInput} />
                </div>
                <div id="submit">
                    <button>Valider</button>
                </div>
            </div>
        </div>
    );
    }

            export default ModalAddProduct;
