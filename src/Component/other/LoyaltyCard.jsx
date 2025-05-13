import "../../style/component/other/LoyaltyCard.sass";
import React, { useEffect, useState } from "react";

function LoyaltyCard() {
  const [loyaltyCard, setLoyaltyCard] = useState({
    loyaltyPoint: 0,
    loyaltyPointMax: 0,
  });

  useEffect(() => {
    // fetch fidélité
    setLoyaltyCard({ loyaltyPoint: 8, loyaltyPointMax: 10 });
  }, []);

  return (
    <div id="div__containerLoyaltyCard">
      {/* <h2>Barre de fidelité</h2> */}
      {/* <div id="div__backgroundCard">
                {Array.from({ length: loyaltyCard.loyaltyPoint }, (_, idx) => (
                    <img key={idx} src={imgEmptyLoyaltyPoint} alt="loyaltyPoint FULL" />
                ))}
                {Array.from(
                    { length: loyaltyCard.loyaltyPointMax - loyaltyCard.loyaltyPoint },
                    (_, idx) => (
                        <img
                            key={loyaltyCard.loyaltyPoint + idx}
                            src={imgFillLoyaltyPoint}
                            alt="loyaltyPoint EMPTY"
                        />
                    )
                )}
            </div> */}
      <div id="div__containerProuctSell">
        {/*titleImg={"Titre de l'image"} stock={50}*/}
        {/*img={"https://th.bing.com/th?id=OSK.8dbc20829d96db4fc4e91f8c4859ed6d&w=200&h=200&c=7&rs=1&o=6&dpr=1.3&pid=SANGAM"}/>*/}
      </div>
    </div>
  );
}

export default LoyaltyCard;
