"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useParams();
  const token = params.token; // Get token from URL

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const res = await axios.post(`${apiUrl}/api/v1/user/reset-password/${token}`, {
        password,
      });

      toast.success(res.data.message);
      router.push("/login"); // redirect to login
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-6 shadow-lg rounded-xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Reset Password</h2>
        <Input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3"
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-4"
        />
        <Button onClick={handleReset} className="w-full" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </div>
    </div>
  );
}
