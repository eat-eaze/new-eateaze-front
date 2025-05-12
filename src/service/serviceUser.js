import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

console.log("API_BASE_URL : ", API_BASE_URL);

const handleLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
      identifier: email,
      password: password,
    });
    const token = response.data.token;
    if (!token) {
      alert(response.data.error);
    }

    console.log("res : ", response);

    return response.data;
  } catch (error) {
    console.error("Erreur de connexion", error);
    alert("Échec de la connexion!");
    throw error;
  }
};

const handleRegister = async (formData) => {
  console.log("url : ", `${API_BASE_URL}/api/users/signup`);

  try {
    const requestData = {
      email: formData.email,
      password: formData.password,
      first_name: formData.first_name,
      last_name: formData.last_name,
      role: formData.role === "Client" ? "RESTAURANT_USER" : "SUPPLIER_USER",
    };

    // Si l'utilisateur choisit de créer un établissement
    if (formData.establishmentOption === "Créer") {
      requestData.establishmentData = {
        name: formData.establishmentData.name,
        address: formData.establishmentData.address,
        city: formData.establishmentData.city,
        zip_code: formData.establishmentData.zip_code,
        country: formData.establishmentData.country,
        siret_number: formData.establishmentData.siret_number,
      };
    }
    // Si l'utilisateur utilise un code d'invitation
    else if (formData.establishmentOption === "Rejoindre avec code") {
      requestData.invitationCode = formData.invitationCode;
    }

    const response = await axios.post(
      `${API_BASE_URL}/api/users/signup`,
      requestData
    );

    console.log("Réponse d'inscription:", response);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      alert("Inscription réussie!");
    }

    return response.data;
  } catch (error) {
    console.error("Erreur d'inscription", error);
    alert(
      "Échec de l'inscription! " +
        (error.response?.data?.message || error.message)
    );
    throw error;
  }
};

const handleLogout = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Vous êtes déjà déconnecté!");
    return;
  }
  localStorage.removeItem("token");
  alert("Déconnexion réussie!");
};

export { handleLogin, handleRegister, handleLogout };
