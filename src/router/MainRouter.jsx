import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../page/Home";
import NotFound from "../page/NotFound";
import Login from "../page/Login";
import Register from "../page/Register";
import HomeProductor from "../page/HomeProductor";
import AddProduct from "../page/AddProduct";
import HomeCustomer from "../page/HomeCustomer";
import HomeCustomerDetail from "../page/HomeCustomerDetail";
import Profil from "../page/Profil";
import MainLayout from "../layouts/MainLayout";
import CartPage from '../page/CartPage';
import DetailProduct from "../page/DetailProduct";

function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Routes avec NavBar (utilisant MainLayout) */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/productor" element={<HomeProductor />} />
                    <Route path="/addproduct" element={<AddProduct />} />
                    <Route path="/customer" element={<HomeCustomer />} />
                    <Route path="/customer/detail/:detail" element={<HomeCustomerDetail />} />
                    <Route path="/profil/:idprofil" element={<Profil />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/product/:id" element={<DetailProduct />} />
                </Route>

                {/* Routes sans NavBar */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter