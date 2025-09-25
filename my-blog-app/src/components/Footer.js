import React from 'react'
import Link from "next/link"

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
            <ul className="mt-2 text-sm space-y-2">
              
  <li>
    <Link href="/">Home</Link>
  </li>
  <li>
    <Link href="/blog">Blog</Link>
  </li>
  <li>
    <Link href="/about">About Us</Link>
  </li>
  {/* <li>
    <Link href="/contact">Contact Us</Link>
  </li> */}
</ul>
        </div>
        {/* social media links */}
        <div className='mb-6 md:mb-0'>
  <h3 className='text-xl font-semibold'>Follow Us</h3>
  <div className='flex space-x-4 mt-2'>
    <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <FaFacebook className="w-5 h-5" />
    </Link>
    <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <FaInstagram className="w-5 h-5" />
    </Link>
    <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
      <FaTwitterSquare className="w-5 h-5" />
    </Link>
    <Link href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
      <FaPinterest className="w-5 h-5" />
    </Link>
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