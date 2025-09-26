
"use client"
import Image from 'next/image';
import Link from "next/link";
import { motion } from 'framer-motion';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';


export default function Hero() {
  const { user } = useSelector((store) => store.auth)
  const router = useRouter()
  const checkProtect = () => {
    if (!user) {
      router.push("/login")
    } else {
      router.push("/dashboard/createBlog")
    }
  }
  return (
    <div className=" h-screen w-full flex justify-center items-center " style={{
      backgroundImage: "linear-gradient(0deg, rgba(255, 85, 0, 1) 0%, rgba(255, 195, 31, 1) 100%)"
    }}>
      {/* Background image */}
      {/* <Image
        src="/assets/myblog-hero.jpg"
        alt="Hero Background"
        fill 
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        priority
      /> */}

      {/* overlay for readability */}
      {/* <div className="absolute inset-0 bg-black opacity-30"></div> */}
      <div className=''>
        <div className="relative  max-w-7xl mx-auto grid grid-col-1 lg:grid-cols-2 items-center h-full px-4 xl:px-0">
          {/* text section */}
          <div className="max-w-2xl self-end ">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, }}
              className="text-4xl md:text-[70px] font-medium   mb-4 text-[#121111FF] ">
              Explore Ideas That Shape the Future
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, }}
              className="text-lg  mb-10 text-[#121111FF]">
              Stay ahead with in-depth articles, tutorials, and insights on web development, mobile apps, artificial intelligence, cloud computing, and the latest in technology trends          </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, }}
              className="">


              <button onClick={checkProtect} className=' px-[30px] py-[7px] rounded-2xl border-2 border-[#121111FF] text-[#121111FF] hover:bg-white hover:border-[#fff] transition-colors duration-600 ease-in-out'>CREATE YOUR BLOG</button>

            </motion.div>
          </div>
          {/* img section */}
          <div className='hidden lg:flex justify-end'>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className='max-w-[500px] max-h-[500px] w-full'>
              <img src="/assets/man-using-laptop.avif" alt="hero-bg" className='w-full h-full' />
            </motion.div>

          </div>

        </div>
      </div>

    </div>
  )
}
