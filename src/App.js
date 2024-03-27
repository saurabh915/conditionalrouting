import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link, Navigate, Routes } from 'react-router-dom';

// Dummy data for authenticated users
const authenticatedUserData = {
  username: 'user1',
  email: 'user1@example.com',
  role: 'admin'
};

// Component for displaying information without login
function PublicPage() {
  return (
    <div>
      <h2>Public Page</h2>
      <p>This page is accessible to everyone.</p>
    </div>
  );
}

// Component for displaying information with login
function PrivatePage({ user }) {
  return (
    <div>
      <h2>Private Page</h2>
      <p>Welcome, {user.username} ({user.email}). Your role: {user.role}</p>
    </div>
  );
}

// Login component
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Basic validation (you may want to add more robust validation)
    if (username.trim() === '' || password.trim() === '') {
      alert('Please enter username and password');
      return;
    }

    // Here, you can perform authentication
    // For simplicity, let's assume login is successful
    // In a real app, you would validate against a backend service

    // Simulate successful login
    onLogin(authenticatedUserData);
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

// App component
function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Public Page</Link></li>
            <li><Link to="/private">Private Page</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<PublicPage/>} />
          <Route path="/login" element ={
            loggedInUser ? <Navigate to="/private" /> : <Login onLogin={handleLogin} />
          } />
          <Route path="/private" element= {
            loggedInUser ? <PrivatePage user={loggedInUser} /> : <Navigate to="/login" />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
