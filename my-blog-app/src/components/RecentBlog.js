// src/components/RecentBlog.js
import FeaturedArticleBlogCards from "./FeaturedArticleBlogCards";
import OtherArticleCardList from "./OtherArticleCardList";
import BlogReduxUpdater from "./BlogReduxUpdater";

export default async function RecentBlog() {
  // Fetch blogs server-side
  const res = await fetch("http://localhost:8000/api/v1/blog/get-published-blogs", { cache: "no-store", credentials: "include" });
  const data = await res.json();
  const blogs = data.blogs || [];

  return (
    <div className="bg-white pb-10">
      <div className="max-w-6xl mb:10 md:mb-20 mx-auto flex flex-col space-y-4 items-center">
        <h1 className="text-4xl font-medium pt-10">Recent Blogs</h1>
        <hr className="w-24 text-center border-2 border-red-500 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Featured articles with animation (client-side) */}
        <FeaturedArticleBlogCards blogs={blogs}  />

        {/* Other articles (can stay server component if no animation needed) */}
        <OtherArticleCardList blogs={blogs}  />
      </div>

      {/* Redux updater can stay client-side */}
      <BlogReduxUpdater blog={blogs} />
    </div>
  );
}
