// src/components/RecentBlog.js
import FeaturedArticleBlogCards from "./FeaturedArticleBlogCards";
import OtherArticleCardList from "./OtherArticleCardList";
import BlogReduxUpdater from "./BlogReduxUpdater";

export default async function RecentBlog() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  let blogs = [];

  try {
    const res = await fetch(`${apiUrl}/api/v1/blog/get-published-blogs`, {
      cache: "no-store",
      credentials: "include",
    });

    // Check if the response is OK (status 200-299)
    if (!res.ok) {
      console.error("Failed to fetch blogs:", res.status, res.statusText);
    } else {
      // Try parsing JSON safely
      try {
        const data = await res.json();
        blogs = data.blogs || [];
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
      }
    }
  } catch (fetchError) {
    console.error("Error fetching blogs:", fetchError);
  }

  return (
    <div className="bg-white pb-10">
      <div className="max-w-6xl mb:10 md:mb-20 mx-auto flex flex-col space-y-4 items-center">
        <h1 className="text-4xl font-medium pt-10">Recent Blogs</h1>
        <hr className="w-24 text-center border-2 border-red-500 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Featured articles with animation (client-side) */}
        <FeaturedArticleBlogCards blogs={blogs} />

        {/* Other articles (can stay server component if no animation needed) */}
        <OtherArticleCardList blogs={blogs} />
      </div>

      {/* Redux updater can stay client-side */}
      <BlogReduxUpdater blog={blogs} />
    </div>
  );
}
