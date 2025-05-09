// components/RegisterDialog.jsx
import { forwardRef, useRef } from "react";

const RegisterDialog = forwardRef(({ onRegister }, ref) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleRegister = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!username || !password) {
      alert("Усі поля обов’язкові.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Паролі не співпадають.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find(u => u.username === username);

    if (exists) {
      alert("Користувач з таким ім’ям вже існує.");
      return;
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    ref.current.close();
    onRegister();
  };

  return (
    <dialog ref={ref} className="rounded-lg p-6 bg-white">
      <h2 className="text-lg font-semibold mb-4">Реєстрація</h2>
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
        className="border p-2 mb-2 w-full"
      />
      <input
        ref={confirmPasswordRef}
        type="password"
        placeholder="Підтвердіть пароль"
        className="border p-2 mb-4 w-full"
      />
      <div className="flex justify-between">
        <button
          onClick={handleRegister}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Зареєструватися
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

export default RegisterDialog;
