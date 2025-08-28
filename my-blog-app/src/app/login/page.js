"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setLoading, setUser } from "@/redux/authSlice";
import axios from "axios";
import { Eye, EyeOff,  Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {loading} = useSelector(store => store.auth)
 
  const router = useRouter();
  const dispatch = useDispatch();
    const [input, setInput] = useState({
      email:"",
      password: "",
    });
  
    const handleChange = (e) => {
      
      const { name, value } = e.target;
      setInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

const handleSubmit = async(e) => {
    e.preventDefault();
     
    try {
         dispatch(setLoading(true))
         const res = await axios.post("http://localhost:8000/api/v1/user/login",input,{
            headers: {
                "Content-Type":"application/json"
            },
            withCredentials:true
         })

         if(res.data.success) {
            router.push("/");
            dispatch(setUser(res.data.user))
            toast.success(res.data.message)
         }
    } catch (error) {
            console.log(error);
            toast.error("failed to login");
            
    } finally {
      dispatch(setLoading(false))
    }

}

  return (
    
    <div className="flex h-screen md:pt-14 md:h-[760px]">
    <div className="hidden md:block relative w-1/2 h-[700px]">
          
            <Image
              src="/assets/signup.jpg"
              alt="Signup Hero"
              fill
              style={{ objectFit: "cover" }}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>

      <div className="flex justify-center items-center flex-1 px-4 md:px-0">
        <Card className="w-full max-w-md p-6  shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600 ">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-xl font-semibold">
                Login into your account
              </h1>
            </CardTitle>
            <p>Enter your details below to login your account </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  className="dark:border-gray-600 dark:bg-gray-900"
                  value={input.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="relative">
                <Label>Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  className="dark:border-gray-600 dark:bg-gray-900"
                   value={input.password}
                  onChange={handleChange}
                  required
                />
                
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-3 top-6 text-gray-500 "
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <Button type="submit" className="w-full">
                {
                 loading?<>
                  
                  <Loader2 className="mr-2 w-4 h-4 animate-spin"/>
                  please wait
                  </>:("Login")
                }
              </Button>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Don't have an account?{" "}
                <Link href="/signup">
                  {" "}
                  <span className="underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100">
                    Sign up
                  </span>{" "}
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
