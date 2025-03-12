// import axios from "axios";

import axios from "axios";
// import { useNavigate } from "react-router-dom";


const handleLogin = async (email, password) => {
    console.log("test");

    try {
        const response = await axios.post('http://localhost:3000/user/login', {
            identifier: email,
            password: password
        });
        const token = response.data.token;
        if (!token) {
            alert(response.data.error);
        }

        console.log("res : ", response)
        localStorage.setItem('token', token);

        alert('Connexion réussie!');
    } catch (error) {
        console.error('Erreur de connexion', error);
        alert('Échec de la connexion!');
        throw (error);
    }
};

const handleRegister = async (email, password) => {
    console.log("test2");

    try {
        const response = await axios.post('http://localhost:3000/user/login', {
            email: email,
            password: password
        });
        const token = response.data.token;
        if (!token) {
            alert(response.data.error);
        }

        console.log("res : ", response)
        localStorage.setItem('token', token);

        alert('Connexion réussie!');
    } catch (error) {
        console.error('Erreur de connexion', error);
        alert('Échec de la connexion!');
        throw (error);
    }
}

const handleLogout = async () => {
    const token = localStorage.getItem('token'); // Récupérer le token du localStorage
    console.log('Token :', token);
    if (!token) {
        alert('Vous êtes déjà déconnecté!');
        return;
    }
    localStorage.removeItem('token');
    alert('Déconnexion réussie!');
}

export { handleLogin, handleRegister, handleLogout };