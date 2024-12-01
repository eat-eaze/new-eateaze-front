import React from 'react';

const Register = () => {
  return (
    <div>
      <h1>Page d'Enregistrement</h1>
      <form>
        <label>
          Nom :
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Email :
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          Mot de passe :
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">S'enregistrer</button>
      </form>
    </div>
  );
};

export default Register;
