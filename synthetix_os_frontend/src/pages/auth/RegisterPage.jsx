import { useState } from "react";
import { registerUser } from "../../api/auth";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/ui/Input";
import registerImage from "../../assets/3d-rendering-hand-shake.jpg";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Registered successfully");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <AuthLayout image={registerImage}>
      <h1 className="text-3xl font-bold">Create Account</h1>
      <p className="text-gray-400 mt-2">
        Start building your AI workforce
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input label="Full Name" name="full_name" onChange={handleChange} />
        <Input label="Email" type="email" name="email" onChange={handleChange} />
        <Input label="Password" type="password" name="password" onChange={handleChange} />

        <button className="w-full bg-linear-to-r from-purple-500 to-blue-500 py-2 rounded-xl font-semibold">
          Sign Up
        </button>

        <p className="text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}