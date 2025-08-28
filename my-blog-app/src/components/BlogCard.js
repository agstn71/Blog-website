

import React from 'react'
import BlogCardListButton from './BlogCardListButton'

const BlogCard = ({blog}) => {
    
    const changeTimeFormat = (isoDate) => {
  const date = new Date(isoDate);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  return formattedDate;
};
    return (
        <div className=" dark:bg-gray-800 dark:border-gray-600 p-5   hover:scale-101 transition-all">
            {/* <img src={blog.thumbnail} alt="" className='rounded-lg'/> */}
            {/* <p className="text-sm  mt-2">
                By {blog.author.firstName} | {blog.category} | {formattedDate}
            </p> */}
            {/* <h2 className="text-xl font-semibold  mt-1">{blog.title}</h2>
            <h3 className='text-gray-500 mt-1'>{blog.subtitle}</h3> */}
             <div className="overflow-hidden transform transition-transform duration-300 hover:scale-101">
            <div className="aspect-[16/9] ">
              <img
                src={blog.thumbnail}
                alt="Example"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
            <h2 className="mt-4 text-gray-800 text-[24px]  font-medium">
              {blog.title}
            </h2>
            <p className="text-[18px] mb-2 text-[#333333] font-[500] mt-2">
              {changeTimeFormat(blog.createdAt)}
            </p>
            <BlogCardListButton blog={blog}/>
          </div>
       
      
        </div> 
    )
}

export default BlogCard