import { forwardRef, useRef } from "react";

const LoginDialog = forwardRef(({ onLogin }, ref) => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleLogin = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      ref.current.close();
      onLogin();
    } else {
      alert("Невірне ім’я користувача або пароль.");
    }
  };

  return (
    <dialog ref={ref} className="rounded-lg p-6 bg-white">
      <h2 className="text-lg font-semibold mb-4">Вхід</h2>
      <input
        ref={usernameRef}
        type="text"
        placeholder="Ім’я користувача"
        className="border p-2 mb-2 w-full"
      />
      <input
        ref={passwordRef}
        type="password"
        placeholder="Пароль"
        className="border p-2 mb-4 w-full"
      />
      <div className="flex justify-between">
        <button
          onClick={handleLogin}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Увійти
        </button>
        <button
          onClick={() => ref.current.close()}
          className="px-4 py-2 border rounded"
        >
          Скасувати
        </button>
      </div>
    </dialog>
  );
});

export default LoginDialog;
