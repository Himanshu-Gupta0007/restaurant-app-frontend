import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";  // 

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
         
          <Route path="/" element={<Login />} />  
        </Routes>
      </BrowserRouter>

     
      <Toaster
        position="top-right"  
        reverseOrder={false}
        gutter={8}
        containerStyle={{ margin: "10px" }}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
            fontSize: "16px",
            borderRadius: "8px",
            padding: "12px 16px",
          },
          success: {
            icon: "✅",
            style: {
              background: "#27ae60",
            },
          },
          error: {
            icon: "❌",
            style: {
              background: "#e74c3c",
            },
          },
        }}
      />
    </>
  );
};

export default App;