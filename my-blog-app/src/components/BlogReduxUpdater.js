'use client'

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBlog } from '@/redux/blogSlice';

export default function BlogReduxUpdater({ blog }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBlog(blog)); // update Redux with all blogs
  }, [blog, dispatch]);

  return null; // This component does not render anything visible
}
