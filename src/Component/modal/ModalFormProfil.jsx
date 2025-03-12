import "../../style/component/modal/modalProfil.sass";
import "../../style/component/modal/modal.sass";
import LoyaltyCard from "../other/LoyaltyCard";
import CardProfil from "../card/CardProfil";

function ModalFormProfil() {
    const companyName = "Snake Inc.";
    const companyCreate = "28/01/2003";
    const siret = "12345678912345";
    const typeAccount = "Productor";
    const descriptionCompany = "Je suis une entreprise qui vend des serpents.";

    return (
        <>
            <div id="divModal__center">
                <div id="divModal__container">
                    {/*LOGO ICI*/}
                    <h1>Profil</h1>
                    <p>Nom de l'entreprise : {companyName}</p>
                    <p>Date de création de l'entreprise : {companyCreate}</p>
                    <p>N° de siret : {siret}</p>
                    <p>tpye de compte : {typeAccount}</p>
                    <p>Description de l'activité : {descriptionCompany}</p>
                    <LoyaltyCard/>
                    <div id="divModalProfil__containerProduct">
                        <h2 id="divModalProfil__underTitle">
                            {typeAccount === "Productor" ? "Produits en vente" : "Produits achetés"}
                        </h2>
                        <div id="divModalProfil__Product">
                            <CardProfil/>
                            <CardProfil/>
                            <CardProfil/>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ModalFormProfil;
