import React from 'react'
import { Link } from 'next/navigation'

import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-gray-200 py-10 z-100'>
      <div className='max-w-7xl mx-auto px-4 md:flex md:justify-between'>
        {/*  info */}
        <div className='mb-6 md:mb-0'>
            
            <p className='mt-2'>Sharing insights, tutorials, and ideas on web development and tech.</p>
            <p className='mt-2 text-sm'>123 Blog St, Style City, NY 10001</p>
            <p className='text-sm'>Email: support@blog.com</p>
            <p className='text-sm'>Phone: (123) 456-7890</p>
        </div>
        {/* customer service link */}
        <div className='mb-6 md:mb-0'>
            <h3 className='text-xl font-semibold'>Quick Links</h3>
            <ul className='mt-2 text-sm space-y-2'>
                <li>Home</li>
                <li>Blogs</li>
                <li>About Us</li>
                {/* <li>Contact Us</li> */}
               
            </ul>
        </div>
        {/* social media links */}
        <div className='mb-6 md:mb-0'>
            <h3 className='text-xl font-semibold'>Follow Us</h3>
            <div className='flex space-x-4 mt-2'>
                <FaFacebook/>
                <FaInstagram/>
                <FaTwitterSquare/>
                <FaPinterest/>
            </div>
        </div>
        
      
      </div>
      {/* bottom section */}
      <div className='mt-8 border-t border-gray-700 pt-6 text-center text-sm'>
        <p>&copy; {new Date().getFullYear()} <span className='text-red-500'>Blog</span>. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer