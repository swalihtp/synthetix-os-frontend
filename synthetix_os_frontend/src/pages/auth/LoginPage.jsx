import { useState } from "react";
import { loginUser } from "../../api/auth";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/ui/Input";
import loginImage from "../../assets/radu-prodan-v3-iOIKnjSI-unsplash.jpg";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../../components/ui/GoogleLoginButton";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate()

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);      
      if (res.data.mfa_required) {        
        localStorage.setItem("mfa_user", res.data.user_id);
        navigate("/verify-mfa");
        return;
      }
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      console.log(res.data);
      navigate('/')
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <AuthLayout image={loginImage}>
      <h1 className="text-3xl font-bold">Welcome Back</h1>
      <p className="text-gray-400 mt-2">
        Login to your AI workforce dashboard
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
        />

        <div className="flex justify-end text-sm">
          <Link to="/recover-password" className="text-purple-400 hover:underline">
            Forgot password?
          </Link>
        </div>

        <button className="w-full bg-linear-to-r from-purple-500 to-blue-500 py-2 rounded-xl font-semibold hover:opacity-90">
          Sign In
        </button>
        <GoogleLoginButton/>



        <p className="text-sm text-gray-400 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-400">
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}