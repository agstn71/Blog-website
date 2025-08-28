"use client"

import { Button } from './ui/button'
import { useRouter } from 'next/navigation'


function BlogCardListButton({ blog }) {
    const router = useRouter();

    return (
        <>
            <p key={blog._id}className="relative inline-block text-[#333333] cursor-pointer hover:text-blue-800  after:content-['→'] after:ml-2" onClick={() => router.push(`/blog/${blog._id}`)}>
                Read More
            </p>
        </>

    )
}

export default BlogCardListButton
