// import axios from "axios";


const handleLogin = async (email,password) => {
    console.log("test");
    try {
        // const response = await axios.post('https://your-api-url.com/login', {
        //     email,
        //     password
        // });
        const response = {data: {token: "1234567890"}};
        const token = response.data.token;
        localStorage.setItem('token', token);
        alert('Connexion réussie!');
    } catch (error) {
        console.error('Erreur de connexion', error);
        alert('Échec de la connexion!');
    }
};

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



export { handleLogin, handleLogout };