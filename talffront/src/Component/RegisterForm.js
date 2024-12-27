import React from 'react';

function RegisterForm({ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, handleSubmit, error }) {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;