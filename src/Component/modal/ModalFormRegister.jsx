import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/component/modal/modalRegister.sass";
import logo from "../../assets/logo/tous_a_la_ferme_logo_fond_blanc.png";
import InputLabel from "../input/InputLabel";
import ToggleSwitch from "../input/ToggleSwitch";
import FormButton from "../button/FormButton";
import { handleRegister } from "../../service/serviceUser";

function ModalFormRegister() {
    // État pour suivre l'étape actuelle du formulaire
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Données du formulaire
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        role: "Client",
        phone: "",
        establishmentOption: "Créer",
        establishmentData: {
            name: "",
            address: "",
            city: "",
            zip_code: "",
            country: "",
            siret_number: ""
        },
        invitationCode: ""
    });

    // Fonction pour mettre à jour les champs de niveau supérieur
    const updateField = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    // Fonction pour mettre à jour les champs de l'établissement
    const updateEstablishmentField = (field, value) => {
        setFormData({
            ...formData,
            establishmentData: {
                ...formData.establishmentData,
                [field]: value
            }
        });
    };

    // Fonction pour passer à l'étape suivante
    const goToNextStep = () => {
        setCurrentStep(2);
    };

    // Validation simple du formulaire première étape
    const validateFirstStep = () => {
        if (!formData.email || !formData.password || !formData.first_name || !formData.last_name) {
            alert("Veuillez remplir tous les champs obligatoires");
            return false;
        }
        return true;
    };

    // Validation simple du formulaire deuxième étape
    const validateSecondStep = () => {
        if (formData.establishmentOption === "Créer") {
            const { name, address, city, zip_code, country, siret_number } = formData.establishmentData;
            if (!name || !address || !city || !zip_code || !country || !siret_number) {
                alert("Veuillez remplir tous les champs de l'établissement");
                return false;
            }
        } else if (formData.establishmentOption === "Rejoindre avec code") {
            if (!formData.invitationCode) {
                alert("Veuillez entrer un code d'invitation valide");
                return false;
            }
        }
        return true;
    };

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentStep === 1) {
            if (validateFirstStep()) {
                goToNextStep();
            }
            return;
        }

        if (!validateSecondStep()) {
            return;
        }

        setIsLoading(true);

        try {
            const result = await handleRegister(formData);
            console.log("Inscription réussie:", result);
            // Redirection après inscription réussie
            navigate("/login");
        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div id="divModal__center" >
            <div id="divModal__container" style={{ marginTop: "16em" }}>
                <div id="divModal__logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div id="div__textarea">
                    <h1 id="welcome">Bienvenue</h1>
                </div>


                <form method="post" id="formModal__login" onSubmit={handleSubmit}>
                    <div className={`form-step ${currentStep === 1 ? 'active' : 'inactive'}`}>
                        <div className="form-grid">
                            <div className="form-grid-full">
                                {/* Slider pour choisir le rôle */}
                                <ToggleSwitch
                                    options={["Client", "Fournisseur"]}
                                    selectedOption={formData.role}
                                    onOptionChange={(role) => updateField("role", role)}
                                />

                                <InputLabel
                                    labelText="Email"
                                    placeHolder="votre.email@exemple.com"
                                    id="emailInput"
                                    valueInput={formData.email}
                                    setValueInput={(value) => updateField("email", value)}
                                    type="email"
                                    required
                                />
                            </div>

                            <div className="form-grid-full">
                                <InputLabel
                                    labelText="Mot de passe"
                                    placeHolder="Votre mot de passe"
                                    id="passwordInput"
                                    valueInput={formData.password}
                                    setValueInput={(value) => updateField("password", value)}
                                    type="password"
                                    required
                                />
                            </div>

                            <div>
                                <InputLabel
                                    labelText="Prénom"
                                    placeHolder="Votre prénom"
                                    id="firstNameInput"
                                    valueInput={formData.first_name}
                                    setValueInput={(value) => updateField("first_name", value)}
                                    required
                                />
                            </div>

                            <div>
                                <InputLabel
                                    labelText="Nom"
                                    placeHolder="Votre nom"
                                    id="lastNameInput"
                                    valueInput={formData.last_name}
                                    setValueInput={(value) => updateField("last_name", value)}
                                    required
                                />
                            </div>

                            <div className="form-grid-full">
                                <InputLabel
                                    labelText="Téléphone"
                                    placeHolder="Votre numéro de téléphone"
                                    id="phoneInput"
                                    valueInput={formData.phone}
                                    setValueInput={(value) => updateField("phone", value)}
                                    type="tel"
                                />
                            </div>
                        </div>

                        <div className="form-navigation">
                            <FormButton
                                text="Suivant"
                                type="submit"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Deuxième étape du formulaire */}
                    <div className={`form-step ${currentStep === 2 ? 'active' : 'inactive'}`}>
                        {(
                            <>
                                <ToggleSwitch
                                    options={["Créer", "code"]}
                                    selectedOption={formData.establishmentOption}
                                    onOptionChange={(option) => updateField("establishmentOption", option)}
                                />

                                <button
                                    className="button button--return"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentStep(1);
                                    }}
                                    style={{ position: "absolute", top: "1em", left: "1em" }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#eaa521">
                                        <path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z" />
                                    </svg>
                                </button>

                                <h2 style={{ textAlign: "center" }}>{formData.role}</h2>

                                {formData.establishmentOption === "Créer" ? (
                                    <div className="form-grid">
                                        <div className="form-section-title form-grid-full">
                                            Informations de l'établissement
                                        </div>
                                        <div className="form-grid-full">
                                            <InputLabel
                                                labelText="Nom de l'établissement"
                                                placeHolder="Nom de votre établissement"
                                                id="establishmentNameInput"
                                                valueInput={formData.establishmentData.name}
                                                setValueInput={(value) => updateEstablishmentField("name", value)}
                                                required={formData.establishmentOption === "Créer"}
                                            />
                                        </div>
                                        <div className="form-grid-full">
                                            <InputLabel
                                                labelText="Adresse"
                                                placeHolder="Adresse de l'établissement"
                                                id="addressInput"
                                                valueInput={formData.establishmentData.address}
                                                setValueInput={(value) => updateEstablishmentField("address", value)}
                                                required={formData.establishmentOption === "Créer"}
                                            />
                                        </div>
                                        <div>
                                            <InputLabel
                                                labelText="Ville"
                                                placeHolder="Ville"
                                                id="cityInput"
                                                valueInput={formData.establishmentData.city}
                                                setValueInput={(value) => updateEstablishmentField("city", value)}
                                                required={formData.establishmentOption === "Créer"}
                                            />
                                        </div>
                                        <div>
                                            <InputLabel
                                                labelText="Code Postal"
                                                placeHolder="Code postal"
                                                id="zipCodeInput"
                                                valueInput={formData.establishmentData.zip_code}
                                                setValueInput={(value) => updateEstablishmentField("zip_code", value)}
                                                required={formData.establishmentOption === "Créer"}
                                            />
                                        </div>
                                        <div>
                                            <InputLabel
                                                labelText="Pays"
                                                placeHolder="Pays"
                                                id="countryInput"
                                                valueInput={formData.establishmentData.country}
                                                setValueInput={(value) => updateEstablishmentField("country", value)}
                                                required={formData.establishmentOption === "Créer"}
                                            />
                                        </div>
                                        <div>
                                            <InputLabel
                                                labelText="Numéro SIRET"
                                                placeHolder="Votre numéro SIRET"
                                                id="siretInput"
                                                valueInput={formData.establishmentData.siret_number}
                                                setValueInput={(value) => updateEstablishmentField("siret_number", value)}
                                                required={formData.establishmentOption === "Créer"}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="invitation-code-container">
                                        <InputLabel
                                            labelText="Code d'invitation"
                                            placeHolder="Entrez le code d'invitation"
                                            id="invitationCodeInput"
                                            valueInput={formData.invitationCode}
                                            setValueInput={(value) => updateField("invitationCode", value)}
                                            required={formData.establishmentOption === "Rejoindre avec code"}
                                        />
                                    </div>
                                )}
                            </>
                        )}

                        <div className="form-navigation">
                            <FormButton
                                text={isLoading ? "Chargement..." : "Valider"}
                                type="submit"
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </form>

                <p id="paragraph__textparam">
                    Déjà inscrit ? <Link to="/login">Connectez-vous</Link>
                </p>
            </div>
        </div>
    );
}

export default ModalFormRegister;
