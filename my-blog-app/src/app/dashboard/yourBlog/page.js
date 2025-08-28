"use client"

import { Card } from '@/components/ui/card'
import React, { useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { Edit, Eye, Trash2 } from 'lucide-react'

import { toast } from 'sonner'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { setBlog } from '@/redux/blogSlice'

// const invoices = [

export default function YourBlog() {
    
    const router = useRouter()
    const dispatch = useDispatch()
    const { blog } = useSelector(store => store.blog)
    console.log("redux store",blog);


    const getOwnBlog = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/blog/get-own-blogs`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setBlog(res.data.blogs))
            }
            console.log("blog data",res.data.blogs)
            console.log(" after fetch api redux store",blog);

        } catch (error) {
            console.log(error);

        }
    }
    const deleteBlog = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/blog/delete/${id}`, { withCredentials: true })
            if (res.data.success) {
                const updatedBlogData = blog.filter((blogItem) => blogItem?._id !== id);
                dispatch(setBlog(updatedBlogData))
                toast.success(res.data.message)
            }
            console.log(res.data.message);

        } catch (error) {
            console.log(error);
            toast.error("something went error")
        }

    }
    useEffect(() => {
        getOwnBlog()
    }, [])


    const formatDate = (index) => {
        const date = new Date(blog[index].createdAt)
        const formattedDate = date.toLocaleDateString("en-GB");
        return formattedDate
        // console.log("formattedDate", date);

    }

    return (
          <div className='pb-10 pt-20  h-screen'>
            <div className='max-w-6xl mx-auto mt-8 '>
                <Card className="w-full p-5 space-y-2 dark:bg-gray-800">

                    <Table>
                        <TableCaption>A list of your recent blogs.</TableCaption>
                        <TableHeader className="overflow-x-auto" >
                            <TableRow>
                                {/* <TableHead className="w-[100px]">Author</TableHead> */}
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="overflow-x-auto ">
                            {blog?.map((item, index) => (
                                <TableRow key={index}>
                                    {/* <TableCell className="font-medium">{item.author.firstName}</TableCell> */}
                                    <TableCell className="flex gap-4 items-center">
                                        <img src={item.thumbnail} alt="" className='w-20 rounded-md hidden md:block' />
                                        <h1 className='hover:underline cursor-pointer w-[60px] md:w-full truncate' onClick={() => router.push(`/blog/${item._id}`)}>{item.title}</h1>
                                    </TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell className="">{formatDate(index)}</TableCell>
                                    <TableCell className="text-center">
                                        {/* <Eye className='cursor-pointer' onClick={() => router.push(`/blogs/${item._id}`)} />
                                        <Edit className='cursor-pointer' onClick={() => router.push(`/dashboard/write-blog/${item._id}`)} />
                                        <Trash2 className='cursor-pointer' onClick={() => deleteBlog(item._id)} /> */}
                                        
                                        <DropdownMenu>
                                            <DropdownMenuTrigger><BsThreeDotsVertical/></DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-[180px]">
                                                <DropdownMenuItem onClick={() => router.push(`/dashboard/createBlog/${item._id}`)}><Edit />Edit</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-500" onClick={() => deleteBlog(item._id)}><Trash2 />Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        {/* <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">$2,500.00</TableCell>
                            </TableRow>
                        </TableFooter> */}
                    </Table>

                </Card>
            </div>
        </div>
    )
}