import "../../style/component/other/LoyaltyCard.sass";
import React, { useEffect, useState } from 'react'
import imgFillLoyaltyPoint from '../../assets/icon/empty_Icon.png';
import imgEmptyLoyaltyPoint from '../../assets/icon/fill_Loyalty.svg';

function LoyaltyCard() {
    const [loyaltyCard, setLoyaltyCard] = useState({});
    const [loyaltyIcon, setLoyaltyIcon] = useState([]);

    const fetchLoyaltyCard = async () => {
        setLoyaltyCard({
            loyaltyPoint: 8,
            loyaltyPointMax: 10
        });
    }

    const createLoyaltyIcon = () => {
        let array = [];

        for (let i = 0; i < loyaltyCard.loyaltyPoint; i++) {
            array.push(<img src={imgEmptyLoyaltyPoint}
                            alt="loyaltyPoint FULL"/>)
        }

        for (let i = 0; i < loyaltyCard.loyaltyPointMax - loyaltyCard.loyaltyPoint; i++) {
            array.push(<img src={imgFillLoyaltyPoint}
                            alt="loyaltyPoint EMPTY"/>)
        }
        setLoyaltyIcon(array);
        return array;
    }

    useEffect(() => {
        const loading = async () => {
            await fetchLoyaltyCard();
            createLoyaltyIcon();
            console.log("loyaltyIcon  ", loyaltyIcon);
        }

        loading();
    }, []);

    return (
        <div id="div__containerLoyaltyCard">
            <h2>Barre de fidelité</h2>
            <div id="div__backgroundCard">
                {loyaltyIcon.map((icon, index) => (
                    <div key={index}>
                        {icon}
                    </div>
                ))}
                {createLoyaltyIcon}
            </div>
            <div__containerProuctSell>
                {/*titleImg={"Titre de l'image"} stock={50}*/}
                {/*img={"https://th.bing.com/th?id=OSK.8dbc20829d96db4fc4e91f8c4859ed6d&w=200&h=200&c=7&rs=1&o=6&dpr=1.3&pid=SANGAM"}/>*/}
            </div__containerProuctSell>
        </div>


    )
}

export default LoyaltyCard