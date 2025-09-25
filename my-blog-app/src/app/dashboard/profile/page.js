"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { Card } from "@/components/ui/card";

import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { setLoading, setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Profile() {
  const { user, loading } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [input, setInput] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    occupation: user?.occupation,
    bio: user?.bio,
    facebook: user?.facebook,
    linkedin: user?.linkedin,
    github: user?.github,
    instagram: user?.instagram,
    file: user?.photoUrl,
  });

  const socialLinks = [
  { name: "facebook", icon: FaFacebook },
  { name: "linkedin", icon: FaLinkedin },
  { name: "github", icon: FaGithub },
  { name: "instagram", icon: FaInstagram },
];

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("firstName", input.firstName);
    formData.append("lastName", input.lastName);
    formData.append("bio", input.bio);
    formData.append("occupation", input.occupation);
    formData.append("facebook", input.facebook);
    formData.append("linkedin", input.linkedin);
    formData.append("instagram", input.instagram);
    formData.append("github", input.github);
    if (input?.file && input.file instanceof File) {
      formData.append("thumbnail", input?.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        `${apiUrl}/api/v1/user/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setOpen(false);
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      toast.error(error.response.data.message || "Failed to update your profile.");
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="pt-20  md:h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="flex flex-col md:flex-row gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
          {/* image section */}
          <div className="flex flex-col items-center justify-center md:w-[400px]">
            <Avatar className="w-40 h-40 border-2">
              <AvatarImage className="object-cover"
                src={user?.photoUrl || "/assets/user.jpg"}
              ></AvatarImage>
            </Avatar>
            
           <div className="flex gap-4 items-center mt-4">
  {socialLinks.map(({ name, icon: Icon }) => (
    <Icon
      key={name}
      className={`w-6 h-6 cursor-pointer ${
        user?.[name] ? "text-gray-800 dark:text-gray-300" : "text-gray-400"
      }`}
      onClick={() => {
        if (user?.[name]) {
          window.open(user[name], "_blank");
        } else {
          setOpen(true);
        }
      }}
    />
  ))}
</div>
          </div>

          {/* info section */}
          <div>
            <h1 className="font-bold text-center md:text-start text-4xl mb-7">
              Welcome {user?.firstName || "User"}
            </h1>
            <p>
              <span className="font-semibold">Email :</span> {user?.email}{" "}
            </p>
            <div className="flex flex-col gap-2 items-start justify-start my-5">
              <Label>About Me</Label>
              <p className="border p-6 rounded-lg">
                {user?.bio ||
                  (
    <span className="text-gray-400 dark:text-gray-500" onClick={() => setOpen(true)}>
      Add a bio to let others know more about you.
    </span>
  )}
              </p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <form>
                <DialogTrigger asChild>
                  <Button>Edit Profile</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Edit profile
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Make changes to your profile here.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label htmlFor="firstname">First Name</Label>
                        <Input
                          id="firstname"
                          name="firstName"
                          placeholder="First Name"
                          type="text"
                          className="w-full text-gray-500"
                          value={input.firstName}
                          onChange={changeEventHandler}
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="lastname">Last Name</Label>
                        <Input
                          id="lastname"
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          className="w-full text-gray-500"
                          value={input.lastName}
                          onChange={changeEventHandler}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label htmlFor="facebook">Facebook</Label>
                        <Input
                          id="facebook"
                          name="facebook"
                          placeholder="Enter a URL"
                          type="url"
                          className="w-full text-gray-500"
                          value={input.facebook}
                          onChange={changeEventHandler}
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                          id="instagram"
                          name="instagram"
                          placeholder="Enter a URL"
                          type="url"
                          className="w-full text-gray-500"
                          value={input.instagram}
                          onChange={changeEventHandler}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label htmlFor="facebook">Linkedin</Label>
                        <Input
                          id="linkedin"
                          name="linkedin"
                          placeholder="Enter a URL"
                          type="url"
                          className="w-full text-gray-500"
                          value={input.linkedin}
                          onChange={changeEventHandler}
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="instagram">Github</Label>
                        <Input
                          id="github"
                          name="github"
                          placeholder="Enter a URL"
                          type="url"
                          className="w-full text-gray-500"
                          value={input.github}
                          onChange={changeEventHandler}
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-righ">Description</Label>
                      <Textarea
                        className="col-span-3 text-gray-500"
                        placeholder="Enter a description"
                        id="bio"
                        name="bio"
                        value={input.bio}
                        onChange={changeEventHandler}
                      />
                    </div>
                    <div>
                      <Label className="text-righ">Picture</Label>
                      <Input
                        id="file"
                        type="file"
                        accept="image/*"
                        className="w-[277px] "
                        onChange={changeFileHandler}
                      ></Input>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" className="cursor-pointer">Cancel</Button>
                    </DialogClose>

                    <Button type="submit" className="cursor-pointer" onClick={submitHandler}>
                     
                      {
                 loading?<>
                  
                  <Loader2 className="mr-2 w-4 h-4 animate-spin"/>
                  please wait
                  </>:("Save Changes")
                }
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        </Card>
      </div>
    </div>
  );
}




// import ProfileClient from "@/components/ProfileClient"

// async function getUser() {
//   try {
//     const res = await fetch("http://localhost:8000/api/v1/user/me", {
//       cache: "no-store",
//       credentials: "include",
//     })
//     if (!res.ok) throw new Error("Failed to fetch user")
//     return await res.json()
//   } catch (err) {
//     console.error(err)
//     return null
//   }
// }

// export default async function ProfilePage() {
//   const user = await getUser()

//   return (
//     <div className="pt-20">
//       <ProfileClient user={user} />
//     </div>
//   )
// }
