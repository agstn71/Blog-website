"use client"

import { Badge } from './ui/badge';
// import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


function SidebarBadges() {
    const tags = [
    { category: "Blogging" },
    { category: "Web Development" },
    { category: "Digital Marketing" },
    { category: "Cooking" },
    { category: "Photography" },
    { category: "Sports" },
];
  return (
      <div className='bg-white hidden md:block dark:bg-gray-700 w-[350px] h-[200px] p-5 rounded-md mt-16 '>
                    <h1 className='text-2xl font-semibold'>Popular categories</h1>
                    <div className='my-5 flex flex-wrap gap-3'>
                        {tags.map((item, index) => (
                            <Badge
                                key={index}
                                className="cursor-pointer"
                                onClick={() => redirect(`/search?q=${item.category}`)}
                            >
                                {item.category}
                            </Badge>
                        ))}
                    </div>
                </div>
  )
}

export default SidebarBadges
