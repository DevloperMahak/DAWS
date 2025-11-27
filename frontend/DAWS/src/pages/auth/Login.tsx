import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/Input";
import GradientButton from "../../components/GradientButton";
import { Link } from "react-router-dom";
import { loginUser } from "../../utils/authApi";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [error, setError] = useState<string>("");

  const handleLogin = async () => {
    try {
      const res = await loginUser(form); // pass form object
      localStorage.setItem("token", res.data.token); // save JWT
      navigate("/"); // redirect to homepage
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center text-[var(--text)]">
        Welcome Back 👋
      </h2>
      <p className="text-center mb-6 text-gray-500">
        Login to continue your workspace
      </p>

      {/* Show error if login fails */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Email input */}
      <Input
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      {/* Password input */}
      <Input
        label="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      {/* Login button */}
      <GradientButton title="Login" onClick={handleLogin} />

      {/* Register link */}
      <p className="text-sm mt-4 text-center text-gray-500">
        Don't have an account?
        <Link to="/register" className="text-[#FF5894] ml-1">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}
