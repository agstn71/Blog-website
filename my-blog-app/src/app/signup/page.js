"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setLoading } from "@/redux/authSlice";
import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // 🔴 NEW: error state

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // ✅ Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Validation Rules
  const validate = () => {
    const newErrors = {};

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!user.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (user.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    } else if (!nameRegex.test(user.firstName)) {
      newErrors.firstName = "First name cannot contain numbers or special characters";
    }

    if (!user.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (user.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    } else if (!nameRegex.test(user.lastName)) {
      newErrors.lastName = "Last name cannot contain numbers or special characters";
    }

    if (!user.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!user.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(user.password)
    ) {
      newErrors.password =
        "Password must be 8+ chars, include uppercase, lowercase, number & special char";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true if no errors
  };

  // ✅ Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // stop submit if validation fails

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${apiUrl}/api/v1/user/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        router.push("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex h-screen  md:h-[760px]">
      <div className="hidden md:block relative w-[58%] h-[760px]">
        <Image
          src="/assets/signup-banner.webp"
          alt="Signup Hero"
          fill
          style={{ objectFit: "cover" }}
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div className="flex justify-center items-center flex-1 px-4 md:px-0 bg-[linear-gradient(135deg,_#2d1b69_0%,_#11001a_100%)]">
        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl   bg-white/10 backdrop-blur-md border-none">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-xl font-semibold text-white">
                Create an account
              </h1>
            </CardTitle>
            <p className="text-gray-300">Enter your details below to create your account </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div className="w-full">
                  <Label className="mb-2 text-gray-300">First Name</Label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    className="text-gray-100"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>
                <div className="w-full">
                  <Label className="mb-2 text-gray-300">Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    className="text-gray-100"
                    value={user.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <Label className="mb-2 text-gray-300">Email</Label>
                <Input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  className="text-gray-100"
                  value={user.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <Label className="mb-2 text-gray-300">Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Password"
                  name="password"
                  className=" text-gray-100"
                  value={user.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white cursor-pointer font-semibold">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    please wait
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>

              <p className="text-center text-gray-300">
                Already have an account?{" "}
                <Link href="/login">
                  <span className="underline cursor-pointer hover:text-gray-400 dark:hover:text-gray-100">
                    Sign in
                  </span>
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
