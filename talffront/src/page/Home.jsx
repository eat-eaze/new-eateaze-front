import React from 'react';
import Modal from "../Component/modal/Modal"; // Assurez-vous d'importer le composant Modal

function Home() {
    return (
      <div id="backgroundRegister">
        <div id="div__containerRegister">
          <Modal />
          <h2>Welcome to Home Page</h2>
          {/* Ajoutez le contenu de la page d'accueil ici */}
        </div>
      </div>
    );
  }
  
  export default Home;