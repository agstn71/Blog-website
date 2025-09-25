"use client"

import { ChartColumnBig, MessageSquare, SquareUser } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="hidden mt-10 md:block border-r-2 dark:bg-gray-800 bg-white border-gray-300 dark:border-gray-600 w-[300px] p-10 space-y-2 h-screen rounded-r-2xl">
      <div className="text-center pt-10 px-3 space-y-2">
        <Link
          href="/dashboard/profile"
          className={`text-2xl ${
            pathname === "/dashboard/profile"
              ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
              : "bg-transparent"
          } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}
        >
          <SquareUser />
          <span> Profile</span>
        </Link>

         <Link
          href="/dashboard/yourBlog"
          className={`text-2xl ${
            pathname === "/dashboard/yourBlog"
              ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
              : "bg-transparent"
          } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}
        >
          <ChartColumnBig />
          <span> Your Blogs</span>
        </Link>


         <Link
          href="/dashboard/createBlog"
          className={`text-2xl ${
            pathname === "/dashboard/createBlog"
              ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
              : "bg-transparent"
          } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}
        >
          <FaRegEdit />
          <span> Create Blog</span>
        </Link>
      </div>
    </div>
  );
}
