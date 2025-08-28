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

  const createBlogHandler = async () => {
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A enim,
          numquam impedit quibusdam saepe vitae quasi excepturi earum
          consectetur ullam ab temporibus optio distinctio quas odit odio rerum
          animi fugiat?
        </p>
        <div className="mt-10">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Your blog name"
              className="bg-white dark:bg-gray-700"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mt-4 mb-5">
            <Label className="mb-1">Category</Label>
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Web Development">
                    Web Development
                  </SelectItem>
                  <SelectItem value="Digital Marketing">
                    Digital Marketing
                  </SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Cooking">Cooking</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={createBlogHandler} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
