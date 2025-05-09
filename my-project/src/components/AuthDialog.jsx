// AuthDialog.jsx
import { useEffect, useRef, useState } from "react";

export default function AuthDialog() {
  const dialogRef = useRef(null);
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      dialogRef.current?.showModal();
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Невірний логін або пароль");
      }

      const data = await response.json();
      localStorage.setItem("user", email);
      localStorage.setItem("token", data.token);
      setUser(email);
      dialogRef.current?.close();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setEmail("");
    setPassword("");
    dialogRef.current?.showModal();
  };

  return (
    <>
      {!user ? (
        <dialog ref={dialogRef}>
          <form onSubmit={handleLogin} method="dialog">
            <h2>Вхід</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Увійти</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </dialog>
      ) : (
        <div style={{ position: "fixed", top: 10, right: 10 }}>
          <p>Вітаємо, {user}!</p>
          <button onClick={handleLogout}>Вийти</button>
        </div>
      )}
    </>
  );
}
