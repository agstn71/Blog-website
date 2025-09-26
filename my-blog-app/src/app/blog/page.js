"use client";
import { useEffect, useState } from "react";
import BlogList from "@/components/BlogList";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/api/v1/blog/get-published-blogs`);
        const data = await res.json();
        setBlogs(data.blogs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading blogs...</div>;

  return (
    <div className="pt-16 bg-[#f5f5f5]">
      <div className="max-w-6xl mx-auto text-center flex flex-col space-y-4 items-center">
        <h1 className="text-4xl font-medium text-center pt-10">Insights & Stories</h1>
        <hr className="w-24 text-center border-2 border-red-500 rounded-full" />
      </div>
      <BlogList blogs={blogs} />
    </div>
  );
}
