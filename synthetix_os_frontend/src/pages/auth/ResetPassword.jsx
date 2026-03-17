import { useState } from "react";
import { resetPassword } from "../../api/auth";
import { useParams, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/ui/Input";
import resetImage from "../../assets/pexels-mikhail-nilov-6964173.jpg";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({ new_password: password, uid, token });
      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <AuthLayout image={resetImage}>
      <h1 className="text-3xl font-bold">Reset Password</h1>
      <p className="text-gray-400 mt-2">
        Enter your new password
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input
          label="New Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-linear-to-r from-purple-500 to-blue-500 py-2 rounded-xl font-semibold">
          Reset Password
        </button>
      </form>
    </AuthLayout>
  );
}