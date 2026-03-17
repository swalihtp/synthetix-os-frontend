import { useState } from "react";
import { recoverPassword } from "../../api/auth";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/ui/Input";
import recoverImage from "../../assets/pexels-mdsnmdsnmdsn-9558504.jpg";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await recoverPassword({ email });
      alert(res.data.message);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <AuthLayout image={recoverImage}>
      <h1 className="text-3xl font-bold">Recover Password</h1>
      <p className="text-gray-400 mt-2">
        We’ll send you a reset link
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input
          label="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-linear-to-r from-purple-500 to-blue-500 py-2 rounded-xl font-semibold">
          Send Link
        </button>
      </form>
    </AuthLayout>
  );
}