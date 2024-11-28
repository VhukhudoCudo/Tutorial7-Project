import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import Recipes from "./pages/Recipes";
import { auth } from './firebase';



function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recipes" element={user ? <Recipes /> : <Navigate to="/" />} />
        {/* <Route path="/recipes" element={<Recipes />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
