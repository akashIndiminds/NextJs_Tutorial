// app/components/Login.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../services/login-service';  // Import the service
import './login.css';  // Import specific CSS for the login page

const Login = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [memberCode, setMemberCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // For programmatic navigation

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Prepare data to send to the API
    const requestData = {
        loginId,
        password,
        secretKey,
        memberCode,
      };

     // Call the loginUser service function
  const result = await loginUser(requestData);

  if (result.success) {
    // If successful, redirect to the dashboard
    router.push('/dashboard'); ;  // Assuming your dashboard page is at /dashboard
  } else {
    // If login fails, display an error message
    setError(result.error || 'An unknown error occurred.');  // Fallback to a default error message
  }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          placeholder="Login ID"
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
          type="text"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          placeholder="Secret Key"
          required
        />
        <input
          type="text"
          value={memberCode}
          onChange={(e) => setMemberCode(e.target.value)}
          placeholder="Member Code"
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
