"use client"

import React, { useEffect, useState } from 'react'
import {
    Breadcrumb,
    // BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useParams } from "next/navigation";
import Link from 'next/link';
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Badge } from '@/components/ui/badge'


export default function BlogView() {
    const params = useParams()
    const blogId = params.id
    const { blog } = useSelector(store => store.blog)
    const { user } = useSelector(store => store.auth)
    const selectedBlog = blog.find(blog => blog._id === blogId)
   
    console.log("selected blog",selectedBlog);

   

    const changeTimeFormat = (isoDate) => {
        const date = new Date(isoDate);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        return formattedDate
    }


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='pt-14'>
            <div className='max-w-6xl mx-auto p-10'>
                <Breadcrumb>
                    
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/blog">Blogs</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbPage>{selectedBlog?.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>

                </Breadcrumb>
                {/* Blog Header */}
                <div className="my-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">{selectedBlog?.title}</h1>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage src={selectedBlog?.author?.photoUrl} alt="Author" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{selectedBlog?.author?.firstName} {selectedBlog?.author?.lastName}</p>
                                <p className="text-sm text-muted-foreground">{selectedBlog?.author?.occupation}</p>
                            </div>
                        </div>
                        <div className="text-sm text-muted-foreground">Published on {changeTimeFormat(selectedBlog?.createdAt)} </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="mb-8 rounded-lg overflow-hidden">
                    <img
                        src={selectedBlog?.thumbnail}
                        alt="Next.js Development"
                        width={1000}
                        height={500}
                        className="w-full object-cover"
                    />
                    <p className="text-sm text-muted-foreground mt-2 italic">{selectedBlog?.subtitle}</p>
                </div>

                <p className='' dangerouslySetInnerHTML={{ __html: selectedBlog?.description }} />

                <div className='mt-10'>
                    {/* Tags */}
                    {/* <div className="flex flex-wrap gap-2 mb-8">
                        <Badge variant="secondary">Next.js</Badge>
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">Web Development</Badge>
                        <Badge variant="secondary">JavaScript</Badge>
                    </div> */}

                    {/* Engagement */}
                    

                </div>
              

                {/* Author Bio */}
                {/* <Card className="mb-12">
                    <CardContent className="flex items-start space-x-4 pt-6">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Author" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold mb-1">About Jane Doe</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                Jane is a lead developer with over 10 years of experience in web development. She specializes in React and
                                Next.js and has helped numerous companies build modern, performant websites.
                            </p>
                            <Button variant="outline" size="sm">
                                Follow
                            </Button>
                        </div>
                    </CardContent>
                </Card> */}
            </div>
        </div>
    )
}