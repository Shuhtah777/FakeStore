// src/pages/Help.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Help() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/");
  }, [navigate]);

  return <h1>Довідкова сторінка (доступна лише авторизованим)</h1>;
}