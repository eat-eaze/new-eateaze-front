export const login = async (email, password) => {
    // Remplacez par votre logique d'appel API
    return fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(response => response.json());
  };
  
  export const register = async (email, password) => {
    // Remplacez par votre logique d'appel API
    return fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(response => response.json());
  };