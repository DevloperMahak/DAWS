import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/Input";
import GradientButton from "../../components/GradientButton";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log({ name, email, password });
    // API will be added in Day 4
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center text-[var(--text)]">
        Create Account ✨
      </h2>
      <p className="text-center mb-6 text-gray-500">
        Start building your AI workspace
      </p>

      <Input
        label="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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

      <GradientButton title="Register" onClick={handleRegister} />

      <p className="text-sm mt-4 text-center text-gray-500">
        Already have an account?
        <Link to="/login" className="text-[#FF5894] ml-1">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
