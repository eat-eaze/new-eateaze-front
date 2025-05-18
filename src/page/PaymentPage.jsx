import "../style/page/cartPage.sass";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, getDefaultHeaders } from "../config/config";

function PaymentPage() {
  const [varietyData, setVarietyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const varietyId = "13542c84-13e0-4cc5-9854-d64fc3d49031"; // ID de la variété à récupérer

  useEffect(() => {
    const fetchVarietyData = async () => {
      try {
        // Récupérer le token depuis le localStorage ou un état global
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Aucun token d'authentification trouvé");
        }

        const response = await axios.get(
          `${API_BASE_URL}/products/varieties/${varietyId}`,
          {
            headers: getDefaultHeaders(),
            withCredentials: true
          }
        );

        setVarietyData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
        setError("Impossible de récupérer les données de la variété");
        setLoading(false);
      }
    };

    fetchVarietyData();
  }, [varietyId]);

  return (
    <div id="backgroundPage">
      <div id="BigModal__center">
        <div id="divBigModal__center">
          <h1>Paiement</h1>

          {loading && <p>Chargement des données...</p>}

          {error && <p className="error-message">{error}</p>}

          {varietyData && (
            <div className="variety-details">
              <h2>{varietyData.name}</h2>
              <p>Prix: {varietyData.price} €</p>
              {varietyData.description && <p>{varietyData.description}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
