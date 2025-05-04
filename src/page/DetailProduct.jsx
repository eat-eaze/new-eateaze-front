import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ModalProductDetail from '../Component/modal/ModalProductDetail'
import '../style/component/modal/modalProductDetail.sass'


function DetailProduct() {
    const { id } = useParams() || 1;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // const fetchProduct = async () => {
        //     const response = await fetch(`/api/products/${id}`);
        //     const data = await response.json();
        //     setProduct(data);
        // };
        // fetchProduct();
        setProduct({
            id: 1,
            img: "https://via.placeholder.com/150",
            titleImg: "Titre de l'image",
            title: "Titre",
            description: "Description",
            price: 10,
            stock: 5
        });

    }, [id]);

    if (!product) return null;

    return (
        <div id="backgroundPage">
            <div id="BigModal__center">
                <ModalProductDetail
                    id={product.id}
                    img={product.img}
                    titleImg={product.titleImg}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    stock={product.stock}
                />
            </div>
        </div>
    )
}

export default DetailProduct