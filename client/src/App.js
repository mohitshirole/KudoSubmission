import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import GiveKudos from './components/GiveKudos';
import Analytics from './components/Analytics';

function App() {
  const [userName, setUserName] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={setUserName} />} />
        <Route path="/home" element={<Home userName={userName} />} />
        <Route path="/give-kudos" element={<GiveKudos />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}

export default App;
