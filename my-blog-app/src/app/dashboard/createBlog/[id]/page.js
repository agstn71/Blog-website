"use client"

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useRef, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import JoditEditor from 'jodit-react';

import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setBlog } from '@/redux/blogSlice'

import { useParams, useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const UpdateBlog = () => {
    const editor = useRef(null);
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const id = params.id
    const dispatch = useDispatch()
    const { blog } = useSelector(store => store.blog)
    console.log("blog details", blog)
    const selectBlog = blog.find(blog => blog._id === id)
    const [content, setContent] = useState(selectBlog?.description);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [publish, setPublish] = useState(selectBlog?.isPublished || false);


    const [blogData, setBlogData] = useState({
        title: selectBlog?.title || "",
        subtitle: selectBlog?.subtitle || "",
        description: content || "",
        category: selectBlog?.category || "",
    });

    const [previewThumbnail, setPreviewThumbnail] = useState(selectBlog?.thumbnail);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const selectCategory = (value) => {
        setBlogData({ ...blogData, category: value });
    };

    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setBlogData({ ...blogData, thumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    };

    const updateBlogHandler = async () => {
        const formData = new FormData();
        formData.append("title", blogData.title);
        formData.append("subtitle", blogData.subtitle);
        formData.append("description", content);
        formData.append("category", blogData.category);

        if (blogData.thumbnail instanceof File) {
            formData.append("thumbnail", blogData.thumbnail);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${apiUrl}/api/v1/blog/${id}`, formData, {
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                console.log(res.data.blog);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    const togglePublishUnpublish = async (action) => {
        console.log("action", action);

        try {
            const res = await axios.patch(`${apiUrl}/api/v1/blog/${id}`, {}, {
                params: { publish: action },
                withCredentials: true
            })
            if (res.data.success) {
                setPublish(!publish)
                toast.success(res.data.message)
                router.push(`/dashboard/yourBlog`)
            } else {
                toast.error("Failed to update")
            }
        } catch (error) {
            console.log(error);

        }
    }

    const deleteBlog = async () => {
        try {
            const res = await axios.delete(`${apiUrl}/api/v1/blog/delete/${id}`, { withCredentials: true })
            if (res.data.success) {
                const updatedBlogData = blog.filter((blogItem) => blogItem?._id !== id);
                dispatch(setBlog(updatedBlogData))
                toast.success(res.data.message)
                router.push('/dashboard/yourBlog')
            }
            console.log(res.data.message);

        } catch (error) {
            console.log(error);
            toast.error("something went error")
        }

    }

    return (
        <div className='pb-10 px-3 pt-20 '>
            <div className='max-w-6xl mx-auto mt-8'>
                <Card className="w-full bg-white dark:bg-gray-800 p-5 space-y-2">
                    <h1 className='text-4xl font-bold'>Edit Your Blog</h1>
                    <p className='text-gray-600 '>
                        Update your blog details here. Edit the title, description, or thumbnail, and select the appropriate category. Click “Publish” when your changes are ready to go live.
                    </p>

                    {/* <div className="space-x-2">
                        <Button onClick={() => togglePublishUnpublish(!publish)}>
                            {selectBlog?.isPublished ? "UnPublish" : "Publish"}
                        </Button>

                        <Button variant="destructive" onClick={deleteBlog}>Remove</Button>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                            Publishing will make this blog visible on your website. Removing will delete it permanently.
                        </p>

                    </div> */}
                    <div className='pt-10'>
                        <Label className="mb-2">Title</Label>
                        <Input type="text" placeholder="Enter a title" name="title" value={blogData.title} onChange={handleChange} className="dark:border-gray-300" />
                    </div>
                    <div>
                        <Label className="mb-2">Subtitle</Label>
                        <Input type="text" placeholder="Write a short subtitle to summarize your blog" name="subtitle" value={blogData.subtitle} onChange={handleChange} className="dark:border-gray-300" />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                            Add detailed content for your blog here. Use headings, lists, and images to structure your post.
                        </p>
                        <JoditEditor
                            ref={editor}
                            value={blogData.description}
                            onChange={newContent => setContent(newContent)}
                            className="jodit_toolbar"

                        />
                    </div>
                    <div>
                        <Label className="mb-2">Category</Label>
                        <Select onValueChange={selectCategory} required>
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

                    <div>
                        <Label className="mb-2">Thumbnail</Label>
                        <Input
                            id="file"
                            type="file"
                            onChange={selectThumbnail}
                            accept="image/*"
                            className="w-fit dark:border-gray-300"
                        />
                        {previewThumbnail && (
                            <img
                                src={previewThumbnail}
                                className="w-64 my-2"
                                alt="Course Thumbnail"
                            />
                        )}
                    </div>
                    {/* Info text */}
                    <div className="mb-4 space-y-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Click <strong>Save</strong> to apply your changes before publishing.
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Publishing will make this blog visible on your website. Removing will delete it permanently.
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-between">
                        {/* Left side */}
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => router.back()}>Back</Button>
                            <Button variant="destructive" onClick={deleteBlog}>Remove</Button>
                        </div>

                        {/* Right side */}
                        <div className="flex gap-2">
                            <Button onClick={() => togglePublishUnpublish(!publish)}>
                                {publish ? "UnPublish" : "Publish"}
                            </Button>
                            <Button onClick={updateBlogHandler}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                        Please Wait
                                    </>
                                ) : "Save"}
                            </Button>
                        </div>
                    </div>




                </Card>
            </div>
        </div>
    )
}

export default UpdateBlog