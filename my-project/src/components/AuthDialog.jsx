// src/components/AuthDialog.jsx
import { useEffect, useRef, useState } from "react";

export default function AuthDialog() {
  const dialogRef = useRef(null);
  const registerDialogRef = useRef(null);
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Додаємо обробник події для відкриття діалогу
  useEffect(() => {
    const handleShowAuthDialog = () => {
      dialogRef.current?.showModal();
    };

    window.addEventListener('showAuthDialog', handleShowAuthDialog);
    
    return () => {
      window.removeEventListener('showAuthDialog', handleShowAuthDialog);
    };
  }, []);

  // Автоматично відкриваємо діалог при виході
  useEffect(() => {
    if (!user) {
      dialogRef.current?.showModal();
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Тестовий запит до API (можна використовувати будь-які тестові дані)
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: email || "eve.holt@reqres.in", // Тестовий email
          password: password || "cityslicka"    // Тестовий пароль
        }),
      });

      if (!response.ok) {
        throw new Error("Невірний логін або пароль");
      }

      const data = await response.json();
      localStorage.setItem("user", email || "testuser@example.com");
      localStorage.setItem("token", data.token);
      setUser(email || "testuser@example.com");
      dialogRef.current?.close();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = () => {
    // Проста реєстрація без API
    localStorage.setItem("user", email || "testuser@example.com");
    localStorage.setItem("token", "dummy_token");
    setUser(email || "testuser@example.com");
    registerDialogRef.current?.close();
  };

  

  return (
    <>
      {!user && (
        <>
          <dialog ref={dialogRef}>
            <form onSubmit={handleLogin} method="dialog">
              <h2>Вхід</h2>
              <input
                type="email"
                placeholder="Email (спробуйте eve.holt@reqres.in)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Пароль (спробуйте cityslicka)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Увійти</button>
              <button 
                type="button" 
                onClick={() => {
                  dialogRef.current?.close();
                  registerDialogRef.current?.showModal();
                }}
              >
                Реєстрація
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
          </dialog>

          <dialog ref={registerDialogRef}>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }} method="dialog">
              <h2>Реєстрація</h2>
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
              <button type="submit">Зареєструватися</button>
              <button 
                type="button" 
                onClick={() => {
                  registerDialogRef.current?.close();
                  dialogRef.current?.showModal();
                }}
              >
                Вже маєте акаунт? Увійти
              </button>
            </form>
          </dialog>
        </>
      )}
    </>
  );
}