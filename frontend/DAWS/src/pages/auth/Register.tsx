import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/Input";
import GradientButton from "../../components/GradientButton";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/authApi";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (
    e?: React.MouseEvent<HTMLButtonElement> | React.FormEvent
  ) => {
    if (e && "preventDefault" in e) e.preventDefault(); // stops form submit / reload

    console.log("Register button clicked"); // <-- immediate check
    console.log("Form payload:", form);
    // API will be added in Day 4
    try {
      const res = await registerUser(form);
      console.log("API response:", res.data); // log backend response
      setSuccess("Registration successful! Redirecting...");
      console.log("Form data:", form);
      setTimeout(() => navigate("/login"), 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center text-[var(--text)]">
        Create Account ✨
      </h2>
      <p className="text-center mb-6 text-gray-500">
        Start building your AI workspace
      </p>

      {/* Show error if registration fails */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      {/* Name input */}
      <Input
        label="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

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
