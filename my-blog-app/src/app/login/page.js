"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setLoading, setUser } from "@/redux/authSlice";
import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((store) => store.auth);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Validation function
  const validateForm = () => {
    const errors = {};

    // Email validation
    if (!input.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
      errors.email = "Enter a valid email address";
    }

    // Password validation
    if (!input.password.trim()) {
      errors.password = "Password is required";
    } else if (input.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      toast.error(Object.values(errors)[0]); // show the first error
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${apiUrl}/api/v1/user/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        router.push("/");
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to login");
    } finally {
      dispatch(setLoading(false));
    }
  };
  
const handleForgotPassword = async () => {
  if (!input.email.trim()) {
    toast.error("Please enter your email to reset password");
    return;
  }

  try {
    const res = await axios.post(
      `${apiUrl}/api/v1/user/forgot-password`,
      { email: input.email }, // send the email from input
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    toast.success(res.data.message,{duration:5000});
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="flex h-screen  md:h-[760px] ">
      <div className="hidden md:block relative w-[58%] h-[760px]">
        <Image
          src="/assets/login-banner.webp"
          alt="login Hero"
          fill
          style={{ objectFit: "cover" }}
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div className="flex justify-center items-center flex-1 px-4 md:px-0 bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] ">
        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-black/30 backdrop-blur-md border-none ">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-xl font-semibold text-white">
                Login into your account
              </h1>
            </CardTitle>
            <p className="text-gray-300">Enter your details below to login to your account </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label className="mb-2 text-gray-300">Email</Label>
                <Input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  className="text-gray-100"
                  value={input.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="relative">
                <Label className="mb-2 text-gray-300">Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  className="text-gray-100"
                  value={input.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-gray-500 "
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <Button type="submit" className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              <p className="text-center text-gray-300">
                Don&#39;t have an account?{" "}
                <Link href="/signup">
                  <span className="underline cursor-pointer hover:text-gray-400 dark:hover:text-gray-100">
                    Sign up
                  </span>
                </Link>
              </p>
              <p className="text-center text-gray-300 hover:text-gray-400 cursor-pointer" onClick={handleForgotPassword}>Forget password ?</p>
            </form>

            
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
