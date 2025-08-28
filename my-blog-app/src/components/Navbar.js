"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChartColumn, MessagesSquare, Search, User } from "lucide-react";
import Link from "next/link";
import { FaMoon, FaRegEdit, FaSun } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/redux/themeSlice";
import { usePathname, useRouter } from "next/navigation";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";
import ResponsiveMenu from "./ResponsiveMenu";




export default function Navbar() {
  const { user } = useSelector(store => store.auth)
  const { theme } = useSelector(store => store.theme)
  const [searchTerm, setSearchTerm] = useState("")
  const [openNav, setOpenNav] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;


  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ]


  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm?.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
      setSearchTerm()
    }
  }


  const logoutHandler = async (e) => {
    try {

      const res = await axios.get(`${apiUrl}/api/v1/user/logout`, { withCredentials: true })
      if (res.data.success) {
        router.push("/")
        dispatch(setUser(null))
        toast.success(res.data.message)
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong while logging out!";
      toast.error(errMsg);
    }
  }

  const toggleNav = () => {
    setOpenNav(!openNav)
  }


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`py-4 fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white dark:bg-gray-800 shadow-md" : "bg-transparent"}`}>
      <div className="max-w-7xl  mx-auto flex justify-between items-center px-4 md:px-0">
        {/* log section */}
        <div className="flex gap-7 items-center">
          <Link href="/">
            <div className="flex items-center">
              <h1 className="font-bold text-3xl">BlogSphere</h1>
            </div>
          </Link>


        </div>

        <div className="relative hidden lg:block">
          <Input type="text" placeholder="What are you looking for?" className="w-[400px] border-gray-400 border-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="absolute right-0 top-0 " onClick={handleSearch}>
            <Search />
          </Button>
        </div>
        {/* nav section */}
        <nav className="flex md:gap-7 gap-4 items-center">
          <ul className="hidden md:flex gap-7 items-center text-xl font-medium">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <li
                  className={`transition-colors text-base tracking-wide ${pathname === link.href
                      ? "text-emerald-600  font-semibold "
                      : "text-gray-800  "
                    }`}
                >
                  {link.label}
                </li>
              </Link>
            ))}
          </ul>
          {/* <Button onClick={() => dispatch(toggleTheme())} >
              {
                theme === 'light' ? <FaMoon /> : <FaSun />
              }

            </Button> */}
          {user ? (
            <div className="ml-7 flex gap-3 items-center">

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src={user.photoUrl || "https://github.com/shadcn.png"} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push("/dashboard/profile ")}>
                      <User />
                      Profile
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/dashboard/yourBlog ")}>
                      <ChartColumn />
                      Your Blogs
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>
                        <MessagesSquare/>
                        Comments
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem> */}
                    <DropdownMenuItem onClick={() => router.push("/dashboard/createBlog")}>
                      <FaRegEdit />
                      Write Blog
                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>



              <Button className="hidden md:block" onClick={logoutHandler}>Logout</Button>

            </div>
          ) : (
            <div className="ml-7 md:flex gap-2 ">
              <Link href="/login">
                <Button>Login</Button>
              </Link>
              <Link href="/signup" className="hidden md:block">
                <Button>Signup</Button>
              </Link>
            </div>
          )}
          {
            openNav ? <HiMenuAlt3 onClick={toggleNav} className='w-7 h-7 md:hidden' /> : <HiMenuAlt1 onClick={toggleNav} className='w-7 h-7 md:hidden' />
          }
        </nav>
        <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} logoutHandler={logoutHandler} />
      </div>
    </div>
  );
}
