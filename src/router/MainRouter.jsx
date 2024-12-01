import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../page/Login";
import NotFound from "../page/NotFound";
import Login from "../page/Login";
import Register from "../page/Register";

function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <Home />
                } />
                <Route path="/login" element={
                    <Login />
                } />
                <Route path="/register" element={
                    <Register />
                } />
                <Route path="*" element={
                    <NotFound />
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter