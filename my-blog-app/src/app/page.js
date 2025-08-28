import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PopularAuthors from "@/components/PopularAuthors";
import RecentBlog from "@/components/RecentBlog";


export default function Home() {
  return (
 <div className="">

    
  {/* Hero fixed completely */}
  
     {/* <div className="fixed inset-0 flex items-center justify-center"> */}
    <Hero />
  
 

     <RecentBlog />
    


 </div>

 
  );
}
