

// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { setBlog } from "@/redux/blogSlice"
import BlogCard from "@/components/BlogCard"




const BlogList = ({ blogs }) => {
    
//   const dispatch = useDispatch()
//   const { blog } = useSelector((store) => store.blog)

//   useEffect(() => {
//     if (blogs?.length > 0) {
//       dispatch(setBlog(blogs)) 
//     }
//   }, [blogs, dispatch])

  return (
    <div className="max-w-6xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3 py-10 px-4 md:px-0">
      {blogs?.map((b, index) => (
        <BlogCard blog={b} key={index} />
      ))}
    </div>
  )
}

export default BlogList   // ✅ default export
