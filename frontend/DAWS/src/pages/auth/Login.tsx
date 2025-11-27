import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/Input";
import GradientButton from "../../components/GradientButton";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log({ email, password });
    // API will be added in Day 4
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center text-[var(--text)]">
        Welcome Back 👋
      </h2>
      <p className="text-center mb-6 text-gray-500">
        Login to continue your workspace
      </p>

      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <GradientButton title="Login" onClick={handleLogin} />

      <p className="text-sm mt-4 text-center text-gray-500">
        Don't have an account?
        <Link to="/register" className="text-[#FF5894] ml-1">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}
