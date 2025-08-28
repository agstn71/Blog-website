
"use client"

import BlogCardListButton from "./BlogCardListButton"
import { motion } from "framer-motion"

function FeaturedArticleBlogCards({ blogs }) {
const changeTimeFormat = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[75%_25%] gap-15">
      {/* column 1 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}

        className="overflow-hidden  hover:scale-101">
        <div className="aspect-[16/9] ">
          <img
            src={blogs[0]?.thumbnail}
            alt="Example"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, delay:0.5, amount: 0.3 }}
          className="mt-4 text-gray-800 text-[24px]  font-medium">
          {blogs[0]?.title}
        </motion.h2>
        <motion.p

          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay:0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-[18px] mb-2 text-[#333333] font-[500] mt-2">
          {changeTimeFormat(blogs[0]?.createdAt)}
        </motion.p>
        <BlogCardListButton blog={blogs[0]} />
      </motion.div>

      {/* column 2 */}
      <motion.div

        className="flex flex-col gap-y-12 ">
        {/* row1 */}
        {
          blogs.slice(1, 3).map((blog) => (<motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 50 }}

            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="overflow-hidden hover:scale-101">
            <div className="aspect-[16/9] ">
              <img
                src={blog.thumbnail}
                alt="Example"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, delay:0.5, amount: 0.3 }}
              className="mt-4 text-[#333333] text-[24px] font-[500]">
              {blog.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay:0.7, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-[18px] text-[#333333] font-[400] mt-3">
              {changeTimeFormat(blog?.createdAt)}
            </motion.p>
            <BlogCardListButton blog={blog} />
          </motion.div>))
        }
      </motion.div>
    </div>
  )
}

export default FeaturedArticleBlogCards
