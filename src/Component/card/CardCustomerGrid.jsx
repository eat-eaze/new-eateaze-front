import React from 'react'
import '../../style/component/card/cardProductorGrid.sass'
import CardProductCustomer from "./CardProductCustomer";

function CardProuductorGrid() {
    return (
        <>
            <div id="CardProuductorGrid__container">
                <CardProductCustomer />
                <CardProductCustomer />
                <CardProductCustomer />
            </div>
        </>
    )
}

export default CardProuductorGrid