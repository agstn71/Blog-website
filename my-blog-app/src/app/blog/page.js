import BlogList from "@/components/BlogList"  
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
async function getBlogs() {
  try {
    const res = await fetch(`${apiUrl}/api/v1/blog/get-published-blogs`, {
      cache: "no-store",
    })

    if (!res.ok) throw new Error("Failed to fetch blogs")

    const data = await res.json()
    return data.blogs || []
  } catch (error) {
    console.error(error)
    return []
  }
}

const Blog = async () => {
  const blogs = await getBlogs()

  return (
    <div className="pt-16 bg-white">
      <div className="max-w-6xl mx-auto text-center flex flex-col space-y-4 items-center">
        <h1 className="text-4xl font-medium text-center pt-10">Insights & Stories</h1>
        <hr className="w-24 text-center border-2 border-red-500 rounded-full" />
      </div>

      {/* ✅ pass blogs down */}
      <BlogList blogs={blogs} />
    </div>
  )
}

export default Blog
