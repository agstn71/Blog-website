"use client"; // required for client-side hooks

import BlogCard from '@/components/BlogCard';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';

const SearchList = () => {
    const searchParams = useSearchParams(); // Next.js hook for query params
    const query = searchParams.get('q') || ''; // get ?q= from URL
    const { blog } = useSelector(store => store.blog);


 

    // Filter blogs based on query
    const filteredBlogs = blog.filter(
        (b) =>
            b.title.toLowerCase().includes(query.toLowerCase()) ||
            b.subtitle.toLowerCase().includes(query.toLowerCase()) ||
            b.category.toLowerCase() === query.toLowerCase()
    );

    useEffect(() => {
        window.scrollTo(0, 0); // scroll to top on mount
    }, []);

    return (
  <div>
    {filteredBlogs && filteredBlogs.length > 0 ? (
      <div className='pt-32'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='mb-5'>Search Results for: &quot;{query}&quot;</h2>
          <div className='grid grid-cols-3 gap-7 my-10'>
            {filteredBlogs.map((blogItem, index) => (
              <BlogCard key={index} blog={blogItem} />
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div className='pt-32 text-center h-[600px] '>
        <p className='text-2xl'>No results found for &quot;{query}&quot;</p>
        
        </div>
    )}
  </div>
    
    );
};

export default SearchList;
