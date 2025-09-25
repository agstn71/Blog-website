"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setBlog, setLoading } from "@/redux/blogSlice";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { blog, loading } = useSelector((store) => store.blog);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const createBlogHandler = async (e) => {
   if (!title.trim() || !category) {
    toast.error("Please fill all fields");
    return;
  }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${apiUrl}/api/v1/blog/`,
        { title, category },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        if (!blog) {
          dispatch(setBlog([res.data.blog]))
          router.push(`/dashboard/createBlog/${res.data.blog._id}`);
          toast.success(res.data.message)

        }
        dispatch(setBlog([...blog, res.data.blog]));
        router.push(`/dashboard/createBlog/${res.data.blog._id}`);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
       if (error.response && error.response.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  return (
    <div className="p-4 md:pr-20 h-screen  pt-20">
      <Card className="md:p-10 p-4 dark:bg-gray-800 -space-y-6">
        <h1 className="text-2xl font-bold">Let,s create blog</h1>
        <p>
         Create a new blog post by giving it a title, choosing a category, and writing your content. Share your tech insights with others!
        </p>
        <div className="mt-10">
          <form onSubmit={(e) => {
            e.preventDefault()
            createBlogHandler()
          }}>
               <div>
            <Label className="mb-2">Title</Label>
            <Input
              type="text"
              placeholder="Enter your blog title here"
              className="bg-white dark:bg-gray-700"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mt-4 mb-5">
  <Label className="mb-1">Category</Label>
  <Select onValueChange={getSelectedCategory} required>
    <SelectTrigger className="w-[200px]">
      <SelectValue placeholder="Select a Category" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Tech Categories</SelectLabel>
        <SelectItem value="Web Development">Web Development</SelectItem>
        <SelectItem value="Mobile Development">Mobile Development</SelectItem>
        <SelectItem value="Programming Languages">Programming Languages</SelectItem>
        <SelectItem value="AI & Machine Learning">AI & Machine Learning</SelectItem>
        <SelectItem value="Cloud & DevOps">Cloud & DevOps</SelectItem>
        <SelectItem value="Databases">Databases</SelectItem>
        <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
        <SelectItem value="Tools & Productivity">Tools & Productivity</SelectItem>
        <SelectItem value="Tech News & Industry">Tech News & Industry</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
          </form>
         
        </div>
      </Card>
    </div>
  );
}
