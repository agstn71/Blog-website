"use client"

import { motion } from 'framer-motion'

import React from 'react'
import BlogCardListButton from './BlogCardListButton'

function OtherArticleCardList({blogs}) {
  const changeTimeFormat = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
};
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-20 lg:gap-15">
             { blogs.slice(3,7).map((blog) => ( 
              <motion.div
               initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              key={blog?._id} className="overflow-hidden  hover:scale-101">
            <div className="aspect-[16/9] ">
              <img
                src={blog?.thumbnail}
                alt="Example"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
            <motion.h2 
            initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true,delay:0.5, amount: 0.3 }}
            className="mt-4 text-[#333333] text-[24px] font-[500]">
              {blog?.title}
            </motion.h2>
            <motion.p
            initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay:0.7 ,ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
             className="text-[18px] text-[#333333] font-[400] mt-3">
              {changeTimeFormat(blog?.createdAt)}
            </motion.p>
            <BlogCardListButton  blog={blog}/>
          </motion.div>))
            }
        </div>
    )
}

export default OtherArticleCardList
