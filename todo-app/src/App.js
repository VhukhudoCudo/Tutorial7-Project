import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
   <Route path="/todos" element={<><TodoList /></>} />
      </Routes>
    </Router>
  );
};

export default App;
