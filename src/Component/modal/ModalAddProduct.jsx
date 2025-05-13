import "../../style/component/modal/modalAddProduct.sass";
import React, { useState, useEffect, useMemo } from "react";
import InputLabel from "../input/InputLabel";
import TextareaLabel from "../input/textareaLabel";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// URL de l'API - ajustée pour correspondre à la demande
const API_BASE_URL = "http://localhost:3000/api";
const API_URL = `${API_BASE_URL}/products`;

function ModalAddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState(""); // Pour suivre quel champ a une erreur

  // Données de référence
  const [categories, setCategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [supplierId, setSupplierId] = useState("");

  // États pour les champs du formulaire
  const [nameProductInput, setNameProductInput] = useState("");
  const [priceProductInput, setPriceProductInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [stockInput, setStockInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [productTypeId, setProductTypeId] = useState("");
  const [varietyId, setVarietyId] = useState("");
  const [unit, setUnit] = useState("KG");
  const [isOrganic, setIsOrganic] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  // Filtrer les types de produits en fonction de la catégorie sélectionnée
  const filteredProductTypes = useMemo(() => {
    if (!categoryId) return productTypes;
    return productTypes.filter((type) => type.category_id === categoryId);
  }, [productTypes, categoryId]);

  // Filtrer les variétés en fonction du type de produit sélectionné
  const filteredVarieties = useMemo(() => {
    if (!productTypeId) return varieties;
    return varieties.filter(
      (variety) => variety.product_type_id === productTypeId
    );
  }, [varieties, productTypeId]);

  // Récupérer l'ID du fournisseur à partir du JWT token
  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      // Rediriger vers la page de connexion si pas de token
      navigate("/login");
      return;
    }
    try {
      const decoded = jwtDecode(authToken);
      if (!decoded.supplier_id) {
        // Si pas de supplier_id dans le token, utiliser une valeur par défaut pour le développement
        console.warn(
          "Aucun supplier_id trouvé dans le token, utilisation d'une valeur par défaut"
        );
        window.alert(
          "Aucun supplier_id trouvé dans le token, utilisation d'une valeur par défaut"
        );
        setSupplierId("485393a1-742e-4946-bb00-158701121eec"); // Valeur par défaut
      } else {
        setSupplierId(decoded.supplier_id);
      }
    } catch (error) {
      console.error("Erreur lors du décodage du token:", error);
      setSupplierId("485393a1-742e-4946-bb00-158701121eec"); // Valeur par défaut en cas d'erreur
    }
  }, [navigate]);

  // Charger les données de référence (catégories, types, etc.)
  useEffect(() => {
    const fetchReferenceData = async () => {
      setLoadingData(true);
      setError("");

      try {
        // Récupérer les catégories
        const categoriesResponse = await fetch(`${API_BASE_URL}/categories`);
        if (!categoriesResponse.ok)
          throw new Error("Erreur lors du chargement des catégories");
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData.filter((cat) => cat.is_active));

        // Récupérer les types de produits
        const productTypesResponse = await fetch(
          `${API_BASE_URL}/product-types`
        );
        if (!productTypesResponse.ok)
          throw new Error("Erreur lors du chargement des types de produits");
        const productTypesData = await productTypesResponse.json();
        setProductTypes(productTypesData.filter((type) => type.is_active));

        // Récupérer les variétés
        const varietiesResponse = await fetch(`${API_BASE_URL}/varieties`);
        if (!varietiesResponse.ok)
          throw new Error("Erreur lors du chargement des variétés");
        const varietiesData = await varietiesResponse.json();
        console.log("varietiesData : ", varietiesData);
        setVarieties(varietiesData.filter((variety) => variety.is_active));

        // Définir des valeurs par défaut si des données sont disponibles
        if (categoriesData.length > 0) {
          setCategoryId(
            categoriesData[0].id || "6aa29b0d-0234-40d8-83c9-f24e9742bbf0"
          );
        } else {
          setCategoryId("6aa29b0d-0234-40d8-83c9-f24e9742bbf0");
        }

        // Valeurs par défaut pour le développement
        if (productTypesData.length === 0) {
          setProductTypeId("4d486256-afd4-4b9c-9ae2-5e3bf1e9b80d");
        }

        if (varietiesData.length === 0) {
          setVarietyId("df93180f-dac7-4122-8e97-d81c1674cbc4");
        }
      } catch (error) {
        console.error(
          "Erreur lors du chargement des données de référence:",
          error
        );
        setError(
          "Impossible de charger les données de référence: " + error.message
        );

        // Valeurs par défaut pour le développement
        setCategoryId("6aa29b0d-0234-40d8-83c9-f24e9742bbf0");
        setProductTypeId("4d486256-afd4-4b9c-9ae2-5e3bf1e9b80d");
        setVarietyId("df93180f-dac7-4122-8e97-d81c1674cbc4");
      } finally {
        setLoadingData(false);
      }
    };

    fetchReferenceData();
  }, []);

  // Mettre à jour le type de produit lorsque la catégorie change
  useEffect(() => {
    if (categoryId && filteredProductTypes.length > 0) {
      setProductTypeId(filteredProductTypes[0].id);
    } else {
      setProductTypeId("4d486256-afd4-4b9c-9ae2-5e3bf1e9b80d");
    }
  }, [categoryId, filteredProductTypes]);

  // Mettre à jour la variété lorsque le type de produit change
  useEffect(() => {
    if (productTypeId && filteredVarieties.length > 0) {
      setVarietyId(filteredVarieties[0].id);
    } else {
      setVarietyId("df93180f-dac7-4122-8e97-d81c1674cbc4");
    }
  }, [productTypeId, filteredVarieties]);

  // Mettre à jour l'aperçu de l'image lorsque l'URL change
  useEffect(() => {
    if (imageUrl) {
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  }, [imageUrl]);

  // Fonction pour générer une URL d'image de chat aléatoire
  const getUniqueImageUrl = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    return `https://cataas.com/cat?t=${timestamp}&rand=${randomNum}`;
  };

  // Fonction pour gérer les erreurs avec scroll
  const handleError = (message, field = "") => {
    // Messages d'erreur plus descriptifs
    const errorMessages = {
      productName: {
        empty: "Le nom du produit est obligatoire",
        invalid: "Le nom du produit doit contenir entre 2 et 50 caractères",
      },
      productPrice: {
        empty: "Le prix du produit est obligatoire",
        invalid: "Le prix doit être un nombre positif (ex: 2.50)",
        format: "Le prix doit être au format XX.XX (ex: 2.50)",
      },
      productStock: {
        invalid: "Le stock doit être un nombre entier positif",
        format: "Le stock doit être un nombre entier (ex: 100)",
      },
      productCategory: {
        empty: "Veuillez sélectionner une catégorie",
        invalid: "La catégorie sélectionnée n'est pas valide",
      },
      productType: {
        empty: "Veuillez sélectionner un type de produit",
        invalid: "Le type de produit sélectionné n'est pas valide",
      },
      productVariety: {
        empty: "Veuillez sélectionner une variété",
        invalid: "La variété sélectionnée n'est pas valide",
      },
      api: {
        connection:
          "Impossible de se connecter au serveur. Veuillez réessayer.",
        server:
          "Une erreur est survenue sur le serveur. Veuillez réessayer plus tard.",
        validation:
          "Les données saisies ne sont pas valides. Veuillez vérifier les champs.",
      },
    };

    // Validation plus précise des champs
    if (field === "productName" && nameProductInput.trim().length < 2) {
      message = errorMessages.productName.invalid;
    }
    if (field === "productPrice") {
      const price = parseFloat(priceProductInput);
      if (isNaN(price) || price <= 0) {
        message = errorMessages.productPrice.invalid;
      } else if (!/^\d+(\.\d{1,2})?$/.test(priceProductInput)) {
        message = errorMessages.productPrice.format;
      }
    }
    if (field === "productStock" && stockInput) {
      const stock = parseInt(stockInput);
      if (isNaN(stock) || stock < 0) {
        message = errorMessages.productStock.invalid;
      } else if (!Number.isInteger(stock)) {
        message = errorMessages.productStock.format;
      }
    }

    setError(message);
    setErrorField(field);
    setLoading(false);

    // Scroll vers l'erreur après un court délai
    setTimeout(() => {
      const errorElement = field
        ? document.getElementById(field)
        : document.querySelector(".error-message");
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async () => {
    // Validation des champs obligatoires avec messages plus précis
    if (!nameProductInput.trim()) {
      handleError("Le nom du produit est obligatoire", "productName");
      return;
    }
    if (nameProductInput.trim().length < 2) {
      handleError(
        "Le nom du produit doit contenir au moins 2 caractères",
        "productName"
      );
      return;
    }
    if (!priceProductInput.trim()) {
      handleError("Le prix du produit est obligatoire", "productPrice");
      return;
    }
    const price = parseFloat(priceProductInput);
    if (isNaN(price) || price <= 0) {
      handleError(
        "Le prix doit être un nombre positif (ex: 2.50)",
        "productPrice"
      );
      return;
    }
    if (!/^\d+(\.\d{1,2})?$/.test(priceProductInput)) {
      handleError(
        "Le prix doit être au format XX.XX (ex: 2.50)",
        "productPrice"
      );
      return;
    }
    if (stockInput) {
      const stock = parseInt(stockInput);
      if (isNaN(stock) || stock < 0) {
        handleError(
          "Le stock doit être un nombre entier positif",
          "productStock"
        );
        return;
      }
      if (!Number.isInteger(stock)) {
        handleError(
          "Le stock doit être un nombre entier (ex: 100)",
          "productStock"
        );
        return;
      }
    }
    if (!categoryId) {
      handleError("Veuillez sélectionner une catégorie", "productCategory");
      return;
    }
    if (!productTypeId) {
      handleError("Veuillez sélectionner un type de produit", "productType");
      return;
    }
    if (!varietyId) {
      handleError("Veuillez sélectionner une variété", "productVariety");
      return;
    }

    // Réinitialiser les erreurs
    setError("");
    setErrorField("");
    setLoading(true);

    try {
      // Dates actuelles pour created_at et updated_at
      const now = new Date().toISOString();

      // Utiliser une image de chat par défaut si aucune URL n'est fournie
      const finalImageUrl = imageUrl || getUniqueImageUrl();

      // Préparer les données à envoyer exactement comme attendu par l'API
      const productData = {
        category_id: categoryId,
        product_type_id: productTypeId,
        variety_id: varietyId,
        name: nameProductInput.trim(),
        supplier_id: supplierId,
        description: descriptionInput.trim() || "",
        image: finalImageUrl,
        price: priceProductInput,
        unit: unit,
        stock: stockInput ? parseInt(stockInput) : 100,
        is_organic: isOrganic,
        is_available: isAvailable,
        created_at: now,
        updated_at: now,
      };

      console.log("Envoi du produit à l'API:", productData);

      // Appel à l'API
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log("Produit ajouté avec succès:", result);

      setSuccess(true);
      setLoading(false);

      // Redirection après 2 secondes
      setTimeout(() => {
        navigate("/productor");
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
      if (error.message.includes("Network Error")) {
        handleError(
          "Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.",
          ""
        );
      } else if (error.message.includes("400")) {
        handleError(
          "Les données saisies ne sont pas valides. Veuillez vérifier les champs.",
          ""
        );
      } else if (error.message.includes("500")) {
        handleError(
          "Une erreur est survenue sur le serveur. Veuillez réessayer plus tard.",
          ""
        );
      } else {
        handleError(`Une erreur est survenue : ${error.message}`, "");
      }
    }
  };

  return (
    <div id="divBigModal__center">
      <div id="divBigModal__Home">
        <h1>
          {success ? "Produit ajouté avec succès!" : "Ajouter un produit"}
        </h1>

        {loadingData ? (
          <div className="loading-message">
            Chargement des données en cours...
          </div>
        ) : (
          !success && (
            <>
              {error && <div className="error-message">{error}</div>}
              <div id="divBigModal__InputMain">
                <div id="divBigModal__InputText">
                  <InputLabel
                    id="productName"
                    type="text"
                    labelText="Nom du produit *"
                    placeHolder="ex : Tomate"
                    valueInput={nameProductInput}
                    setValueInput={setNameProductInput}
                    className={
                      errorField === "productName" ? "error-input" : ""
                    }
                  />
                  <InputLabel
                    id="productPrice"
                    type="text"
                    labelText="Prix du produit (€/Kg) *"
                    placeHolder="ex : 2.50"
                    valueInput={priceProductInput}
                    setValueInput={setPriceProductInput}
                    className={
                      errorField === "productPrice" ? "error-input" : ""
                    }
                  />
                  <InputLabel
                    id="productStock"
                    type="text"
                    labelText="Stock disponible (Kg)"
                    placeHolder="ex : 100"
                    valueInput={stockInput}
                    setValueInput={setStockInput}
                    className={
                      errorField === "productStock" ? "error-input" : ""
                    }
                  />

                  <div className="form-group">
                    <label htmlFor="productCategory">Catégorie *</label>
                    <select
                      id="productCategory"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className={
                        errorField === "productCategory" ? "error-input" : ""
                      }
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="productType">Type de produit *</label>
                    <select
                      id="productType"
                      value={productTypeId}
                      onChange={(e) => setProductTypeId(e.target.value)}
                      disabled={
                        !categoryId || filteredProductTypes.length === 0
                      }
                    >
                      <option value="">Sélectionner un type</option>
                      {filteredProductTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="productVariety">Variété *</label>
                    <select
                      id="productVariety"
                      value={varietyId}
                      onChange={(e) => setVarietyId(e.target.value)}
                      disabled={
                        !productTypeId || filteredVarieties.length === 0
                      }
                    >
                      <option value="">Sélectionner une variété</option>
                      {filteredVarieties.map((variety) => (
                        <option key={variety.id} value={variety.id}>
                          {variety.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="productUnit">Unité</label>
                    <select
                      id="productUnit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    >
                      <option value="KG">Kilogramme (KG)</option>
                      <option value="UNIT">Unité</option>
                      <option value="BOX">Boîte</option>
                    </select>
                  </div>

                  <div className="form-group checkbox">
                    <input
                      type="checkbox"
                      id="isOrganic"
                      checked={isOrganic}
                      onChange={(e) => setIsOrganic(e.target.checked)}
                    />
                    <label htmlFor="isOrganic">Produit bio</label>
                  </div>

                  <div className="form-group checkbox">
                    <input
                      type="checkbox"
                      id="isAvailable"
                      checked={isAvailable}
                      onChange={(e) => setIsAvailable(e.target.checked)}
                    />
                    <label htmlFor="isAvailable">
                      Disponible immédiatement
                    </label>
                  </div>
                </div>

                <div id="divBigModal__InputImage">
                  <label htmlFor="productImage" className="image-upload-label">
                    Image du produit
                  </label>
                  <InputLabel
                    id="productImage"
                    type="text"
                    labelText=""
                    placeHolder="URL de l'image"
                    valueInput={imageUrl}
                    setValueInput={setImageUrl}
                  />
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Aperçu" />
                    </div>
                  )}
                  {!imagePreview && (
                    <p className="image-helper">
                      Aucune URL d'image saisie. Une image aléatoire sera
                      utilisée.
                    </p>
                  )}
                </div>
              </div>

              <div id="divBigModal__InputDescription">
                <TextareaLabel
                  id="productDescription"
                  labelText="Description du produit"
                  placeHolder="ex : Tomates bio cultivées localement"
                  valueInput={descriptionInput}
                  setValueInput={setDescriptionInput}
                />
              </div>

              <div id="submit">
                <button onClick={handleSubmit} disabled={loading}>
                  {loading ? "Envoi en cours..." : "Valider"}
                </button>
              </div>
            </>
          )
        )}

        {success && (
          <div className="success-message">
            <p>Le produit a été ajouté avec succès!</p>
            <p>Redirection en cours...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalAddProduct;
