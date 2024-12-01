import React from 'react';

const Login = () => {
  return (
    <div>
      <h1>Page de Connexion</h1>
      <form>
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
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
