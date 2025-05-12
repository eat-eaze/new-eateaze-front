import React, { useState, useEffect } from "react";
import CardProductView from "./CardProductView";
// import img from '../assets/img.png';
import "../../style/component/card/cardProductorGrid.sass";
import CardAddProduct from "./CardAddProduct";
import { useNavigate } from "react-router-dom";

// URL de l'API - permet de facilement changer l'environnement (dev, prod, etc.)
const API_URL = "http://localhost:3000/api/products";

function CardProuductorGrid() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    category_id: "6aa29b0d-0234-40d8-83c9-f24e9742bbf0", // Valeur par défaut pour la catégorie
    product_type_id: "4d486256-afd4-4b9c-9ae2-5e3bf1e9b80d", // Valeur par défaut pour le type
    variety_id: "df93180f-dac7-4122-8e97-d81c1674cbc4", // Valeur par défaut pour la variété
    supplier_id: "485393a1-742e-4946-bb00-158701121eec", // Valeur par défaut pour le fournisseur
    unit: "KG",
    is_organic: false,
    is_available: true,
  });
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Données de référence
  const [categories, setCategories] = useState([
    { id: "6aa29b0d-0234-40d8-83c9-f24e9742bbf0", name: "Légumes" },
    { id: "7bb38c0e-1345-50d9-94d8-g24e9842ccf1", name: "Fruits" },
  ]);

  const [productTypes, setProductTypes] = useState([
    { id: "4d486256-afd4-4b9c-9ae2-5e3bf1e9b80d", name: "Concombre" },
    { id: "5e597367-bfe5-5c0d-0bf3-6f4cg2f0c91e", name: "Tomate" },
  ]);

  const [varieties, setVarieties] = useState([
    { id: "df93180f-dac7-4122-8e97-d81c1674cbc4", name: "Standard" },
    { id: "eg04291g-ebd8-5233-9f08-e92d2785dcd5", name: "Bio" },
  ]);

  const [suppliers, setSuppliers] = useState([
    { id: "485393a1-742e-4946-bb00-158701121eec", name: "Ferme Dupont" },
    { id: "596404b2-853f-5057-cc11-269812232ffd", name: "Producteur Martin" },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Utilisation de l'API réelle
        const response = await fetch(`${API_URL}`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        let data = await response.json();
        data = data.products;
        console.log("Produits récupérés depuis l'API:", data);
        setProducts(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        setError(`Impossible de charger les produits: ${error.message}`);

        // Utiliser des données fictives en cas d'erreur pour permettre le développement sans backend
        console.log("Utilisation de données fictives suite à l'erreur");
        const mockData = [
          {
            id: "1",
            name: "Tomate Bio",
            description: "Tomates bio cultivées localement",
            price: "2.99",
            stock: "100",
            image: "https://cataas.com/cat?t=12345",
            category_id: "6aa29b0d-0234-40d8-83c9-f24e9742bbf0",
            product_type_id: "4d486256-afd4-4b9c-9ae2-5e3bf1e9b80d",
            variety_id: "df93180f-dac7-4122-8e97-d81c1674cbc4",
            supplier_id: "485393a1-742e-4946-bb00-158701121eec",
            unit: "KG",
            is_organic: true,
            is_available: true,
          },
          {
            id: "2",
            name: "Concombre",
            description: "Concombres frais de saison",
            price: "1.50",
            stock: "75",
            image: "https://cataas.com/cat?t=67890",
            category_id: "6aa29b0d-0234-40d8-83c9-f24e9742bbf0",
            product_type_id: "4d486256-afd4-4b9c-9ae2-5e3bf1e9b80d",
            variety_id: "df93180f-dac7-4122-8e97-d81c1674cbc4",
            supplier_id: "485393a1-742e-4946-bb00-158701121eec",
            unit: "KG",
            is_organic: false,
            is_available: true,
          },
          {
            id: "3",
            name: "Carotte",
            description: "Carottes bio de nos producteurs",
            price: "1.80",
            stock: "120",
            image: "https://cataas.com/cat?t=24680",
            category_id: "6aa29b0d-0234-40d8-83c9-f24e9742bbf0",
            product_type_id: "5e597367-bfe5-5c0d-0bf3-6f4cg2f0c91e",
            variety_id: "eg04291g-ebd8-5233-9f08-e92d2785dcd5",
            supplier_id: "596404b2-853f-5057-cc11-269812232ffd",
            unit: "KG",
            is_organic: true,
            is_available: true,
          },
        ];

        setProducts(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: checked,
    });
  };

  const handleAddProduct = async () => {
    try {
      // Validation simple
      if (!newProduct.name || !newProduct.price || !newProduct.stock) {
        alert("Veuillez remplir tous les champs obligatoires");
        return;
      }

      setLoading(true);
      setError("");

      // Création de FormData pour l'envoi multipart
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", parseFloat(newProduct.price));
      formData.append("description", newProduct.description || "");
      formData.append("stock", parseInt(newProduct.stock));
      formData.append("category_id", newProduct.category_id);
      formData.append("product_type_id", newProduct.product_type_id);
      formData.append("variety_id", newProduct.variety_id);
      formData.append("supplier_id", newProduct.supplier_id);
      formData.append("unit", newProduct.unit);
      formData.append("is_organic", newProduct.is_organic);
      formData.append("is_available", newProduct.is_available);

      // Dates actuelles pour created_at et updated_at
      const now = new Date().toISOString();
      formData.append("created_at", now);
      formData.append("updated_at", now);

      // Si une URL d'image est fournie, on essaie de la récupérer et la convertir en fichier
      if (newProduct.image) {
        try {
          const imageResponse = await fetch(newProduct.image);
          const imageBlob = await imageResponse.blob();
          const imageFile = new File([imageBlob], "product-image.jpg", {
            type: "image/jpeg",
          });
          formData.append("image", imageFile);
        } catch (imageError) {
          console.error(
            "Erreur lors de la récupération de l'image:",
            imageError
          );
        }
      } else {
        // Image de chat par défaut si aucune image n'est spécifiée
        const catImageUrl = `https://cataas.com/cat?t=${Date.now()}`;
        try {
          const catResponse = await fetch(catImageUrl);
          const catBlob = await catResponse.blob();
          const catFile = new File([catBlob], "cat-image.jpg", {
            type: "image/jpeg",
          });
          formData.append("image", catFile);
        } catch (catError) {
          console.error(
            "Erreur lors de la récupération de l'image de chat:",
            catError
          );
        }
      }

      // Envoyer à l'API
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log("Produit ajouté avec succès:", result);

      // Ajouter le nouveau produit à la liste
      setProducts([...products, result]);

      // Réinitialiser le formulaire
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        category_id: "6aa29b0d-0234-40d8-83c9-f24e9742bbf0",
        product_type_id: "4d486256-afd4-4b9c-9ae2-5e3bf1e9b80d",
        variety_id: "df93180f-dac7-4122-8e97-d81c1674cbc4",
        supplier_id: "485393a1-742e-4946-bb00-158701121eec",
        unit: "KG",
        is_organic: false,
        is_available: true,
      });

      setIsAdding(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
      setError(`Erreur lors de l'ajout du produit: ${error.message}`);

      // Ajouter avec un ID fictif en cas d'erreur
      const fakeId = Date.now().toString();
      const productWithImage = {
        ...newProduct,
        id: fakeId,
        image: newProduct.image || `https://cataas.com/cat?t=${fakeId}`,
      };

      setProducts([...products, productWithImage]);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        category_id: "6aa29b0d-0234-40d8-83c9-f24e9742bbf0",
        product_type_id: "4d486256-afd4-4b9c-9ae2-5e3bf1e9b80d",
        variety_id: "df93180f-dac7-4122-8e97-d81c1674cbc4",
        supplier_id: "485393a1-742e-4946-bb00-158701121eec",
        unit: "KG",
        is_organic: false,
        is_available: true,
      });
      setIsAdding(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="CardProuductorGrid__container">
        <CardAddProduct onClick={() => navigate("/addproduct")} />

        {loading && (
          <div className="loading-indicator">Chargement des produits...</div>
        )}
        {error && <div className="error-message">{error}</div>}

        {products.map((product) => (
          <CardProductView key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default CardProuductorGrid;
